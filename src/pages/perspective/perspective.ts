import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PerspectiveDetailPage } from '../perspective-detail/perspective-detail';
import { HistoryPage } from '../history/history';

/**
 * Generated class for the PerspectivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perspective',
  templateUrl: 'perspective.html',
})
export class PerspectivePage {

  days: Array<{day: string, completed: string}> = [{day: 'M', completed: 'complete'}, {day: 'T', completed: 'uncomplete'}, {day: 'W', completed: 'complete'}, {day: 'T', completed: 'uncomplete'}, {day: 'F', completed: 'uncomplete'}, {day: 'S', completed: 'uncomplete'}, {day: 'S', completed: 'uncomplete'}];
  test = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    let today = new Date();
    let dd = today.getDay();
    console.log('today:', today, 'dd', dd);
  }

  onBegin() {
    //this.navCtrl.setRoot(PerspectiveDetailPage);
    let modal = this.modalCtrl.create(PerspectiveDetailPage);
    modal.present();
  }

  onHistory() {
    let modal = this.modalCtrl.create(HistoryPage);
    modal.present();
  }


}
