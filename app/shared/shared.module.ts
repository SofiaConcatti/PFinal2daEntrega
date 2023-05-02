import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHelperComponent } from './components/error-helper/error-helper.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher/theme-switcher.component';
import { MyMaterialModule } from './modules/my-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ErrorHelperComponent,
    ThemeSwitcherComponent,
    NotFoundComponent,
    CustomSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSlideToggleModule,
  ],
  exports: [ErrorHelperComponent, ThemeSwitcherComponent],
})
export class SharedModule {}
