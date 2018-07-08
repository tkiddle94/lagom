import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { BreathePage } from '../../pages/breathe/breathe';
import { User } from '../../models/user';
import { TabsPage } from '../../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  isEnabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public viewCtrl: ViewController,
    private alertCtrl: AlertController) {
  }

  async registerPressed(user: User) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.emailAddress, user.password).then(() =>{
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: `Your account has been created and a verifcation email has been sent to: ${this.user.emailAddress}`,
        buttons: [{
          text: 'Okay',
          handler: () => {
            this.navCtrl.setRoot(TabsPage);
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
    
    //this.navCtrl.setRoot(BreathePage);
  }

  close(){
    this.viewCtrl.dismiss();
  }

  onChange() {
    if (this.user.emailAddress && this.user.password && this.user.passwordRepeat 
        && this.user.password.length > 5
        && this.user.password === this.user.passwordRepeat) {
          this.isEnabled = true;
        } else {
          this.isEnabled = false;
        }
  }
}
