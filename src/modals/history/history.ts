import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBT');
    db.valueChanges().subscribe((data) => {
      console.log('data', data);
      data.forEach((object) => {
        this.items.push(object);
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onItemSelected(ev) {
    let modal = this.modalCtrl.create(PerspectiveDetailPage, ev);
    modal.present();
  }

}
