import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { BreatheDetailPage } from '../breathe-detail/breathe-detail';
import { HelpPage } from '../help/help';

/**
 * Generated class for the BreathePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-breathe',
  templateUrl: 'breathe.html',
})
export class BreathePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showTutorial: boolean = false;
  showFab: boolean= true;
  public breaths: number = 1;
 
  ionViewDidLoad() {
    console.log(this.breaths);
    setInterval(this.breathCount(this.breaths), 1000);
  }

  extraSelected() {
    this.navCtrl.push(BreatheDetailPage);
  }

  sosPressed() {
    this.navCtrl.push(HelpPage);
  }

  breathCount(count) {
    //this.breaths + 1;
    console.log(this.breaths);
    // return this.breaths = this.breaths + 1;
  }

  infoPressed() {
    this.showTutorial = true;
    this.showFab = false;
  }

  dismissPressed() {
    this.showTutorial = false;
    this.showFab = true;
  }

}
