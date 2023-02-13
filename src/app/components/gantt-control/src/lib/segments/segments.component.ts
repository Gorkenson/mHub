import { Component, Input, OnInit } from '@angular/core';
import { State } from '../interfaces/state';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.css'],
})
export class SegmentsComponent implements OnInit {
  @Input() segments!: State[];

  constructor() {}

  ngOnInit() {}
}
