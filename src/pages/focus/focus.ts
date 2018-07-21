import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FocusDetailPage } from '../../modals/focus-detail/focus-detail'
import { HelpPage } from '../../modals/help/help'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  meditationSelected() {
    this.navCtrl.push(FocusDetailPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FocusPage');
  }

  onHelp() {
    let modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }

}
