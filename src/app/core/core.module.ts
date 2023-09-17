import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreRoutingModule } from '@core/core-routing.module';
import { SharedModule } from '@shared/shared.module';

import { throwIfAlradyLoaded } from '@core/utils/module-import-guard';
import { AuthHeaderInterceptorService } from '@core/interceptors/auth-header.interceptor';
import { HttpErrorInterceptorService } from './interceptors/http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptorService,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlradyLoaded(parentModule, 'CoreModule');
  }
}
