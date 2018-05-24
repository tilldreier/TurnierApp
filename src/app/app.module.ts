import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {HttpModule} from '@angular/http';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewPage } from '../pages/new/new';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { LocalServiceProvider } from '../providers/local-service/local-service';
import {SettingsPage} from "../pages/settings/settings";
import {TournamentPage} from "../pages/tournament/tournament";

const firebaseConfig = {
  apiKey: "AIzaSyDYWp9Azz3lQ0lzYtYx0GG3Y66jO7G03-8",
  authDomain: "turnierapp-e01d7.firebaseapp.com",
  databaseURL: "https://turnierapp-e01d7.firebaseio.com",
  projectId: "turnierapp-e01d7",
  storageBucket: "",
  messagingSenderId: "1020292061998"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewPage,
    SettingsPage,
    TournamentPage
  ],
  imports: [
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewPage,
    SettingsPage,
    TournamentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    LocalServiceProvider
  ]
})
export class AppModule {}
