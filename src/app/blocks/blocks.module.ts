import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from '@blocks/blocks-routing.module';
import { SharedModule } from '@shared/shared.module';

import { HeaderComponent } from '@blocks/header/header.component';
import { AppComponent } from '@blocks/root/app.component';

@NgModule({
  declarations: [HeaderComponent, AppComponent],
  imports: [CommonModule, BlocksRoutingModule, SharedModule],
  exports: [HeaderComponent, AppComponent],
})
export class BlocksModule {}
