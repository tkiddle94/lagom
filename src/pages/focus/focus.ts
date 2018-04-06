import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FocusDetailPage } from '../focus-detail/focus-detail'

/**
 * Generated class for the FocusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-focus',
  templateUrl: 'focus.html',
})
export class FocusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  meditationSelected() {
    this.navCtrl.push(FocusDetailPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FocusPage');
  }

}
