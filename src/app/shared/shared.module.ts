import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}
