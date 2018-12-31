import { Compiler, Injectable, Optional, SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/render3';
import { ExtensionInfoService } from './extension-info.service';
import { IExtension } from './i-extension';

/**
 * constant containing URL segments separator
 */
const _SEPARATOR = '#';
/**
 * constant holding angular factory class name suffix string.
 */
const FACTORY_CLASS_SUFFIX = 'NgFactory';

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
  constructor(private extensionInfoService: ExtensionInfoService, aCompiler: Compiler, @Optional() aConfig?: SystemJsNgModuleLoaderConfig) {
    super(aCompiler, aConfig);
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

    let factoryClassSuffix = FACTORY_CLASS_SUFFIX;
    if (exportName === undefined) {
      exportName = 'default';
      factoryClassSuffix = '';
    }

    if (!isBundle) {
      return super.load(aPath);
    }

    return this.extensionInfoService
      .getExtensionByNgModuleName(exportName)
      .then((aExtensionInfo: IExtension): Promise<any> => importScript(aExtensionInfo))
      .then((aExtModule: any) => aExtModule[exportName + factoryClassSuffix])
      .then((aModuleFactory: any) => checkNotEmpty(aModuleFactory, modulePath, exportName));
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
    return aResolve(window[aNgModuleName]);
  }

  // load given umd module script
  const script = document.createElement('script');
  script.id = aNgModuleName;
  script.src = aUrl;

  script.onload = function(aEvent: Event) {
    aResolve(window[aNgModuleName]);
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
