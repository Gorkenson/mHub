import { NgModule } from '@angular/core';
import { ControlsComponent } from './controls/controls.component';
import { GanttControlComponent } from './gantt-control.component';
import { LineComponent } from './line/line.component';
import { TickComponent } from './line/tick/tick.component';
import { LinesComponent } from './lines/lines.component';
import { SegmentComponent } from './segment/segment.component';
import { SegmentsComponent } from './segments/segments.component';
import { GlobalService } from './global.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [MatButtonModule, MatIconModule, BrowserModule],
  declarations: [
    GanttControlComponent,
    SegmentsComponent,
    LinesComponent,
    LineComponent,
    SegmentComponent,
    ControlsComponent,
    TickComponent,
  ],
  providers: [GlobalService],
  exports: [GanttControlComponent]
})
export class GanttControlModule {}

