import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [MatCardModule, MatButtonModule, MatToolbarModule],
})
export class MaterialModule {}
