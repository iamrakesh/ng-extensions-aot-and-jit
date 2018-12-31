import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IExtension } from './i-extension';

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

  public register(aExtensionInfo: IExtension): void {
    this.extensions.set(aExtensionInfo.ngModuleName, aExtensionInfo);
  }

  public getExtensionByNgModuleName(aNgModuleName: string): Promise<IExtension> {
    return Promise.resolve<IExtension>(this.extensions.get(aNgModuleName));
  }

  public updateRouterConfig(aRouter: Router): void {
    let newRoutes = [...aRouter.config];
    this.extensions.forEach((aExtension) => newRoutes.push({ path: aExtension.routePath, loadChildren: aExtension.url }));
    aRouter.resetConfig(newRoutes);
  }
}
