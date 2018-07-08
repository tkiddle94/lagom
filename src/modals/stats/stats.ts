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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private aFdatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
  this.time = 'week';
    }

  ionViewDidLoad() {
    let days: any[] = [];
    let values: any[] = [];
    // let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues');
    // db.valueChanges().subscribe((data) => {
    //     console.log('data', data);
    //   data.forEach((object) => {
    //     console.log(object);
    //   });
    // });
    let db = this.aFdatabase.list(this.afAuth.auth.currentUser.uid + '/CBTValues/Month/01');
    db.valueChanges().subscribe((data) => {
      data.forEach((object) => {
        let obj: any = object;
        days.push(obj.Day);
        var value =+ obj.Value;
        values.push(value);
        console.log(days, values);
      });
    });
    setTimeout(() => {
        this.chart = new Chart(this.barCanvas.nativeElement, {
            type: 'line',
                  data: {
                      labels: ["a", "b", "b", "b", "b"],
                      datasets: [{
                          label: 'June',
                          data: [1,2 ,3 ,4 ,5],
                          
                      }]
                  },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      }
                  }
       
              });
    }, 500);
   
  }

  segmentChanged() {
      console.log(this.time);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
