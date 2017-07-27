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

class Tag {
	id: number;
	swap_id: number;
	name: string;
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
	editTagString: string = "";
	editTags: Tag[] = [];
	thisUser: User = new User();
	tags: Tag[] = [];
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
			for (let comment of response.json().comments) {
  			comment.comment.created_at = this.formatDate(comment.comment.created_at)
  			this.comments.push(comment);
  		}
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
  		this.comments = [];
  		for (let comment of response.json()) {
  			comment.comment.created_at = this.formatDate(comment.comment.created_at)
  			this.comments.push(comment);
  		}
      this.newComment.message = "";
      this.addCommentToggle = false;
    }, err => {
    	alert("error");
    })
  }

  toggleEditModal() {
  	this.editSwap = Object.assign({}, this.swap);
  	let editTagsArray = []
  	for (let tag of this.tags) {
  		editTagsArray.push(tag.name)
  	};
  	this.editTagString = editTagsArray.join(', ');
  	this.showEditModal = !this.showEditModal;
  }

  patchSwap() {
  	this.editTags = [];
  	let editTagsArray = this.editTagString.split(',');
  	for (let tag of editTagsArray) {
  		let editTag = new Tag();
  		editTag.name = tag.trim()
  		this.editTags.push(editTag);
  	}
  	let patchObject = {swap: this.editSwap, tags: this.editTags};
    this.http.patch('http://localhost:9393/swaps/' + this.id + "?token=" + window.localStorage.token, patchObject).subscribe(response => {
      this.swap = response.json().swap;
      this.tags = [];
      for (let tag of response.json().tags) {
      	this.tags.push(tag);
      }
      this.editTags = [];
    }, err => {
      alert("error");
    })
    this.showEditModal = false;
  }

  formatDate(dbDate) {
  	let t = dbDate.split(/[-TZ:]/);
		let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
		return(d.toLocaleString());
  }

  swapOutImage($event) {
  	// change out broken images with a placeholder
  	$event.target.src = "http://eduevents.in/images/image_not_available.jpg"
  }

}
