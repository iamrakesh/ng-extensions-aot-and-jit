import * as ngAnimations from '@angular/animations';
import * as ngAnimationsBrowser from '@angular/animations/browser';
import * as ngCdkA11y from '@angular/cdk/a11y';
import * as ngCdkBidi from '@angular/cdk/bidi';
import * as ngCdkLayout from '@angular/cdk/layout';
import * as ngCdkObservers from '@angular/cdk/observers';
import * as ngCdkOverlay from '@angular/cdk/overlay';
import * as ngCdkPlatform from '@angular/cdk/platform';
import * as ngCdkPortal from '@angular/cdk/portal';
import * as ngCdkScrolling from '@angular/cdk/scrolling';
import * as ngCommon from '@angular/common';
import * as ngCommonHttp from '@angular/common/http';
import * as ngCore from '@angular/core';
import { Injector } from '@angular/core';
import * as ngForms from '@angular/forms';
// import * as ngMaterial from '@angular/material';
import * as ngMaterialButton from '@angular/material/button';
import * as ngMaterialCore from '@angular/material/core';
import * as ngMaterialIcon from '@angular/material/icon';
import * as ngMaterialTooltip from '@angular/material/tooltip';
import * as ngPlatformBrowser from '@angular/platform-browser';
import * as ngPlatformBrowserAnimations from '@angular/platform-browser/animations';
import * as ngRouter from '@angular/router';
import { Router } from '@angular/router';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import { ExtensionInfoService } from './extension-info.service';

export function exportSystemModules(aInjector: Injector, aExtInfoService: ExtensionInfoService): void {
  SYSTEM_MODULES.forEach((aValue: any, aKey: string) => {
    window[aKey] = aValue;
  });
  aExtInfoService.updateRouterConfig(aInjector.get(Router));
}

const SYSTEM_MODULES: Map<string, any> = getSystemModules();

function getSystemModules(): Map<string, any> {
  let systemModules: Map<string, any> = new Map();

  systemModules.set('ngAnimations', ngAnimations);
  systemModules.set('ngAnimationsBrowser', ngAnimationsBrowser);
  systemModules.set('ngCdkA11y', ngCdkA11y);
  systemModules.set('ngCdkBidi', ngCdkBidi);
  systemModules.set('ngCdkLayout', ngCdkLayout);
  systemModules.set('ngCdkObservers', ngCdkObservers);
  systemModules.set('ngCdkOverlay', ngCdkOverlay);
  systemModules.set('ngCdkPlatform', ngCdkPlatform);
  systemModules.set('ngCdkPortal', ngCdkPortal);
  systemModules.set('ngCdkScrolling', ngCdkScrolling);
  systemModules.set('ngCommon', ngCommon);
  systemModules.set('ngCommonHttp', ngCommonHttp);
  systemModules.set('ngCore', ngCore);
  systemModules.set('ngForms', ngForms);
  // systemModules.set('ngMaterial', ngMaterial);
  systemModules.set('ngMaterialButton', ngMaterialButton);
  systemModules.set('ngMaterialCore', ngMaterialCore);
  systemModules.set('ngMaterialIcon', ngMaterialIcon);
  systemModules.set('ngMaterialTooltip', ngMaterialTooltip);
  systemModules.set('ngPlatformBrowser', ngPlatformBrowser);
  systemModules.set('ngPlatformBrowserAnimations', ngPlatformBrowserAnimations);
  systemModules.set('ngRouter', ngRouter);
  systemModules.set('rxjs', rxjs);
  systemModules.set('rxjsOperators', rxjsOperators);

  return systemModules;
}
