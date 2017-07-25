import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataService } from './data.service';

class User {
	id: number;
	username: string;
	location: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	loggedInState: any = true
	loginRegisterToggle: boolean = false;
	loginModalToggle: boolean = false;
	userDetails: User = new User();
	registerDetails: User = new User();
	loginClass: string = 'active';
	registerClass: string = '';

	constructor(private http: Http, private dataService: DataService) {
		
	}

	showLoginModal() {
		this.loginModalToggle = true;
	}

	login() {
    this.http.post('http://localhost:9393/users/login', this.userDetails).subscribe(response => {
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("username", response.json().username);
      window.localStorage.setItem("token", response.json().token);
      window.localStorage.setItem("id", response.json().id);
      this.dataService.loggedIn = true;
      this.dataService.loggedInUser = response.json().username;
    }, err => {
      alert("error");
    })
    this.loginModalToggle = false;
	}

	register() {
    this.http.post('http://localhost:9393/users/register', this.registerDetails).subscribe(response => {
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("username", response.json().username);
      window.localStorage.setItem("token", response.json().token);
      window.localStorage.setItem("id", response.json().id);
      this.dataService.loggedIn = true;
      this.dataService.loggedInUser = response.json().username;
    }, err => {
      alert("error");
    })
    this.loginModalToggle = false;
	}

	toggleLoginRegister($event) {
		if ($event.currentTarget.className == '') {
			if (this.loginRegisterToggle) {
				this.loginClass = '';
				this.registerClass = 'active';
			} else {
				this.loginClass = 'active';
				this.registerClass = '';
			}
			this.loginRegisterToggle = !this.loginRegisterToggle;
		}
	}

}
