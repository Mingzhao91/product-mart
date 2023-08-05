import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '@auth/auth-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from '@auth/login/login.component';
import { RegisterComponent } from '@auth/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
