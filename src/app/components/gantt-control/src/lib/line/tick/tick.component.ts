import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-tick',
  templateUrl: './tick.component.html',
  styleUrls: ['./tick.component.css'],
})
export class TickComponent implements OnInit {
  public left!: string;
  public time!: string;
  public height!: string;
  public top!: string;
  @Input() index: any;
  @Input() indexLine!: number;

  constructor(private globlaService: GlobalService, private el: ElementRef) {}

  ngOnInit() {
    if(this.globlaService.lineHeights[this.indexLine]) {
      this.height = this.globlaService.lineHeights[this.indexLine] + 'px'
      this.top = -(this.globlaService.lineHeights[this.indexLine]) + 'px'
    }
    
    this.globlaService.ganttDuration().subscribe((x) => {});
    try {
      const tick = this.globlaService.ticks()[this.index];
      this.el.nativeElement.style.left =
        (parseFloat(tick.left) * this.index).toFixed(2) + '%';
      this.time = tick.start;
    } catch (error) {
      this.globlaService.pushChanges();
    }
  }
}
