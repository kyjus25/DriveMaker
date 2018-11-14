import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import {Process} from 'process';
declare var require: any;

@Component({
  selector: 'app-canvas',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  public sessionId = null;
  private script = null;
  private devices = [];
  private process: Process;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(this.process.env.DEVICES);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
