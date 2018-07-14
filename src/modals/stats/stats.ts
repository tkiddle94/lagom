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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
  this.time = 'week';
    }

  ionViewDidLoad() {
    let dbW = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Week');
    dbW.valueChanges().subscribe((data) => {
      data.forEach((object) => {
       let values = [];
       let labels = [];
       let obj: any = object;
       obj.forEach(element => {
           values.push(element.Value);
           labels.push(element.Day);
       });
       this.labels.week.push(labels);
       this.values.week.push(values);
      });
    });

    this.month.forEach((month) => {
        let dbM = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Month/' + month);
        if (dbM) {
            let values = []
            let labels = []
            dbM.valueChanges().subscribe((data) => {
                data.forEach((object) => {
                let obj: any = object;
                
                labels.push(obj.Day);
                var value =+ obj.Value;
                values.push(value);
                
                });
                if (labels.length > 0 ){
                    this.labels.month.push({month: month, labels: labels});
                    this.values.month.push({month: month, values: values});                
                } 
            });
        }
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
       this.setGraph(this.labels.week[0], this.values.week[0]);
   }, 1000);
   
  }

  segmentChanged() {
      console.log(this.labels);
      if (this.time === 'all') {
        this.setGraph(this.labels.year, this.values.year);
      } else if (this.time === 'month') {
        this.setGraph(this.labels.month[0].labels, this.values.month[0].values);
      } else {
        this.setGraph(this.labels.week[0], this.values.week[0]);
      }

    }
  
    setGraph(labels: any, values: any) {
        console.log('labels', labels);
        console.log('values', values);
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
                            display:false
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

}
