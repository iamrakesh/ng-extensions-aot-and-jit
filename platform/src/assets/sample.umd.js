(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/material/tooltip')) :
    typeof define === 'function' && define.amd ? define('sample', ['exports', '@angular/core', '@angular/router', '@angular/common', '@angular/material/button', '@angular/material/icon', '@angular/material/tooltip'], factory) :
    (factory((global.SampleExtModule = {}),global.ng.core,global.ng.router,global.ng.common,global.ng.material.button,global.ng.material.icon,global.ng.material.tooltip));
}(this, (function (exports,core,router,common,button,icon,tooltip) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var OneComponent = /** @class */ (function () {
        function OneComponent() {
        }
        OneComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'one',
                        template: "\n    <h3>\n      Component ONE works\n      <button mat-raised-button type=\"button\" [matTooltip]=\"'I am a button from extension'\">\n        <mat-icon>extension</mat-icon> Mouse over for tooltip\n      </button>\n    </h3>\n  ",
                    },] },
        ];
        return OneComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ROUTES = [
        {
            path: '',
            component: OneComponent,
        },
    ];
    var SampleExtRoutingModule = /** @class */ (function () {
        function SampleExtRoutingModule() {
        }
        SampleExtRoutingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [router.RouterModule.forChild(ROUTES)],
                        exports: [router.RouterModule],
                    },] },
        ];
        return SampleExtRoutingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SampleExtModule = /** @class */ (function () {
        function SampleExtModule() {
        }
        SampleExtModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [OneComponent],
                        imports: [common.CommonModule, SampleExtRoutingModule, button.MatButtonModule, icon.MatIconModule, tooltip.MatTooltipModule],
                        providers: [],
                    },] },
        ];
        return SampleExtModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.SampleExtModule = SampleExtModule;
    exports.ɵa = OneComponent;
    exports.ɵb = SampleExtRoutingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vc2FtcGxlL2xpYi9vbmUvb25lLmNvbXBvbmVudC50cyIsIm5nOi8vc2FtcGxlL2xpYi9zYW1wbGUtZXh0LXJvdXRpbmcubW9kdWxlLnRzIiwibmc6Ly9zYW1wbGUvbGliL3NhbXBsZS1leHQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdvbmUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMz5cbiAgICAgIENvbXBvbmVudCBPTkUgd29ya3NcbiAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cImJ1dHRvblwiIFttYXRUb29sdGlwXT1cIidJIGFtIGEgYnV0dG9uIGZyb20gZXh0ZW5zaW9uJ1wiPlxuICAgICAgICA8bWF0LWljb24+ZXh0ZW5zaW9uPC9tYXQtaWNvbj4gTW91c2Ugb3ZlciBmb3IgdG9vbHRpcFxuICAgICAgPC9idXR0b24+XG4gICAgPC9oMz5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgT25lQ29tcG9uZW50IHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT25lQ29tcG9uZW50IH0gZnJvbSAnLi9vbmUvb25lLmNvbXBvbmVudCc7XG5cbmNvbnN0IFJPVVRFUzogUm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogJycsXG4gICAgY29tcG9uZW50OiBPbmVDb21wb25lbnQsXG4gIH0sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyldLFxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2FtcGxlRXh0Um91dGluZ01vZHVsZSB7fVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgT25lQ29tcG9uZW50IH0gZnJvbSAnLi9vbmUvb25lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTYW1wbGVFeHRSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9zYW1wbGUtZXh0LXJvdXRpbmcubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbT25lQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2FtcGxlRXh0Um91dGluZ01vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgU2FtcGxlRXh0TW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTmdNb2R1bGUiLCJSb3V0ZXJNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0VG9vbHRpcE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O29CQUVDQSxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLEtBQUs7d0JBQ2YsUUFBUSxFQUFFLHdPQU9UO3FCQUNGOzsyQkFaRDs7Ozs7OztBQ0FBO0lBSUEsSUFBTSxNQUFNLEdBQVc7UUFDckI7WUFDRSxJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxZQUFZO1NBQ3hCO0tBQ0YsQ0FBQzs7Ozs7b0JBRURDLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsQ0FBQ0MsbUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3hDLE9BQU8sRUFBRSxDQUFDQSxtQkFBWSxDQUFDO3FCQUN4Qjs7cUNBZEQ7Ozs7Ozs7QUNBQTs7OztvQkFRQ0QsYUFBUSxTQUFDO3dCQUNSLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQzt3QkFDNUIsT0FBTyxFQUFFLENBQUNFLG1CQUFZLEVBQUUsc0JBQXNCLEVBQUVDLHNCQUFlLEVBQUVDLGtCQUFhLEVBQUVDLHdCQUFnQixDQUFDO3dCQUNqRyxTQUFTLEVBQUUsRUFBRTtxQkFDZDs7OEJBWkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=