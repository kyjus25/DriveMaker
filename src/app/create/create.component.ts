import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Devices} from '../types/devices.type';

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
  public displayModal = false;
  public modalCols = [];
  public deviceNames = [];
  public selectedDevice;
  public selectedDistro;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {

    this.modalCols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' }
    ];
    this.http.get<Devices>('http:/localhost:5000/devices').subscribe(devices => {
      for (let i = 0; i < devices.WholeDisks.length; i++) {
        const temp = {id: null, name: null, size: null};
        temp.id = devices.WholeDisks[i];
        temp.name = devices.VolumesFromDisks[i];
        temp.size = Math.floor(devices.AllDisksAndPartitions[i].Size / 1000000000) + 'GB';
        this.deviceNames.push(temp);
      }
    });

  }

  ngOnInit() {
    this.fadeContainer = document.getElementById('fade-container');
  }

  public ngAfterViewInit() {
    // Fade our package selection information in.
    this.fadeContainer.className = 'visible';
  }

  public file(event) {
    console.log(event.files[0].name);
    if (event.files[0].name.endsWith('.iso')) {
      this.selectedDistro = event.files[0];
      if (event.files[0].name.length >= 20) {
        this.selectedDistro.name = this.selectedDistro.name.substring(0, 8) + '...' + this.selectedDistro.name.substring(-0, -8)
      }
    }
  }

  public selectDeviceModal() {
    this.displayModal = true;
  }

  public createUSB() {
    console.log('Device', this.selectedDevice);
    console.log('Distro', this.selectedDistro);

    const headers = {
      device: this.selectedDevice,
      distro: this.selectedDistro
    };
    this.http.post<Devices>('http:/localhost:5000/create', headers).subscribe(res => {
      console.log(res);
    });
  }

  ngOnDestroy() {
  }
}
