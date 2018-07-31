import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Chart } from 'chart.js';
/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  @ViewChild('barCanvas') barCanvas;

  chart: any;
  time: string;
  labels: any = {week: [], month: [], year: []};
  values: any = {week: [], month: [], year: []};
  month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  title: string = '';
  isBackward:boolean = false;
  isForward:boolean = false;
  totalWeeks: any = {total: 0, index: 1};
  totalMonths: any = {total: 0, index: 1};


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
  this.time = 'week';
    }

  ionViewDidLoad() {
    let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Week');
    dbW.valueChanges().subscribe((data) => {
      data.forEach((object) => {
       let values = [];
       let labels = [];
       let week: string = null;
       let obj: any = object;
       this.totalWeeks.total = this.totalWeeks.total + 1;
       obj.forEach(element => {
            values.push(element.Value);
            labels.push(element.Day);
            week = element.Title;
       });
       this.labels.week.push({week: week, labels: labels});
       this.values.week.push(values);
      });
    });

    this.month.forEach((month) => {
        let dbM = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Month/' + month);
        let values = []
        let labels = []

        dbM.valueChanges().subscribe((data) => {
        if (data.length > 0) {
            this.totalMonths.total = this.totalMonths.total + 1;            
            data.forEach((object) => {
                let obj: any = object;
                
                labels.push(obj.Day);
                var value =+ obj.Value;
                values.push(value);
                
            });
        }
            if (labels.length > 0 ){
                this.labels.month.push({month: month, labels: labels});
                this.values.month.push({month: month, values: values});                
            } 
        });
    });
    
    let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Year');
    db.valueChanges().subscribe((data) => {
      data.forEach((object) => {
        let obj: any = object;
        this.labels.year.push(obj.Month);
        let average = obj.Sum / obj.Count;
        this.values.year.push(average)
      });
    });

   setTimeout(() => {
       this.setGraph(this.labels.week[this.totalWeeks.total - this.totalWeeks.index].labels, this.values.week[this.totalWeeks.total - this.totalWeeks.index], this.labels.week[this.totalWeeks.total - this.totalWeeks.index].week);
       this.checkSelectorButtonDisable(this.totalWeeks.index, this.totalWeeks.total);      
   }, 1000);
   
  }

  segmentChanged() {
      console.log(this.labels);
      if (this.time === 'all') {
        this.setGraph(this.labels.year, this.values.year);
        this.checkSelectorButtonDisable(0, 0);      
    } else if (this.time === 'month') {
        this.setGraph(this.labels.month[this.totalMonths.total - this.totalMonths.index].labels, this.values.month[this.totalMonths.total - this.totalMonths.index].values, this.labels.month[this.totalMonths.total - this.totalMonths.index].month);
        this.checkSelectorButtonDisable(this.totalMonths.index, this.totalMonths.total);      
    } else {
       this.setGraph(this.labels.week[this.totalWeeks.total - this.totalWeeks.index].labels, this.values.week[this.totalWeeks.total - this.totalWeeks.index], this.labels.week[this.totalWeeks.total - this.totalWeeks.index].week);
       this.checkSelectorButtonDisable(this.totalWeeks.index, this.totalWeeks.total);      
    }

    }
  
    setGraph(labels: any, values: any, title: string = '') {
        console.log('labels', labels);
        console.log('values', values);
        console.log('title', title);
        this.title = title;
            this.chart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    
                    data: values,
                    backgroundColor: '#02b5ef'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            max: 10,
                            stepSize: 1,
                        },
                        gridLines: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }],
                    xAxes: [{
                        barThickness: 10,
                        gridLines: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }]
                },
                title: {
                    display: false,
                },
                legend: {
                    display:false
                }
            }
        });
    }

  close() {
    this.viewCtrl.dismiss();
  }

  onArrowPress(change: number) {
    if (this.time === 'month') {
        this.totalMonths.index = this.totalMonths.index + change;
    } else if (this.time === 'week') {
        console.log('change', change);
        this.totalWeeks.index = this.totalWeeks.index + change;
        console.log('index', this.totalWeeks.index);
    }
    this.segmentChanged();
  }


  checkSelectorButtonDisable(index: number, total: number) {
      this.isForward = index > 1;
      this.isBackward = index !== total;
  }

}
