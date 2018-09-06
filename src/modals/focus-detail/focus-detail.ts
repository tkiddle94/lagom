import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { FocusPlayPage } from '../focus-play/focus-play';
/**
 * Generated class for the FocusDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-focus-detail',
  templateUrl: 'focus-detail.html',
})
export class FocusDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio, private viewCtrl: ViewController, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.nativeAudio.preloadComplex('breathing_1', 'assets/meditations/breathing_meditation_1.mp3', 1, 1, 0);
  }

  onPlay() {
    let modal = this.modalCtrl.create(FocusPlayPage);
    modal.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
