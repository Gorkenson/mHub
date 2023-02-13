import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {
  constructor(private tbs: GlobalService) {}

  ngOnInit() {}

  goBack() {
    this.tbs.pushChanges();
  }
}
