import { Component, OnInit, Input, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { State } from '../interfaces/state';
import { StateLine } from '../interfaces/state-line';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit {
  @Input() line!: StateLine;
  segments!: State[];
  public indexLine: number = 1;

  constructor(
    private elRef:ElementRef,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.indexLine = this.globalService.lines.findIndex((line => line.id === this.line.id));
    this.elRef.nativeElement.style.height = this.line.height + 'px'
    this.segments = this.line.states.map((state) => {
      return {
        ...state,
        textColor: state.textColor ?? this.line.textColor,
        textSize: state.textSize ?? this.line.textSize,
      }
    });
  }
}
