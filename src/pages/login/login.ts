import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RegisterPage } from '../../modals/register/register';
import { ForgotPasswordPage } from '../../modals/forgot-password/forgot-password';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public modalCtrl: ModalController) {
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

  registerPressed() {
    let registerModal = this.modalCtrl.create(RegisterPage);
    registerModal.present();
  }

  forgotPressed() {
    let forgotModal = this.modalCtrl.create(ForgotPasswordPage);
    forgotModal.present();
  }

}
