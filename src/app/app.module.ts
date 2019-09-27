import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { BreathePageModule } from '../pages/breathe/breathe.module';
import { PerspectivePageModule } from '../pages/perspective/perspective.module';
import { FocusPageModule } from '../pages/focus/focus.module';
import { LoginPageModule } from '../pages/login/login.module'
import { TabsPage } from '../pages/tabs/tabs';

import { RegisterPageModule } from '../modals/register/register.module';
import { ForgotPasswordPageModule } from '../modals/forgot-password/forgot-password.module';
import { PerspectiveDetailPageModule } from '../modals/perspective-detail/perspective-detail.module';
import { FocusDetailPageModule } from '../modals/focus-detail/focus-detail.module';
import { BreatheDetailPageModule } from '../modals/breathe-detail/breathe-detail.module';
import { HelpPageModule } from '../modals/help/help.module';
import { HistoryPageModule } from '../modals/history/history.module';
import { StatsPageModule } from '../modals/stats/stats.module';
import { WalkthroughPageModule } from '../modals/walkthrough/walkthrough.module';
import { FocusPlayPageModule } from '../modals/focus-play/focus-play.module';

import { HelperService } from '../helpers/data.helpers';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { NativeAudio } from '@ionic-native/native-audio';
import { MusicControls } from '@ionic-native/music-controls';
import { Media } from '@ionic-native/media';




@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BreathePageModule,
    FocusPageModule,
    PerspectivePageModule,
    LoginPageModule,
    BreatheDetailPageModule,
    PerspectiveDetailPageModule,
    HistoryPageModule, 
    FocusDetailPageModule,
    HelpPageModule,
    ForgotPasswordPageModule,
    RegisterPageModule,
    StatsPageModule,
    WalkthroughPageModule,
    FocusPlayPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    CallNumber,
    NativeAudio,
    MusicControls,
    Media,
    HelperService,
    AngularFirestore,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
