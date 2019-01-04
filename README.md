# ng-extensions-aot-and-jit
Basic implementation of dynamic extension loading concept using Angular. This implementation is a variant of [ng-extensions](https://github.com/iamrakesh/ng-extensions)

|   | ng-extensions | ng-extensions-aot-and-jit |
| - | ------------- | ------------------------- |
| Container App | AOTed | AOTed but with buildOptimizer is skipped |
| Extension | AOTed into UMD format | AOT **ready** UMD JavaScript |
| Build tooling | ngc and Rollupjs | Angular CLI |
| Extension loading | Custom implementation of SystemJsNgModuleLoader | Custom implementation of SystemJsNgModuleLoader |
| Compiler used | Compiler of @angular/core | CompilerImpl of @angular/core (not exported, which is created using JitCompilerFactory) |

## Building extension
----------------------
```
cd extension
npm i
npm run build
```

### How extension is built ?
extension project is built using Angular CLI into AOT READY UMD Js. This UMD is then loaded and compiled by platform application at runtime, using Angular lazy loaded modules concept. All the dependencies are provided using global variables.
For list of dependencies (provided as global variables) see 'platform/system.modules.json'.

## Running (platform) application
---------------------------------
```
cd platform
npm i
npm start
open browser and navigate to http://localhost:4200
```

### How (platform) application loads extensions ?
This is a regular angular application, with bit of additional implementation to allow lazy loading of extensions (UMD JavaScript).
Below sections explain different aspects of the same

#### Compiler configuration
This angular application uses JIT compiler (CompilerImpl from @angular/core) insteadof default AOT compiler even after production build.
This configuration can be seen in 'mobile-app.module.ts'

```
...
export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

@NgModule({
  declarations: [...],
  imports: [
   ...
  ],
  providers: [
    ...
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true,
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
    {
      provide: Compiler,
      useFactory: createCompiler,
      deps: [CompilerFactory],
    },
  ],
  ...
})
export class PnMobileAppModule {
...
```
#### Build optimizer of Angular CLI
Angular CLI when executed with '--prod' flag, by default it enables build optimizer. This runs few typescript compiler transformations, to remove unused code and also removes 'decorators' from (classes) code. This helps having optimized (reduced) code resulting smaller bundle sizes for production usage.

Because we use JIT compiler to load extensions and compile them at runtime, this compilation process needs 'decorators' metadata information. For example dynamic loaded extension uses (imports/exports) RouterModule, but RouterModule is bundled into the container application and is not part of extension; then during the compilations JIT compiler tries to find decorators information for this RouterModule as well.
But the container application is built using --prod flag all the decorators information will be removed by default by the build optimizer and compilation extension fails.
To fix this situation we disable build optmizer while building container application for production, this is done in 'angular.json'.

```
          "configurations": {
            "production": {
              ...
              "buildOptimizer": false,
              ...
```

See below Angular issues for more information about this
* https://github.com/angular/angular/issues/20875
* https://github.com/angular/angular/issues/23284
* https://github.com/angular/angular-cli/issues/9306

#### Exported dependencies (as global variables)
All dependencies (Angular modules) needed by extensions are made available to them using global variables. All of these global variables are prepared by 'exportSystemModules' function, which can be seen in 'platform/src/app/extensions/system-modules.ts'.

```
...
export function exportSystemModules(aInjector: Injector, aExtInfoService: ExtensionInfoService): void {
  SYSTEM_MODULES.forEach((aValue: any, aKey: string) => {
    window[aKey] = aValue;
  });
  aExtInfoService.updateRouterConfig(aInjector.get(Router));
}
...
```

This function is executed through 'APP_INITIALIZER' factory function, which can be seen in 'platform/src/app/extensions/extensions.module.ts'

```
...
export function systemModuleInitializer(aInjector: Injector, aExtInfoService: ExtensionInfoService) {
  return () => exportSystemModules(aInjector, aExtInfoService);
}
...

```

#### How extensions are loaded ?
Angular allows us to use 'loadChildren' property with URL to the module to be loaded lazily. This implementation uses this concept with small customzation to it.

Regular URL we provided to 'loadChildren' property looks like '<relative path to the Angular module>#<Angular module name>; extension loading implementation uses a slight variant of this URL and it looks like '<any route path>#<Angular module name>#<isBundle>'.
Apart from the above custom URL, implementation uses custom 'NgModuleFactoryLoader'; implementation of which can be seen at 'platform/src/app/extensions/extension-loader.ts'.
  
```
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
   ...
}
```

Implementation extends Angular's 'SystemJsNgModuleLoader' and overrides 'load(path: string): Promise' method and checks for above custom URL pattern and if it is, then uses custom implementation to create 'script' tag for the AOT ready UMD Js resouce URL (impl. of which can be seen in 'doImportScript' function in 'extension-loader.ts').
  
```
@Injectable({
  providedIn: 'root',
})
export class ExtensionLoader extends SystemJsNgModuleLoader {
....
  public load(aPath: string): Promise<NgModuleFactory<any>> {
    return this.loadModuleFactory(aPath);
  }
...
}
...
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
```

This way Angular module initialization including loading child routes is taken care by Angular itself.

One catch here is, all extensions routes are not provided statically in code, but configured at runtime when app is being initialized; this implementation can be seen in '**updateRouterConfig**' method of 'ExtensionInfoService' service (**platform/src/app/extensions/extension-info.service.ts**).

```
@Injectable({
  providedIn: 'root',
})
export class ExtensionInfoService {
  private extensions: Map<string, IExtension> = new Map();

  constructor() {
    this.register({
      ngModuleName: 'SampleExtModule', // used as unique key
      routePath: 'sample-ext', // used in routerLink
      url: '/assets/sample-ext.module.umd.js#SampleExtModule#bundle', // used to load the UMD JavaScript itself
    });
  }
...
  public updateRouterConfig(aRouter: Router): void {
    let newRoutes = [...aRouter.config];
    this.extensions.forEach((aExtension) => newRoutes.push({ path: aExtension.routePath, loadChildren: aExtension.url }));
    aRouter.resetConfig(newRoutes);
  }
...
}
```

## Know issues
1. Because we disable 'buildOptimizer' for container application production build, it results larger bundle size.
2. Because extensions are not AOTed code and we compile them at run time on the browser, it impacts performance.
3. More ???
