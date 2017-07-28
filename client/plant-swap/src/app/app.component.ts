import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataService } from './data.service';
import { Router } from '@angular/router';

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
	loginRegisterToggle: boolean = true;
	loginModalToggle: boolean = false;
	userDetails: User = new User();
	registerDetails: User = new User();
	loginClass: string = 'active';
	registerClass: string = '';

	constructor(private http: Http, private dataService: DataService, private router: Router) {
		
	}

	showLoginModal($event) {
		$event.preventDefault()
		this.loginModalToggle = true;
	}

	hideLoginModal() {
		this.loginModalToggle = false;
	}

	loginOrRegister(loginOrRegister) {
		let postObject = new User();
		if (loginOrRegister == 'login') {
			postObject = this.userDetails;
		} else {
			postObject = this.registerDetails;
		};
		console.log(postObject);
		this.http.post('http://localhost:9393/users/' + loginOrRegister, postObject).subscribe(response => {
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("username", response.json().username);
      window.localStorage.setItem("token", response.json().token);
      window.localStorage.setItem("id", response.json().id);
      this.dataService.loggedIn = true;
      this.dataService.loggedInUser = response.json().username;
      this.dataService.loggedInId = response.json().id;
      this.registerDetails = new User();
      this.userDetails = new User();
      // redirect user away from homepage, but if they're already on a list or detail page let them stay there
      if (!window.location.href.match(/swaps/)) {
      	this.router.navigate(['/swaps'])
      }
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
