import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'

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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

	baseUrl = 'http://localhost:9393/';
	swaps: Swap[] = [];

	constructor(private http: Http, private router: Router) {
		this.getSwaps();
	}

	getSwaps() {
		this.http.get(this.baseUrl + 'swaps?token=' + window.localStorage.token).subscribe(response => {
      this.swaps = response.json().swaps
    }, err => {
      alert("error");
    })
  }

  goToDetail(swap) {
		this.router.navigate(['/swaps', swap.swap.id])
  }

}