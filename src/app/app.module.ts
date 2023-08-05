import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { BlocksModule } from '@blocks/blocks.module';
import { CoreModule } from '@core/core.module';

import { AppComponent } from '@blocks/root/app.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    BlocksModule,
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
