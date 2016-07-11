import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {ReposPage} from '../repos/repos';
import {GithubUsers} from '../../providers/github-users/github-users';
import {User} from '../../models/user';

@Component({
  templateUrl: 'build/pages/user-details/user-details.html',
  providers: [GithubUsers]
})
export class UserDetailsPage {

  login: string;
  user: User;
  repos: any;

  constructor(private nav: NavController, navParams: NavParams, githubUsers: GithubUsers) {
    this.login = navParams.get('login');
    this.user = new User();

    githubUsers
      .loadDetails(this.login)
      .then(user => {
        this.user = user;

        // récupération de la liste des repos de l'utilisateur
        githubUsers
          .getUserRepos(this.user.repos_url)
          .then(repos => {
            this.repos = repos;
            /*for(var i in this.repos){
                console.log("repos url = " + this.repos[i].html_url+"?files=1");
            }*/

          });

      });


  }

  openRepo(url: string, name: string){
    /*this.nav.push(ReposPage, {
      url: url+"?files=1",
      name: name
    });*/
    window.open(url+"?files=1");
  }

  goToRepo(url: string){
    console.log("go to repo " + url);
    window.open(this.user.html_url);
  }

  close(ev: any){
    console.log("close");
    this.nav.pop();
    //this.nav.setRoot(UsersPage);
  }

}
