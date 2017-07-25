import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private router: Router, private dataService: DataService) { }

  logout($event) {
  	$event.preventDefault();
  	this.dataService.loggedIn = false;
    this.dataService.loggedInUser = '';
    window.localStorage.clear();
  	this.router.navigate(['/']);
  }



}
