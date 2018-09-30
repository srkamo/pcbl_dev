import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router) {
    //router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
    router.events.subscribe(_ => { //this is wrong on the tutorial got it off of youtube comments for the video
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    });﻿
  }


  ngOnInit() {
  }

}
