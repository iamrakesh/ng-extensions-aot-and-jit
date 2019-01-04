import { ComponentFactory, Injectable, ModuleWithComponentFactories } from '@angular/core';
import { Router } from '@angular/router';
import { IExtension } from './i-extension';

@Injectable({
  providedIn: 'root',
})
export class ExtensionInfoService {
  private extensions: Map<string, IExtension> = new Map();
  private componentFactories: Map<string, ModuleWithComponentFactories<any>> = new Map();

  constructor() {
    this.register({
      ngModuleName: 'SampleExtModule', // used as unique key
      routePath: 'sample-ext', // used in routerLink
      url: '/assets/sample.umd.js#SampleExtModule#bundle', // used to load the UMD JavaScript itself
    });
  }

  public register(aExtensionInfo: IExtension): void {
    this.extensions.set(aExtensionInfo.ngModuleName, aExtensionInfo);
  }

  public getExtensionByNgModuleName(aNgModuleName: string): Promise<IExtension> {
    return Promise.resolve<IExtension>(this.extensions.get(aNgModuleName));
  }

  public getComponentFactory(aNgModuleName: string, aComponentSelector: string): ComponentFactory<any> {
    const moduleWithCompFactories: ModuleWithComponentFactories<any> = this.componentFactories.get(aNgModuleName);
    if (!moduleWithCompFactories) {
      return undefined;
    }
    return moduleWithCompFactories.componentFactories.find((aCompFactory) => aCompFactory.selector === aComponentSelector);
  }

  public setComponentFactories(aNgModuleName: string, aModuleWithComponentFactories: ModuleWithComponentFactories<any>): void {
    this.componentFactories.set(aNgModuleName, aModuleWithComponentFactories);
  }

  public updateRouterConfig(aRouter: Router): void {
    let newRoutes = [...aRouter.config];
    this.extensions.forEach((aExtension) => newRoutes.push({ path: aExtension.routePath, loadChildren: aExtension.url }));
    aRouter.resetConfig(newRoutes);
  }
}
