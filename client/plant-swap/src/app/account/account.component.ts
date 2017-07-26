import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { DataService } from '../data.service';

class Swap {
	id: number;
	user_id: number;
	title: string;
	description: string;
	created_at: string;
	is_open: boolean;
	coswap_id: number;
	image_url: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

	showNewModal: boolean = false;
	newSwap: Swap = new Swap();
	baseUrl = 'http://localhost:9393/';
	swaps: Swap[] = [];

  constructor(private router: Router, private dataService: DataService, private http: Http) {
  	this.newSwap.user_id = window.localStorage.id;
  	this.newSwap.is_open = true;
  	this.getSwaps();
  }

  getSwaps() {
		this.http.get(this.baseUrl + 'swaps?token=' + window.localStorage.token).subscribe(response => {
			for (let swap of response.json().swaps) {
				if (swap.user.id == window.localStorage.id) {
					this.swaps.push(swap)
				}
			}
    }, err => {
      alert("error");
    })
  }

  logout($event) {
  	$event.preventDefault();
  	this.dataService.loggedIn = false;
    this.dataService.loggedInUser = '';
    window.localStorage.clear();
  	this.router.navigate(['/']);
  }

  toggleNewModal() {
  	this.showNewModal = !this.showNewModal;
  }

  postSwap() {
  	// add in posting tags!!!
    this.http.post(this.baseUrl + 'swaps/?token=' + window.localStorage.token, this.newSwap).subscribe(response => {
      // update page with all swaps
    }, err => {
      alert("error");
    })
    this.toggleNewModal()
  }
}
