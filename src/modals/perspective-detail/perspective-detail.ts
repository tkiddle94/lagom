import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Events } from 'ionic-angular';
import { User } from '../../models/user';
import { StatsPage } from '../stats/stats';
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

  userInfo = {userName: ''} as User;
  feelingValue: number = 5;
  answers: string[] = ['', '', '', ''];
  questions: Array<Array<string>> = [[
    `Hi ${this.userInfo.userName}, how are you feeling today?`, 
    `We are truly sorry to hear you feel this way, ${this.userInfo.userName}. What led to these feelings?`, 
    `What thoughts arose from this situation?`, 
    `How can you respond to this differently?`,
    `How can you reframe this situation?`],
    [
      `Hi ${this.userInfo.userName}, how are you feeling today?`, 
    `Glad to hear you are doing alright, ${this.userInfo.userName}. What led to these feelings?`, 
    `What thoughts arose from this situation?`, 
    `How can you look at this differently?`,
    `How can you reframe this situation?`
    ],
    [
      `Hi ${this.userInfo.userName}, how are you feeling today?`, 
    `Awesome work, ${this.userInfo.userName}! What has made you feel so good?`, 
    `What thoughts arose from this situation?`, 
    `Why has this made you feel so great?`,
    `How can you incorporate more of this into your life?`
    ]];;
  dateTitle: string;
  readOnly: boolean = false;
  week: string
  weekNumber: number = 0;
  dayNumber: number = 0;
  yearSum: number = 0;
  yearCount: number = 0;
  questionSelector: number = 1;
  isEnabled: boolean = false;
  closeAllModals: boolean = false;
  day: string;
  dayCode: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, public events: Events,
    private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
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
    if (this.navParams.get('closeAllModals')){
      this.closeAllModals = true;
    }
    if (this.navParams.get('userName')) {
      this.userInfo.userName = this.navParams.get('userName');
      this.questions = [[
        `Hi ${this.userInfo.userName}, how are you feeling today?`, 
        `We are truly sorry to hear you feel this way, ${this.userInfo.userName}. What led to these feelings?`, 
        `What thoughts arose from this situation?`, 
        `How can you respond to this differently?`,
        `How can you reframe this situation?`],
        [
          `Hi ${this.userInfo.userName}, how are you feeling today?`, 
        `Glad to hear you are doing alright, ${this.userInfo.userName}. What led to these feelings?`, 
        `What thoughts arose from this situation?`, 
        `How can you look at this differently?`,
        `How can you reframe this situation?`
        ],
        [
          `Hi ${this.userInfo.userName}, how are you feeling today?`, 
        `Awesome work, ${this.userInfo.userName}! What has made you feel so good?`, 
        `What thoughts arose from this situation?`, 
        `Why has this made you feel so great?`,
        `How can you incorporate more of this into your life?`
        ]];
    }
    this.dateTitle = moment().format('DD-MM');
    if (this.navParams.get('TimeStamp')) {
      this.questionSelector = 0;
      this.dateTitle = this.navParams.get('TimeStamp');
      this.readOnly = true;
      this.answers[0] = this.navParams.get('a1');
      this.answers[1] = this.navParams.get('a2');
      this.answers[2] = this.navParams.get('a3');
      this.answers[3] = this.navParams.get('a4');
      this.feelingValue = this.navParams.get('Value');
      this.questions[0][0] = this.navParams.get('q1');
      this.questions[0][1] = this.navParams.get('q2');
      this.questions[0][2] = this.navParams.get('q3');
      this.questions[0][3] = this.navParams.get('q4');
      this.questions[0][4] = this.navParams.get('q5');
    } 
    if (this.navParams.get('tutorial')) {
      let alert = this.alertCtrl.create({
        title: 'Tutorial',
        message: 'Here is a Perspective example taken from our CEO, Harry Rice.',
        buttons: [
          {
            text: 'Okay',
          }
        ]
      });
      alert.present();
    }
   
    this.getWeek();
    this.getYear();
  }

  close() {
    this.viewCtrl.dismiss();
    if (this.closeAllModals) {
      this.events.publish('close');
    }
  }

  onSave() {
    if (this.dayNumber < 0 ) {
      this.dayNumber = 0;
    }

    let time = moment().format('DD-MM-YYYY HH:mm:SS');
    let date = moment().format('DD-MM-YYYY');
    var weekObj = {
      TimeStamp: time,
      Value: this.feelingValue,
      a1: this.answers[0],
      a2: this.answers[1],
      a3: this.answers[2],
      a4: this.answers[3],
      q1: this.questions[this.questionSelector][0],
      q2: this.questions[this.questionSelector][1],
      q3: this.questions[this.questionSelector][2],
      q4: this.questions[this.questionSelector][3],
      q5: this.questions[this.questionSelector][4],
      Title: this.week,
      Day: this.day,
      dayCode: this.dayCode
    }
    var updateCBT = {};
    updateCBT[time] = weekObj

    var updateValue = {};
    this.yearCount = this.yearCount + 1;
    this.yearSum = this.yearSum + this.feelingValue;
    updateValue[date] = {test: this.feelingValue};
    updateValue['/Month/' + moment().format('MM') + '/' + date] = {Day: moment().format('DD'), Value: this.feelingValue};
    updateValue['/Week/' + `${this.weekNumber}/` + `${this.dayNumber}`] = weekObj;
    updateValue['/Year/' + moment().format('MM')] = {Count: this.yearCount, Month: moment().format('MMM'), Sum: this.yearSum};


    let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid);
    db.update('CBT', updateCBT);
    db.update('CBTValues', updateValue);

    this.close();
    
  }

 getWeek(): any {
    let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Week');
    dbW.valueChanges().subscribe((data) => {
      this.weekNumber = data.length;
      let latestWeek = data[data.length - 1];
      this.dayNumber = data.length - 1;
      if (latestWeek[1].Title !== this.week) {
        this.weekNumber = this.weekNumber + 1;
        this.dayNumber = 1;
      }
    });
  } 

  getYear() {
    let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Year/01');
    dbW.valueChanges().subscribe((data) => {
      let obj = data;
    if (obj.length > 0) {
      let yearCount = obj[0] as number;
      this.yearCount = yearCount;
      let yearSum = obj[2] as number;
      this.yearSum = yearSum;
    }
    });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to save your entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
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
  }

  onFeelingValueChange() {
    if (this.feelingValue < 5 ) {
      this.questionSelector = 0;
    } else if (this.feelingValue < 8) {
      this.questionSelector = 1;
    } else {
      this.questionSelector = 2;      
    }
  }

  onTextChange() {
    if (this.answers[0].length > 0 && this.answers[1].length > 0 && this.answers[2].length > 0 && this.answers[3].length > 0) {
      this.isEnabled = true;
    }
  }
}
