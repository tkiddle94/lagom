import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BreathePage } from '../breathe/breathe';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginPressed(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.emailAddress, user.password);
      if (result) {
        this.navCtrl.setRoot(TabsPage);
      }
      console.log(result);
    }
    catch(e) {
      console.error(e);
    }
  }

}
