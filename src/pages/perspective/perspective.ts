import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { PerspectiveDetailPage } from '../../modals/perspective-detail/perspective-detail';
import { WalkthroughPage } from '../../modals/walkthrough/walkthrough';
import { LoginPage } from '../login/login';
import { HistoryPage } from '../../modals/history/history';
import { HelpPage } from '../../modals/help/help'
import { StatsPage } from '../../modals/stats/stats'
import * as moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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

  days: Array<{day: string, completed: string, currentDay: string, dayCode: string}> = [
    {day: 'M', completed: 'uncomplete', currentDay: '', dayCode: 'Mon'},
    {day: 'T', completed: 'uncomplete', currentDay: '', dayCode: 'Tue'},
    {day: 'W', completed: 'uncomplete', currentDay: '', dayCode: 'Wed'},
    {day: 'T', completed: 'uncomplete', currentDay: '', dayCode: 'Thu'},
    {day: 'F', completed: 'uncomplete', currentDay: '', dayCode: 'Fri'},
    {day: 'S', completed: 'uncomplete', currentDay: '', dayCode: 'Sat'},
    {day: 'S', completed: 'uncomplete', currentDay: '', dayCode: 'Sun'}
  ];
  week: string;
  userName: string;
  dayCode: number;
  day: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
    private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let today = new Date();
    let dd = today.getDay();
    dd = dd + -1;
    if (dd < 0) {
      dd = 6;
    }
    let startOfWeek: any;
    let endOfWeek: any;
    if (dd === 6) {
      startOfWeek = moment().startOf('week').subtract(dd, 'days').format('MMMM DD');
      endOfWeek = moment().format('DD');
    } else {
      startOfWeek = moment().startOf('week').add(1, 'days').format('MMMM DD');
      endOfWeek = moment().endOf('week').subtract(1, 'days').format('DD');
    }
    this.dayCode = dd;
    this.days[dd].currentDay = 'current';
    this.day = this.days[dd].dayCode;
    this.week = startOfWeek + ' - ' + endOfWeek;


    let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Week');
    dbW.valueChanges().subscribe((data) => {
      data.forEach((object, index) => {
       let obj: any = object;
       if (obj.length > 0) {
         obj.forEach(element => {
            if (element.Title === this.week) {
            this.days[element.dayCode].completed = 'complete';
          }
        });
       }
      });
    });

    let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/userInfo/');
    db.valueChanges().subscribe((obj) => {
      let userName = obj[1] as string;
      this.userName = userName;
    });
  }

  onBegin() {
    let modal = this.modalCtrl.create(PerspectiveDetailPage, { week: this.week, userName: this.userName, day: this.day, dayCode: this.dayCode});
    modal.present();
  }

  onHistory() {
    let modal = this.modalCtrl.create(HistoryPage, { week: this.week, userName: this.userName, day: this.day, dayCode: this.dayCode});
    modal.present();
  }

  onStats() {
    let modal = this.modalCtrl.create(StatsPage, { week: this.week, userName: this.userName, day: this.day, dayCode: this.dayCode});
    modal.present();
  }

  onHelp() {
    let modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }

  onInformation() {
    let tutorialInformation = {
      TimeStamp: "07-07",
      Value: "4",
      a1: "My pain has flared up after sitting at a desk all day!",
      a2: "I’ll never be able to achieve anything as my pain always flares up, and if I can’t achieve anything then life is horrible.",
      a3: "Actually, a lot of the pain is just secondary suffering, and the more I focus and worry about it, the worse it will get.",
      a4: "I’ve had good days in the past and it will get better. Flare-ups in my pain are not a prediction of how I’m doing.",
      q1: "Hi Harry, how are you feeling today?",
      q2: "We are truly sorry to hear you feel this way, Harry. What led to these feelings?",
      q3: "What thoughts arose from this situation?",
      q4: "How can you respond to this differently?",
      q5: "How can you reframe this situation?",
      tutorial: true
    }
    let modal = this.modalCtrl.create(PerspectiveDetailPage, tutorialInformation);
    modal.present();
  }

  dayClicked(weekIndex: number) {
    if (this.days[weekIndex].completed === 'complete'){
      let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Week');
      dbW.valueChanges().subscribe((data) => {
        data.forEach((object, index) => {
        let obj: any = object;
        if (index === (data.length - 1)) {
          obj.forEach((element) => {
            
            if (element.dayCode === weekIndex) {
              
              let modal = this.modalCtrl.create(PerspectiveDetailPage, 
                {TimeStamp: "time", 
                Value: element.Value,
                a1: element.a1,
                a2: element.a2,
                a3: element.a3,
                a4: element.a4,
                q1: element.q1,
                q2: element.q2,
                q3: element.q3,
                q4: element.q4,
                q5: element.q5
              });
              modal.present();
            }
          });
        }
      });
    });
    }
  }

  onProfileClick() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Walkthrough',
          handler: () => {
            let modal = this.modalCtrl.create(WalkthroughPage);
            modal.present();
          }
        },
        {
          text: 'Log Out',
          role: 'destructive',
          handler: () => {
            this.afAuth.auth.signOut().then(() =>{
              this.navCtrl.setRoot(LoginPage);
              // this.navCtrl.pop();              
          }, error => {
            let alert = this.alertCtrl.create({
              title: 'Sorry',
              subTitle: error.message,
              buttons: ['Okay']
            });
            alert.present();
          });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
 
    actionSheet.present();
  }


}
