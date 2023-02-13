import { Injectable, EventEmitter } from '@angular/core';
import dayjs from 'dayjs';
import { of, Subject } from 'rxjs';
import { GanttSelectedEvent } from './interfaces/gantt-selected-event';
import { State } from './interfaces/state';
import { StateLine } from './interfaces/state-line';
import { StateType } from './interfaces/state-type';
import { Tick } from './tick';

@Injectable()
export class GlobalService {
  startDateGantt!: dayjs.Dayjs;
  endDateGantt!: dayjs.Dayjs;
  ganttTimeDuration!: number;
  gantt$ = new Subject();
  zoomEnd$ = new Subject();
  mouseDown$ = new Subject();
  cursorStyle!: any;
  isUserDragging!: boolean;
  zoomHtmlDiv: any[] = [];
  zoomHtmlDivRaw: any;
  mouseDownX!: number;
  mouseDownY!: number;
  ganttStartX!: number;
  timeMouseUpStart!: number;
  timeMouseUpEnd!: number;
  ganttWidth!: string;
  stateTypes!: StateType[];
  zoomHistory: any[] = [];
  timeUntilMouseUp!: number;
  selectedItem!: State;
  stateSelected!: EventEmitter<GanttSelectedEvent>;
  lines!: StateLine[];
  lineHeights!: number[];

  constructor() {}

  setStart(start: dayjs.Dayjs) {
    this.startDateGantt = start;
  }

  setEnd(end: dayjs.Dayjs) {
    this.endDateGantt = end;
  }
  
  setLineHeight(stateLines: StateLine[]) {
   this.lineHeights = stateLines.map(stateLine => stateLine.height || 50);
  }

  ganttDuration() {
    this.ganttTimeDuration = this.endDateGantt.diff(
      this.startDateGantt,
      'milliseconds'
    );
    return of(this.ganttTimeDuration);
  }

  ticks() {
    return new Tick(this.ganttTimeDuration, this.startDateGantt).value();
  }

  onGanttChange() {
    return this.gantt$;
  }

  pushChanges() {
    this.gantt$.next('change');
  }
}
