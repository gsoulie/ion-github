import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserDetailsPage} from '../user-details/user-details';


// Import GithubUsers provider
import {GithubUsers} from '../../providers/github-users/github-users';

import {User} from '../../models/user';

@Component({
  templateUrl: 'build/pages/users/users.html',
  providers: [GithubUsers]
})
export class UsersPage {
  // Declare users as an array of User model
  users: User[];
  githubUsers: GithubUsers;

  constructor(private nav: NavController, githubUsers: GithubUsers) {
    this.githubUsers = githubUsers;

    this.githubUsers
      .load()
      .then(users => this.users = users);
  }

  doRefresh(refresher){
    this.githubUsers
      .load()
      .then(users => this.users = users);
      setTimeout(() => { refresher.complete(); console.log('Async operation has ended'); }, 2000);
  }

  // Navigate to user details page with the login as a parameter
  goToDetails(event, login) {
  //  if(navigator.onLine){
      this.nav.push(UserDetailsPage, {
        login: login
      });
  //  }
  }

  search(ev: any) {
    // set searchText to the value of the searchbar
    var searchText = ev.target.value;

    // Avoid research if searchtext is empty
    if (!searchText || searchText.trim() === '') {
      this.githubUsers
        .load()
        .then(users => this.users = users);
    }

    this.githubUsers.searchUsers(searchText)
      .then(users => this.users = users)

  }

}
