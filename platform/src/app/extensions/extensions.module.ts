import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule, NgModuleFactoryLoader } from '@angular/core';
import { ExtensionInfoService } from './extension-info.service';
import { ExtensionLoader } from './extension-loader';
import { exportSystemModules } from './system-modules';

export function systemModuleInitializer(aInjector: Injector, aExtInfoService: ExtensionInfoService) {
  return () => exportSystemModules(aInjector, aExtInfoService);
}

@NgModule({})
export class ExtensionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ExtensionsModule,
      providers: [
        ExtensionInfoService,
        { provide: NgModuleFactoryLoader, useClass: ExtensionLoader },
        {
          provide: APP_INITIALIZER,
          useFactory: systemModuleInitializer,
          deps: [Injector, ExtensionInfoService],
          multi: true,
        },
      ],
    };
  }
}
