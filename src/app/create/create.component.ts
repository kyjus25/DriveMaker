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
  public cities1 = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.http.get('http:/localhost:5000/devices').subscribe(res => {
      console.log(res);
      this.devices = res;
    });

    this.cities1 = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];
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
