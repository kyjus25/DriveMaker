import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public display = false;
  public sessionID = null;
  public fadeContainer: Element = null;    // Local reference to div for fading-in and out on state transitions.

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fadeContainer = document.getElementById('fade-container');
  }

  public createUSB() {
    // Set up our fade out transition.
    this.fadeContainer.className = 'hidden';

    // Route to the next form in our sequence.
    setTimeout(() => {
      this.router.navigate(['/create']).then();
    }, 300);
  }

}
