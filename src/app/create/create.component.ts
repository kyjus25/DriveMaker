import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from 'process';
import {HttpClient} from '@angular/common/http';

import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-canvas',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy, AfterViewInit {

  public sessionId = null;
  public fadeContainer: Element = null;    // Local reference to div for fading-in and out on state transitions.
  private script = null;
  private devices = {};


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.http.get('http:/localhost:5000/devices').subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.fadeContainer = document.getElementById('fade-container');
  }

  public ngAfterViewInit() {
    // Fade our package selection information in.
    this.fadeContainer.className = 'visible';
  }

  ngOnDestroy() {
  }
}
