import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
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
  isEnabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginPressed(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.emailAddress, user.password);
      if (result) {
        // this.navCtrl.setRoot(TabsPage);
      }
      console.log(result);
    }
    catch(e) {
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: e.message,
        buttons: ['Okay']
      });
      alert.present();

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

  onChange() {
    if (this.user.emailAddress && this.user.password && this.user.password.length > 5) {
      this.isEnabled = true;
    } else {
      this.isEnabled = false;
    }
  }

}
