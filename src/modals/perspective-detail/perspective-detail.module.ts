import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerspectiveDetailPage } from './perspective-detail';

@NgModule({
  declarations: [
    PerspectiveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PerspectiveDetailPage),
  ],
})
export class PerspectiveDetailPageModule {}
