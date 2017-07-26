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

class Tag {
	id: number;
	swap_id: number;
	name: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

	showNewModal: boolean = false;
	showDeleteModal: boolean = false;
	newSwap: Swap = new Swap();
	baseUrl = 'http://localhost:9393/';
	swaps: Swap[] = [];
	newTags: Tag[] = [];
	newTagString: string = '';

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

  goToDetail(swap) {
		this.router.navigate(['/swaps', swap.swap.id])
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

  toggleDeleteModal() {
  	this.showDeleteModal = !this.showDeleteModal;
  }

  postSwap() {
  	this.newTags = [];
  	let newTagsArray = this.newTagString.split(',');
  	for (let tag of newTagsArray) {
  		let newTag = new Tag();
  		newTag.name = tag.trim()
  		this.newTags.push(newTag);
  	}
  	let postObject = {swap: this.newSwap, tags: this.newTags};
    this.http.post(this.baseUrl + 'swaps/?token=' + window.localStorage.token, postObject).subscribe(response => {
    	this.swaps = [];
			this.newTags = [];
			this.newTagString = '';
			this.newSwap = new Swap();
      for (let swap of response.json().swaps) {
				if (swap.user.id == window.localStorage.id) {
					this.swaps.push(swap)
				}
			}
    }, err => {
      alert("error");
    })
    this.toggleNewModal()
  }
}
