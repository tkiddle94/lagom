import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FocusDetailPage } from './focus-detail';

@NgModule({
  declarations: [
    FocusDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FocusDetailPage),
  ],
})
export class FocusDetailPageModule {}
