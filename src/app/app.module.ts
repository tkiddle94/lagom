import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { BreathePage } from '../pages/breathe/breathe';
import { PerspectivePage } from '../pages/perspective/perspective';
import { FocusPage } from '../pages/focus/focus';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { RegisterPage } from '../modals/register/register';
import { ForgotPasswordPage } from '../modals/forgot-password/forgot-password';
import { PerspectiveDetailPage } from '../modals/perspective-detail/perspective-detail';
import { FocusDetailPage } from '../modals/focus-detail/focus-detail';
import { BreatheDetailPage } from '../modals/breathe-detail/breathe-detail';
import { HelpPage } from '../modals/help/help';
import { HistoryPage } from '../modals/history/history';
import { StatsPage } from '../modals/stats/stats';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FIREBASE_CONFIG } from './app.firebase.config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    BreathePage,
    FocusPage,
    PerspectivePage,
    LoginPage,
    RegisterPage,
    TabsPage, 
    PerspectiveDetailPage,
    HistoryPage, 
    FocusDetailPage,
    BreatheDetailPage,
    HelpPage,
    ForgotPasswordPage,
    StatsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BreathePage,
    FocusPage,
    PerspectivePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    PerspectiveDetailPage,
    HistoryPage,
    FocusDetailPage,
    BreatheDetailPage,
    HelpPage,
    ForgotPasswordPage,
    StatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
