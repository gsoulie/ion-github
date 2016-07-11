import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav, App, NavController, Toast} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {UsersPage} from './pages/users/users';
import {ReposPage} from './pages/repos/repos';
import {OrganizationsPage} from './pages/organizations/organizations';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {GithubUsers} from './providers/github-users/github-users';
import {User} from './models/user';
import {UserDetailsPage} from './pages/user-details/user-details';

@Component({
  templateUrl: 'build/app.html',
  providers: [GithubUsers]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = UsersPage;
  pages: Array<{title: string, component: any}>;
  user: User;
  username: string = "gsoulie";
  gitUser: any;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private githubUsers: GithubUsers
  ) {
    this.initializeApp();
    this.user = new User();
    this.gitUser = githubUsers;

    this.gitUser
      .loadDetails(this.username)
      .then(user => this.user = user);

    // set our app's pages
    this.pages = [
    { title: 'Users', component: UsersPage }/*,
    { title: 'Repos', component: ReposPage },
    { title: 'Organizations', component: OrganizationsPage }*/
    ];


  }

  openDetail(){
    //this.nav.setRoot(UserDetailsPage, {login: this.username});
    this.nav.push(UserDetailsPage, {login: this.username});
    this.menu.close();/*
    if(navigator.onLine){
      // Vérifier que le profil est chargé

      if(this.user == {}){
        alert("user ? " + JSON.stringify(this.user));
        this.gitUser
          .loadDetails(this.username)
          .then(user => this.user = user);
      } else {
        alert("user ok ");
        this.nav.setRoot(UserDetailsPage, {login: this.username});
        this.menu.close();
      }

    } else {
      this.menu.close();
      let toast = Toast.create({
        message: 'No Internet connection !',
        duration: 2000,
        position: 'bottom'
      });

      this.nav.present(toast);
    }*/
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString("#34495E");
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
