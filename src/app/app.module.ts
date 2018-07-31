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
    StatsPageModule
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
