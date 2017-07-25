import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
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

class User {
	id: number;
	username: string;
	location: string;
}

class Comment {
	id: number;
	swap_id: number;
	message: string;
	user_id: number;
	private: boolean;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

	loggedIn: boolean;
	swap: Swap = new Swap();
	editSwap: Swap = new Swap();
	thisUser: User = new User();
	tags = [];
	comments: Comment[] = [];
	addCommentToggle: boolean = false;
	newComment: Comment = new Comment();
	showEditModal: boolean = false;
	id: number;

  constructor(private route: ActivatedRoute, private http: Http, private dataService: DataService) {
  	this.id = this.route.snapshot.params.id;
  	this.getSwap(this.id);
  	this.loggedIn = window.localStorage.loggedIn
  }

  getSwap(id) {
  	this.http.get('http://localhost:9393/swaps/' + id + "?token=" + window.localStorage.token).subscribe(response => {
			this.swap = response.json().swap;
			this.thisUser = response.json().user;
			this.tags = response.json().tags;
			this.comments = response.json().comments;
	  }, err => {
			alert("error");
    })
  }

  showAddComment() {
  	this.addCommentToggle = true;
  }

  postComment() {
  	this.newComment.user_id = parseInt(window.localStorage.id);
  	this.newComment.swap_id = this.id;
  	this.http.post('http://localhost:9393/comments?token=' + window.localStorage.token, this.newComment).subscribe(response => {
      this.comments = response.json();
      this.newComment.message = "";
      this.addCommentToggle = false;
    }, err => {
    	alert("error");
    })
  }

  toggleEditModal() {
  	this.editSwap = Object.assign({}, this.swap);
  	this.showEditModal = !this.showEditModal;
  }

  patchSwap() {
    this.http.patch('http://localhost:9393/swaps/' + this.id + "?token=" + window.localStorage.token, this.editSwap).subscribe(response => {
      this.swap = response.json();
    }, err => {
      alert("error");
    })
    this.showEditModal = false;
  }

}
