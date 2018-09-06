import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the FocusPlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-focus-play',
  templateUrl: 'focus-play.html',
})
export class FocusPlayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.nativeAudio.preloadComplex('breathing_1', 'assets/meditations/breathing_meditation_1.mp3', 1, 1, 0);
    setTimeout(() => {
      this.onPlay();
    }, 100);
  }

  onPlay() {
    this.nativeAudio.play('breathing_1');
  }

  onStop() {
    this.nativeAudio.stop('breathing_1');
    this.viewCtrl.dismiss();
  }


}
