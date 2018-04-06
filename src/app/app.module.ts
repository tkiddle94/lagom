import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BreathePage } from '../pages/breathe/breathe';
import { PerspectivePage } from '../pages/perspective/perspective';
import { PerspectiveDetailPage } from '../pages/perspective-detail/perspective-detail';
import { HistoryPage } from '../pages/history/history';
import { FocusPage } from '../pages/focus/focus';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { FocusDetailPage } from '../pages/focus-detail/focus-detail';
import { BreatheDetailPage } from '../pages/breathe-detail/breathe-detail';
import { HelpPage } from '../pages/help/help'


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BreathePage,
    FocusPage,
    PerspectivePage,
    WelcomePage,
    LoginPage,
    RegisterPage,
    TabsPage, 
    PerspectiveDetailPage,
    HistoryPage, 
    FocusDetailPage,
    BreatheDetailPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BreathePage,
    FocusPage,
    PerspectivePage,
    WelcomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    PerspectiveDetailPage,
    HistoryPage,
    FocusDetailPage,
    BreatheDetailPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
