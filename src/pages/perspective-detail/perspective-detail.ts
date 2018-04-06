import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PerspectiveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perspective-detail',
  templateUrl: 'perspective-detail.html',
})
export class PerspectiveDetailPage {

  feelingValue: number = 5;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerspectiveDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
