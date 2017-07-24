import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	loggedInUser
	loggedIn

	constructor() {
		this.loggedInUser = window.localStorage.username
		this.loggedIn = window.localStorage.loggedIn
	}

}
