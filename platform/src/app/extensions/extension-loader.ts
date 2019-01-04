import {
  Compiler,
  Injectable,
  ModuleWithComponentFactories,
  NgModuleFactory,
  Optional,
  SystemJsNgModuleLoader,
  SystemJsNgModuleLoaderConfig,
} from '@angular/core';
import { ExtensionInfoService } from './extension-info.service';
import { IExtension } from './i-extension';

/**
 * constant containing URL segments separator
 */
const _SEPARATOR = '#';

/**
 * Lazy module loader implementation extending for Angular's default module loader {@link SystemJsNgModuleLoader},
 * which allows loading angular extensions which are compiled (AOTed) to UMD format.
 */
@Injectable({
  providedIn: 'root',
})
export class ExtensionLoader extends SystemJsNgModuleLoader {
  /**
   * Creates an instance of ExtensionLoader.
   */
  constructor(private extensionInfoService: ExtensionInfoService, private compiler: Compiler, @Optional() aConfig?: SystemJsNgModuleLoaderConfig) {
    super(compiler, aConfig);
  }

  /**
   * @inheritdoc
   *
   * extend default implementation if the URL is suffixed with '#bundle' otherwise call super class implementation.
   */
  public load(aPath: string): Promise<NgModuleFactory<any>> {
    return this.loadModuleFactory(aPath);
  }

  /**
   * private method which tries to load angular module from the given module path.
   *
   * @param aPath - Angular route path string,
   *  which is in format '/<ROUTE PATH>#<ANGULAR MODULE NAME>#<VALUE DENOTING TO USE CUSTOM EXTENSION LOADING>'
   */
  private loadModuleFactory(aPath: string): Promise<NgModuleFactory<any>> {
    let [modulePath, exportName, isBundle] = aPath.split(_SEPARATOR);

    if (!isBundle) {
      return super.load(aPath);
    }

    return this.extensionInfoService
      .getExtensionByNgModuleName(exportName)
      .then((aExtensionInfo: IExtension): Promise<any> => importScript(aExtensionInfo))
      .then((aExtModule: any) => this.getModuleFactory(aExtModule, exportName))
      .then((aModuleFactory: any) => checkNotEmpty(aModuleFactory, modulePath, exportName));
  }

  private getModuleFactory(aModule: any, aNgModuleName: string): any {
    let moduleWithComponentFactories: ModuleWithComponentFactories<any> = this.compiler.compileModuleAndAllComponentsSync(aModule);
    this.extensionInfoService.setComponentFactories(aNgModuleName, moduleWithComponentFactories);
    return moduleWithComponentFactories.ngModuleFactory;
  }
}

/**
 * private method to load JavaScript file at runtime using 'script' tag.
 */
function importScript(aExtensionInfo: IExtension) {
  // load given umd module script
  return new Promise((aResolve, aReject) => {
    doImportScript(aExtensionInfo.url, aExtensionInfo.ngModuleName, aResolve, aReject);
  });
}

function doImportScript(aUrl: string, aNgModuleName: string, aResolve: Function, aReject: Function): Promise<any> {
  if (document.getElementById(aNgModuleName)) {
    return aResolve(window[aNgModuleName][aNgModuleName]);
  }

  // load given umd module script
  const script = document.createElement('script');
  script.id = aNgModuleName;
  script.src = aUrl;

  script.onload = function(aEvent: Event) {
    aResolve(window[aNgModuleName][aNgModuleName]);
  };

  script.onerror = function(aEvent: ErrorEvent) {
    aReject(aEvent.error);
  };

  document.head.appendChild(script);
}

/**
 * private method checks if the given angular module is not null; if it is 'null' method will throw an error.
 */
function checkNotEmpty(value: any, modulePath: string, exportName: string): any {
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}
