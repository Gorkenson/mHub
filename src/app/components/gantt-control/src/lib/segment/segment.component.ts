import { Component, ElementRef, Input, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { State } from '../interfaces/state';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css'],
})
export class SegmentComponent implements OnInit {
  startDate: any;
  endDate: any;
  background: any;
  mystyle: any;
  text = 'text';
  tooltip = 'tooltip';
  left!: string;
  top!: string;
  info!: string;
  color: any;
  cursor!: any;
  drag = false;
  defaultTextColor: string = 'white';
  defaultTextSize: string = '';
  @Input() public segment!: State;

  constructor(private el: ElementRef, public globalService: GlobalService) {}

  ngOnInit() {
    this.cursor = document.getElementsByClassName('flexLineClass');
    for (let i = 0; i < this.cursor.length; i++) {
      this.cursor[i].style.cursor = 'pointer';
    }
    this.globalService.cursorStyle = this.cursor;
    this.globalService.ganttDuration().subscribe((time) => {
      const stateType = this.globalService.stateTypes[this.segment.idType];
      this.el.nativeElement.style.background = stateType.color;
      const timeBetween2 = dayjs(this.segment.end).diff(
        this.segment.start,
        'milliseconds'
      );
      this.text = this.segment.text;
      this.tooltip = this.segment.tooltip;
      this.color = stateType.color;
      this.info = dayjs(this.segment.start).hour() + '/' + dayjs(this.segment.end).hour();
      const width = (timeBetween2 * 100) / time;
      this.el.nativeElement.style.width = width + '%';
    });
  }

  mouseMove(e: any) {
    this.left = e.layerX + 'px';
    this.top = e.layerY + 'px';
  }

  select(segment: State) {
    this.globalService.selectedItem = segment;
    const selectedLine = this.globalService.lines.find(line => {
      return !!line.states.find(state => {
        return state.id === segment.id;
      });
    });

    if(!selectedLine) {
      throw new Error('Was not able to find line for state ' + segment.id);
    }

    this.globalService.stateSelected.emit({
      idLine: selectedLine.id+"",
      idState: segment.id,
    });
  }
  hiddenData() {
    return parseInt(this.el.nativeElement.style.width) < 8;
  }
}
