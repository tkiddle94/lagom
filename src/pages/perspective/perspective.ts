import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, AlertController, Slides } from 'ionic-angular';
import { PerspectiveDetailPage } from '../../modals/perspective-detail/perspective-detail';
import { WalkthroughPage } from '../../modals/walkthrough/walkthrough';
import { LoginPage } from '../login/login';
import { HistoryPage } from '../../modals/history/history';
import { HelpPage } from '../../modals/help/help'
import { StatsPage } from '../../modals/stats/stats'
import { HelperService } from '../../helpers/data.helpers'
import * as moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ICbtEntry, ICbtData, ICbtStreak } from '../../interfaces/interfaces';

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

  @ViewChild('mySlider') slider: Slides;

  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  private selectedMonth: number;
  private selectedYear: number;
  private isInit: boolean = false;
  private userID: string;
  private completedDays: number[];

  public week: string;
  public userName: string;
  public dayCode: number;
  public calendarRows: Array<Array<{ day: number, complete: string }>>;
  public monthComplete: Array<boolean>;
  public monthTitle: string;
  public monthCount: number;
  public monthAverage: number;
  public streak: number;
  public slideOpts = { direction: 'vertical' }

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private helper: HelperService) {
  }

  ionViewDidEnter() {
    // this.slider.getSlider().update();
    // this.slider.loop = true;
    this.slider.slideTo(11);
    this.slider.update();
  }

  ionViewDidLoad() {
    let today = new Date();
    this.userID = this.afAuth.auth.currentUser.uid;
    this.monthTitle = this.monthNames[today.getMonth()];
    this.selectedMonth = today.getMonth() + 1;
    this.selectedYear = today.getFullYear();

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
    this.week = startOfWeek + ' - ' + endOfWeek;

    let totalMonthDays = moment().daysInMonth();
    this.monthComplete = new Array(totalMonthDays);
    this.monthComplete.fill(false);


    this.updateSlide();

    this.setUsername();
  }

  updateSlide() {
    this.helper.getUserStreak(this.userID).then(ret => {
      console.log('return', ret);
      if (ret) {
        let streakData: ICbtStreak = ret;
        this.streak = streakData.count;
      }
    });

    this.helper.getUserMonthData(this.userID, this.formatSelectedMonth(this.selectedMonth, this.selectedYear, true)).then(ret => {
      console.log('moth', ret);
      if (ret) {
        let monthData: ICbtData = ret;
        this.monthAverage = monthData.average;
        this.monthCount = monthData.count;
        this.completedDays = monthData.days;
        if (this.completedDays && this.completedDays.length > 0) {
          this.completedDays.forEach(completedDay => {
            this.monthComplete[completedDay] = true;
          });
        }
        console.log('completedays', this.monthComplete);
      } else {
        this.monthAverage = null;
        this.monthCount = 0;
        this.monthComplete.fill(false);
      }
      this.setCalendarRows(this.formatSelectedMonth(this.selectedMonth, this.selectedYear), this.selectedMonth);
    });
  }
  setCalendarRows(selectedDate: string, selectedMonth: number) {
    let startOfMonth = moment(selectedDate).startOf('month').day() - 1;
    startOfMonth = startOfMonth < 0 ? 6 : startOfMonth;
    let totalMonthDays = moment(selectedDate).daysInMonth();
    let numberOfRows = Math.ceil((totalMonthDays + startOfMonth) / 7);

    let rows = new Array(numberOfRows);
    let weekEmpty = new Array(7);
    rows.fill(weekEmpty);
    rows = rows.map((val, index) => {
      let week = [{ day: undefined, completed: 'uncomplete' }, { day: undefined, completed: 'uncomplete' }, { day: undefined, completed: 'uncomplete' }, { day: undefined, completed: 'uncomplete' }, { day: undefined, completed: 'uncomplete' }, { day: undefined, completed: 'uncomplete' }, { day: undefined, completed: 'uncomplete' }];
      week = week.map((_val, i) => {
        let date = ((7 * index) + 1) - (startOfMonth) + i;
        date = date <= 0 ? undefined : date;
        date = date > totalMonthDays ? undefined : date;
        let completed = this.monthComplete[date - 1] ? 'complete' : this.monthComplete[date - 1] === false ? 'uncomplete' : '';
        let today = new Date();
        if (selectedMonth === (today.getMonth() + 1)) {
          completed = date <= today.getDate() ? completed : (date ? 'locked' : '');
        }
        return { day: date, completed: completed };
      });
      return week;
    });
    this.calendarRows = rows;
  }

  formatSelectedMonth(month: number, year: number, shorten: boolean = false): string {
    let formattedMonth: string = month > 9 ? `${month}` : `0${month}`;
    if (shorten) {
      let formattedYear: string = `${year}`;
      formattedYear = formattedYear.slice(2);
      return `${formattedMonth}-${formattedYear}`;
    } else {
      return `${year}-${formattedMonth}`;
    }
  }

  setUsername() {
    this.helper.getUserName(this.userID).then((userNameVal) => {
      this.userName = userNameVal;
      console.log('user', this.userName);
    });
  }

  onBegin(date: number) {
    let modal = this.modalCtrl.create(PerspectiveDetailPage, { week: this.week, userName: this.userName, dayCode: date });
    modal.present();
  }

  onHistory() {
    let modal = this.modalCtrl.create(HistoryPage, { week: this.week, userName: this.userName, dayCode: this.dayCode });
    modal.present();
  }

  onStats() {
    let modal = this.modalCtrl.create(StatsPage, { week: this.week, userName: this.userName, dayCode: this.dayCode });
    modal.present();
  }

  onHelp() {
    let modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }

  calendarDateClicked(date: number, completed: string) {
    if (completed === ' complete') {
      this.onHistory();
    } else if (completed === 'uncomplete') {
      this.onBegin(date);
    }
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

  onSlideDidChange(event) {
    if (event && this.isInit) {
      let monthChange: number = event.swipeDirection === 'next' ? 1 : -1;
      this.selectedMonth = this.selectedMonth + monthChange;
      if (this.selectedMonth === 13) {
        this.selectedMonth = 1;
        this.selectedYear = this.selectedYear + 1;
      } else if (this.selectedMonth === 0) {
        this.selectedMonth = 12;
        this.selectedYear = this.selectedYear - 1;
      }
      this.monthTitle = this.monthNames[this.selectedMonth - 1];
      this.updateSlide();
    }
    this.isInit = true;
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
            this.afAuth.auth.signOut().then(() => {
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
