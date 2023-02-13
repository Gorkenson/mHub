import { Component, Input, OnInit } from '@angular/core';
import { StateLine } from '../interfaces/state-line';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css'],
})
export class LinesComponent implements OnInit {
  @Input() lines!: StateLine[];
  numclick = 0;
  constructor(private globalService: GlobalService) { }

  ngOnInit() { }

  mouseDown(e: any) {
    this.globalService.timeUntilMouseUp = Date.now();
    const line = document.getElementsByTagName('app-line')[0];
    this.globalService.isUserDragging = true;
    let topPosition = 0;
    for (let i = 0; i < this.lines.length; i++) {
      let div = document.createElement('div');
      div.style.height = this.globalService.lineHeights[i] + 'px';//'50px';
      div.style.backgroundColor = '#c6c75b';
      div.style.position = 'absolute';
      div.style.zIndex = '50';
      div.style.opacity = '0.7';
      div.style.left = e.layerX + 'px';
      div.style.top = topPosition + 'px';
      topPosition += this.globalService.lineHeights[i] + 70
      line.appendChild(div);
      this.globalService.zoomHtmlDiv.push(div);
    }

    this.globalService.mouseDownX = e.pageX;
    this.globalService.mouseDownY = e.pageY;

    this.globalService.ganttDuration().subscribe((x) => {
      this.globalService.timeMouseUpStart =
        ((e.pageX - this.globalService.ganttStartX) * x) /
        parseInt(this.globalService.ganttWidth);
    });
  }
  mouseDblClick(){
    this.globalService.pushChanges();
  }
}
