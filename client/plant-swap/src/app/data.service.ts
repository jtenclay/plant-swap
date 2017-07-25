import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

	loggedIn: boolean;
	loggedInUser: string;

  constructor() {
  	this.loggedInUser = window.localStorage.username
		this.loggedIn = window.localStorage.loggedIn
  }

}
