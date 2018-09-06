import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, Events } from 'ionic-angular';
import { PerspectiveDetailPage } from '../../modals/perspective-detail/perspective-detail';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  items: any[] = [];
  week: string;
  userName: string;
  dayCode: number;
  day: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events,
    private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public modalCtrl: ModalController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('week')) {
      this.week = this.navParams.get('week');
    }
    if (this.navParams.get('day')) {
      this.day = this.navParams.get('day');
    }
    if (this.navParams.get('dayCode')) {
      this.dayCode = this.navParams.get('dayCode');
    }
    if (this.navParams.get('userName')){
      this.userName = this.navParams.get('userName');
    }
  let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBT');
    db.valueChanges().subscribe((data) => {
      data.forEach((object) => {
        this.items.push(object);
      });
    });
    this.events.subscribe('close', () => {
      this.close();
    });
    setTimeout(() => {
      if (this.items.length < 1) {
        let alert = this.alertCtrl.create({
          title: 'Empty',
          message: 'It looks like you have no entries, would you like to start one now?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                this.close();
              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.onItemSelected(null, true);
              }
            }
          ]
        });
        alert.present();
      }
    }, 500);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  onItemSelected(ev?, closeAll?) {
    if (closeAll) {
      let modal = this.modalCtrl.create(PerspectiveDetailPage, { closeAllModals: true, week: this.week, userName: this.userName, day: this.day, dayCode: this.dayCode});
      modal.present();
    } else {
      let modal = this.modalCtrl.create(PerspectiveDetailPage, ev);
      modal.present();
    }
  }

}
