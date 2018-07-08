import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { BreatheDetailPage } from '../../modals/breathe-detail/breathe-detail';
import { HelpPage } from '../../modals/help/help';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  showTutorial: boolean = false;
  showFab: boolean= true;
  public breaths: number = 0;
 
  ionViewDidLoad() {
    let timer = TimerObservable.create(6000, 6000).subscribe(t => { this.breaths = t; });
  }

  dismissPressed() {
    this.showTutorial = false;
    this.showFab = true;
  }

  onHelp() {
    let modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }

  onInformation() {
    this.showTutorial = true;
    this.showFab = false;
  }

  onAdd() {
    this.navCtrl.push(BreatheDetailPage);
  }

}
