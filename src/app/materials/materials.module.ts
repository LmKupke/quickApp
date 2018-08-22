import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatTabsModule
  ],
  exports: [MatGridListModule,MatTabsModule],
  declarations: []
})
export class MaterialsModule { }
