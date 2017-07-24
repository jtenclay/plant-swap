import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	loggedInUser;
	loggedIn;
	loginModalToggle: boolean = false;
	userDetails = {username: "", password: ""};

	constructor(private http: Http) {
		this.refreshFromLocalStorage();
	}

	refreshFromLocalStorage() {
		this.loggedInUser = window.localStorage.username
		this.loggedIn = window.localStorage.loggedIn
	}

	showLoginModal() {
		this.loginModalToggle = true;
	}

	login() {
    this.http.post('http://localhost:9393/users/login', this.userDetails).subscribe(response => {
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("username", response.json().username);
      window.localStorage.setItem("token", response.json().token);
      this.refreshFromLocalStorage();
    }, err => {
      alert("error");
    })
    this.loginModalToggle = false;
	}

}
