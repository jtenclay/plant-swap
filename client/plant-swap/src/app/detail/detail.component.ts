import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

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

class User {
	id: number;
	username: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

	swap: Swap;
	thisUser: User;

  constructor(private route: ActivatedRoute, private http: Http) {
  	let id = this.route.snapshot.params.id;
  	this.getSwap(id);
  }

  getSwap(id) {
  	this.http.get('http://localhost:9393/swaps/' + id + "?token=" + window.localStorage.token).subscribe(response => {
			this.swap = response.json().swap;
			this.thisUser = response.json().user;
	  }, err => {
			alert("error");
    })
  }
}
