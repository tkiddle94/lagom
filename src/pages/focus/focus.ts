import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { FocusDetailPage } from '../../modals/focus-detail/focus-detail'
import { HelpPage } from '../../modals/help/help'
import { WalkthroughPage } from '../../modals/walkthrough/walkthrough';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the FocusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-focus',
  templateUrl: 'focus.html',
})
export class FocusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,
    private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController,

    public modalCtrl: ModalController) {
  }

  meditationSelected() {
    this.navCtrl.push(FocusDetailPage);
  }

  onHelp() {
    let modal = this.modalCtrl.create(HelpPage);
    modal.present();
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
            this.afAuth.auth.signOut().then(() =>{
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
