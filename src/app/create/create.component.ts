import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  public sessionId = null;
  private script = null;
  private devices = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public setDevices(device) {
    this.devices.push(device);
  }

}
