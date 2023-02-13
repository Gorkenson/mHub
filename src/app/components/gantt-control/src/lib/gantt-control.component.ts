import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import dayjs from 'dayjs';
import { GanttChangeDatesEvent } from './interfaces/gantt-change-dates-event';
import { GanttSelectedEvent } from './interfaces/gantt-selected-event';
import { StateLine } from './interfaces/state-line';
import { StateType } from './interfaces/state-type';
import { GlobalService } from './global.service';

@Component({
  selector: 'msi-gantt-control',
  templateUrl: './gantt-control.component.html',
  styleUrls: ['./gantt-control.component.css'],
})
export class GanttControlComponent implements OnInit {
  ganttStart!: dayjs.Dayjs;
  ganttEnd!: dayjs.Dayjs;
  stateLines!: StateLine[];
  stateLinesCopy!: StateLine[];
  tempStateLines: StateLine[] = [];

  @Input() statesLines: Array<StateLine> = [];
  @Input() statesTypes: Array<StateType> = [];
  @Input() zoom: number = 1;
  @Input() selected: number = 1;

  @Output()
  stateSelected: EventEmitter<GanttSelectedEvent> = new EventEmitter<GanttSelectedEvent>();
  @Output()
  changeDates: EventEmitter<GanttChangeDatesEvent> = new EventEmitter<GanttChangeDatesEvent>();

  constructor(private globalService: GlobalService) {
    this.globalService.stateSelected = this.stateSelected;
  }

  notExceed(e: MouseEvent) {
    return parseInt(this.globalService.ganttWidth) + this.globalService.ganttStartX > e.pageX;
  }

  private setupMouseMove() {
    document.addEventListener('mousemove', (e) => {
      const minDragWidth = 5;
      const samePosition =
        e.pageX - this.globalService.mouseDownX < minDragWidth &&
        e.pageX - this.globalService.mouseDownX > -minDragWidth &&
        e.pageY - this.globalService.mouseDownY < minDragWidth &&
        e.pageY - this.globalService.mouseDownY > -minDragWidth;
      if (this.globalService.isUserDragging && this.notExceed(e) && !samePosition) {
        for (let i = 0; i < this.stateLines.length; i++) {
          this.globalService.cursorStyle[i].style.cursor = 'col-resize';
          this.globalService.zoomHtmlDiv[i].style.width =
            e.pageX - this.globalService.mouseDownX + 'px';
        }
      }
    });

  }

  private setupMouseUp() {
    document.addEventListener('mouseup', (e) => {
      this.globalService.zoomHtmlDiv = [];
      const minDragWidth = 5;
      const samePosition =
        e.pageX - this.globalService.mouseDownX < minDragWidth &&
        e.pageX - this.globalService.mouseDownX > -minDragWidth &&
        e.pageY - this.globalService.mouseDownY < minDragWidth &&
        e.pageY - this.globalService.mouseDownY > -minDragWidth;
      if (this.globalService.isUserDragging && !samePosition) {
        for (let i = 0; i < this.globalService.cursorStyle.length; i++) {
          this.globalService.cursorStyle[i].style.cursor = 'default';
        }

        this.globalService.ganttDuration().subscribe((x) => {
          this.globalService.timeMouseUpEnd =
            ((e.pageX - this.globalService.ganttStartX) * x) /
            parseInt(this.globalService.ganttWidth);
          this.globalService.zoomEnd$.next('');
        });
      }
      this.globalService.isUserDragging = false;
    });
  }

  private zoomEnd() {
    this.globalService.zoomEnd$.subscribe(() => {
      this.tempStateLines = this.stateLines.map((line) => {
        const states = line.states.filter((segment) => {
          const startMouseUp = this.globalService.startDateGantt.add(
            this.globalService.timeMouseUpStart,
            'millisecond'
          );

          const endMouseUp = this.globalService.startDateGantt.add(
            this.globalService.timeMouseUpEnd,
            'millisecond'
          );

          if (dayjs(segment.start).isBefore(startMouseUp)) {
            if (dayjs(segment.end).isBefore(startMouseUp)) {
              return false;
            }
          }
          if (dayjs(segment.start).isAfter(endMouseUp)) {
            return false;
          }
          return true;
        });

        return {
          ...line,
          states,
        }
      });

      this.tempStateLines = this.tempStateLines.map((line) => {
        const states = line.states.map((segment, index: number) => {
          let start, end;

          const startMouseUp = this.globalService.startDateGantt.add(
            this.globalService.timeMouseUpStart,
            'millisecond'
          );

          const endMouseUp = this.globalService.startDateGantt.add(
            this.globalService.timeMouseUpEnd,
            'millisecond'
          );
          if (index === 0) {
            start = startMouseUp.toDate();
          } else {
            start = segment.start;
          }
          if (dayjs(segment.end).isBefore(endMouseUp)) {
            end = segment.end;
          } else {
            end = endMouseUp.toDate();
          }

          return {
            id: segment.id,
            start,
            end,
            idType: segment.idType,
            tooltip: segment.tooltip,
            text: segment.text,
          };
        });

        return {
          ...line,
          states,
        }
      });

      this.globalService.setStart(dayjs(this.tempStateLines[0].states[0].start));
      this.globalService.setEnd(dayjs(this.tempStateLines[0].states[this.tempStateLines[0].states.length - 1].end));
      this.globalService.zoomHistory.push(this.tempStateLines);
      this.stateLines = this.tempStateLines;
      this.changeDates.emit({
        end: this.tempStateLines[0].states[0].start,
        start: this.tempStateLines[0].states[this.tempStateLines[0].states.length - 1].end,
        zoom: 0,
      })
    });
  }

  setup() {
    this.globalService.stateTypes = this.statesTypes;
    this.stateLines = this.statesLines;
    this.globalService.lines = this.stateLines;
    this.ganttStart = dayjs(this.statesLines[0].states[0].start)
    this.ganttEnd = dayjs(this.statesLines[0].states[this.statesLines[0].states.length - 1].end)

    this.stateLinesCopy = this.stateLines;
    this.globalService.zoomHistory.push(this.stateLines);
    this.setupMouseMove();
    this.setupMouseUp();
    this.zoomEnd();
    this.globalService.setLineHeight(this.stateLines)
  }

  ngOnInit() {
    this.setup();
    this.selectState();
    const foo = document.getElementsByClassName('ganttLines')[0];
    const foo1 = window.getComputedStyle(foo, null);
    this.globalService.ganttWidth = foo1.width;
    this.globalService.setStart(this.ganttStart);
    this.globalService.setEnd(this.ganttEnd);
    this.globalService.ganttStartX = foo.getBoundingClientRect().x;

    this.globalService.onGanttChange().subscribe((x) => {
      this.stateLines = this.stateLinesCopy;
      this.globalService.setStart(this.ganttStart);
      this.globalService.setEnd(this.ganttEnd);
    });
  }

  private selectState() {

    const line = this.stateLines.find(lines => {
      return lines.states.find(state => {
        return state.id === this.selected+"";
      })
    });

    const state = line?.states.find(state => {
      return state.id === this.selected+"";
    });

    if(state) {
      this.globalService.selectedItem = state;
      this.globalService.stateSelected.emit({
        idLine: line?.id+"",
        idState: state.id,
      });
    }
  }
}

