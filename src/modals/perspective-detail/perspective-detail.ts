import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';


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
  answers: string[] = ['Please describe it here...', 'Please describe it here...', 'Please describe it here...', 'Please describe it here...'];
  questions: string[] = [
    'Hi Harry, how are you feeling today?', 
    'What led you to feel like this?', 
    'What thoughts arose from this situation?', 
    'How can you respond to this differently?',
    'How can you reframe this situation?'];
  dateTitle: string;
  userInfo: any;
  readOnly: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let now = moment().format('DD-MM-YYYY HH:mm:SS');
    this.dateTitle = moment().format('DD-MM');
    if (this.navParams.get('TimeStamp')) {
      this.dateTitle = this.navParams.get('TimeStamp');
      this.readOnly = true;
      this.answers[0] = this.navParams.get('a1');
      this.answers[1] = this.navParams.get('a2');
      this.answers[2] = this.navParams.get('a3');
      this.answers[3] = this.navParams.get('a4');
      this.feelingValue = this.navParams.get('Value');
    }  
    let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/UserInfo/');
    db.valueChanges().subscribe((obj) => {
     this.userInfo = obj[0];
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  onSave() {

    let time = moment().format('DD-MM-YYYY HH:mm:SS');
    let date = moment().format('DD-MM-YYYY');

    var updateCBT = {};
    updateCBT[time] = {test: 'teetwe'};

    var updateValue = {};
    updateValue[date] = {test: this.feelingValue};
    updateValue['/Month/' + moment().format('MM') + '/' + date] = {Day: moment().format('DD'), Value: this.feelingValue};


    let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid);
    db.update('CBT', updateCBT);
    db.update('CBTValues', updateValue);
    
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to save your entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.onSave();
          }
        }
      ]
    });
    alert.present();
    console.log(this.answers);
  }
}
