import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

/*
  Generated class for the ReposPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/repos/repos.html',
})
export class ReposPage {
  url: string = "";
  name: string = "Repo"
  constructor(private nav: NavController, navParams: NavParams, platform: Platform) {
    this.url = navParams.get('url');
    this.name = navParams.get('name');

    console.log("param url = " + this.url);
    /*platform.ready().then(() => {
      cordova.InAppBrowser.open(this.url, '_blank', 'location=yes');
    });*/

    window.open(this.url);
  }


  closeRepoDetail(ev: any){
    this.nav.pop();
  }

}
