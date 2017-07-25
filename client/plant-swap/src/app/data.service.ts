import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

	loggedIn: boolean;
	loggedInUser: string;
	loggedInId: number;

  constructor() {
  	this.loggedInUser = window.localStorage.username
		this.loggedIn = window.localStorage.loggedIn
		this.loggedInId = window.localStorage.id
  }

}
