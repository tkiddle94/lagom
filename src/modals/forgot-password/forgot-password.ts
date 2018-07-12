import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  emailAddress: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  resetPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.emailAddress).then(() =>{
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: `An email has been sent to: ${this.emailAddress}`,
        buttons: [{
          text: 'Okay',
          handler: () => {
            this.viewCtrl.dismiss();
          }
      }]
      });
      alert.present();
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: error.message,
        buttons: ['Okay']
      });
      alert.present();
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
