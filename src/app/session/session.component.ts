import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  public display = false;
  public sessionID = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  public joinSession() {
    this.router.navigate(['/create/private-' + this.sessionID]);
  }

}
