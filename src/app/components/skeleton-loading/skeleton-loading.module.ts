import { NgModule } from '@angular/core';
import { SkeletonHorizontalItemsComponent, SkeletonTextAreaComponent, SkeletonTextComponent, SkeletonToggleComponent } from './skeleton-loading.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [SkeletonTextAreaComponent, SkeletonToggleComponent, SkeletonTextComponent, SkeletonHorizontalItemsComponent],
  exports: [SkeletonTextAreaComponent, SkeletonToggleComponent, SkeletonTextComponent, SkeletonHorizontalItemsComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]

})
export class SkeletonLoadingModule {

  constructor() { }

  ngOnInit() { }

}
