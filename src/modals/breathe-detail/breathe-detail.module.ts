import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreatheDetailPage } from './breathe-detail';

@NgModule({
  declarations: [
    BreatheDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BreatheDetailPage),
  ],
})
export class BreatheDetailPageModule {}
