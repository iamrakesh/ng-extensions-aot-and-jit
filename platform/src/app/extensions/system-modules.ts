import * as ngAnimations from '@angular/animations';
import * as ngAnimationsBrowser from '@angular/animations/browser';
import * as ngCommon from '@angular/common';
import * as ngCommonHttp from '@angular/common/http';
import * as ngCore from '@angular/core';
import { Injector } from '@angular/core';
import * as ngForms from '@angular/forms';
import * as ngMaterial from '@angular/material';
import * as ngMaterialButton from '@angular/material/button';
// import * as ngMaterialCore from '@angular/material/core';
import * as ngMaterialIcon from '@angular/material/icon';
import * as ngMaterialTooltip from '@angular/material/tooltip';
import * as ngRouter from '@angular/router';
import { Router } from '@angular/router';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import { ExtensionInfoService } from './extension-info.service';

export function exportSystemModules(aInjector: Injector, aExtInfoService: ExtensionInfoService): void {
  SYSTEM_MODULES.forEach((aValue: any, aKey: string) => {
    let nsInfo: INamespaceInfo = createNamespaceIfNeeded(window, aKey);
    nsInfo.namespaceObj[nsInfo.objName] = aValue;
  });
  aExtInfoService.updateRouterConfig(aInjector.get(Router));
}

const SYSTEM_MODULES: Map<string, any> = getSystemModules();

function getSystemModules(): Map<string, any> {
  let systemModules: Map<string, any> = new Map();

  systemModules.set('ng.animations', ngAnimations);
  systemModules.set('ng.animationsBrowser', ngAnimationsBrowser);
  systemModules.set('ng.common', ngCommon);
  systemModules.set('ng.commonHttp', ngCommonHttp);
  systemModules.set('ng.core', ngCore);
  systemModules.set('ng.forms', ngForms);
  systemModules.set('ng.material', ngMaterial);
  systemModules.set('ng.material.button', ngMaterialButton);
  // systemModules.set('ngMaterialCore', ngMaterialCore);
  systemModules.set('ng.material.icon', ngMaterialIcon);
  systemModules.set('ng.material.tooltip', ngMaterialTooltip);
  systemModules.set('ng.router', ngRouter);
  systemModules.set('rxjs', rxjs);
  systemModules.set('rxjs.operators', rxjsOperators);

  return systemModules;
}

interface INamespaceInfo {
  namespaceObj: any;
  objName: string;
}

function createNamespaceIfNeeded(aContainerObj: any, aKey: string): INamespaceInfo {
  let nameSpaces: string[] = aKey.split('.');
  let containerObj: any = aContainerObj;
  for (let i = 0; i < nameSpaces.length - 1; i++) {
    let ns: string = nameSpaces[i];
    containerObj[ns] = containerObj[ns] || {};
    containerObj = containerObj[ns];
  }
  return { namespaceObj: containerObj, objName: nameSpaces[nameSpaces.length - 1] };
}
