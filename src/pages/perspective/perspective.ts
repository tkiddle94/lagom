import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PerspectiveDetailPage } from '../../modals/perspective-detail/perspective-detail';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    let today = new Date();
    let dd = today.getDay();
    dd = dd + -1;
    if (dd < 0) {
      dd = 6;
    }
    let now = moment().format('DD MMM');
    let startOfWeek: any;
    let endOfWeek: any;
    if (dd === 6) {
      startOfWeek = moment().startOf('week').subtract(dd, 'days').format('MMMM DD');
      endOfWeek = moment().format('DD');
    } else {
      startOfWeek = moment().startOf('week').add(1, 'days').format('MMMM DD');
      endOfWeek = moment().endOf('week').subtract(1, 'days').format('DD');
    }
    this.days[dd].currentDay = 'current';
    let week = startOfWeek + ' - ' + endOfWeek;


    let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Week');
    dbW.valueChanges().subscribe((data) => {
      data.forEach((object, index) => {
       let obj: any = object;
       obj.forEach(element => {
          if (element.Title === week) {
          this.days[element.dayCode].completed = 'complete';
        }
      });
       
      });
    });
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

  onStats() {
    let modal = this.modalCtrl.create(StatsPage);
    modal.present();
  }

  onHelp() {
    let modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }

  dayClicked(index: number) {
    if (this.days[index].completed === 'complete'){
      let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Week');
      dbW.valueChanges().subscribe((data) => {
        data.forEach((object, index) => {
        let obj: any = object;
        if (index === (data.length - 1)) {
          obj.forEach((element) => {
            if (element.dayCode === index) {
              console.log(element);
              let modal = this.modalCtrl.create(PerspectiveDetailPage, 
                {TimeStamp: element.TimeStamp, 
                Value: element.Value,
                a1: element.a1,
                a2: element.a2,
                a3: element.a3,
                a4: element.a4});
              modal.present();
            }
          });
        }
      });
    });
    }
  }


}
