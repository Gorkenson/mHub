import { Component, Input, OnInit } from '@angular/core';
import { StateLine } from '../gantt-control/src/lib/interfaces/state-line';
import { StateType } from '../gantt-control/src/lib/interfaces/state-type';

@Component({
  selector: 'gantt-info',
  templateUrl: './gantt-info.component.html',
  styleUrls: ['./gantt-info.component.scss']
})
export class GanttInfoComponent implements OnInit {
  //gantt component data
  types: StateType[] = [
    {id:0, name:"steel uno", color:"royalblue"},
    {id:1, name:"steel dos", color:"green"},
    {id:2, name:"steel tres", color:"red"},
    {id:3, name:"steel cuatro", color:"orange"}
  ];

  linesFinal: StateLine[] = [
    {
      id:"uno", texto: "Status", height : 50,
      states : [
        {id:"steel uno", start:  new Date('2022-10-03 00:00:00'),  end: new Date('2022-10-04 03:30:00'), idType:1, tooltip:"Colada: 155155", text: ""},
        {id:"seq. dos", start:   new Date('2022-10-04 03:30:00'),  end: new Date('2022-10-04 10:30:00'), idType:1, tooltip:"Colada: 350470", text: ""},
        {id:"seq. tres", start:  new Date('2022-10-04 10:30:00'),  end: new Date('2022-10-04 12:15:00'), idType:3, tooltip:"Colada: 155155", text: ""},
        {id:"seq. cuatro", start: new Date('2022-10-04 12:15:00'), end: new Date('2022-10-04 20:15:00'), idType:2, tooltip:"Colada: 350470", text: ""},
        {id:"seq. cinco", start: new Date('2022-10-04 12:15:00'),  end: new Date('2022-10-04 20:15:00'), idType:1, tooltip:"Colada: 350470", text: ""}
    ]},
    {
      id:"dos", texto: "Order", height : 50,
      states : [
        {id:"steel uno", start:  new Date('2022-10-03 00:00:00'),  end: new Date('2022-10-04 03:30:00'), idType:0, tooltip:"Colada: 155155", text: "ORDER: XX - REF: B12"},
        {id:"seq. dos", start:   new Date('2022-10-04 03:30:00'),  end: new Date('2022-10-04 10:30:00'), idType:1, tooltip:"Colada: 350470", text: "ORDER: XX - REF: B12"},
        {id:"seq. tres", start:  new Date('2022-10-04 10:30:00'),  end: new Date('2022-10-04 12:15:00'), idType:0, tooltip:"Colada: 155155", text: "ORDER: XX - REF: B12"},
        {id:"seq. cuatro", start: new Date('2022-10-04 12:15:00'), end: new Date('2022-10-04 20:15:00'), idType:2, tooltip:"Colada: 350470", text: "ORDER: XX - REF: B12"},
        {id:"seq. cinco", start: new Date('2022-10-04 12:15:00'),  end: new Date('2022-10-04 20:15:00'), idType:3, tooltip:"Colada: 350470", text: "ORDER: XX - REF: B12"}
    ]},
    {
      id:"tres", texto: "Products", height : 50,
      states : [
        {id:"steel uno", start:  new Date('2022-10-03 00:00:00'),  end: new Date('2022-10-04 03:30:00'), idType:0, tooltip:"Colada: 155155", text: ""},
        {id:"seq. dos", start:   new Date('2022-10-04 03:30:00'),  end: new Date('2022-10-04 10:30:00'), idType:1, tooltip:"Colada: 350470", text: ""},
        {id:"seq. tres", start:  new Date('2022-10-04 10:30:00'),  end: new Date('2022-10-04 12:15:00'), idType:0, tooltip:"Colada: 155155", text: ""},
        {id:"seq. cuatro", start: new Date('2022-10-04 12:15:00'), end: new Date('2022-10-04 20:15:00'), idType:2, tooltip:"Colada: 350470", text: ""},
        {id:"seq. cinco", start: new Date('2022-10-04 12:15:00'),  end: new Date('2022-10-04 20:15:00'), idType:3, tooltip:"Colada: 350470", text: ""}
    ]}
  ];

  @Input() statesTypes: StateType[] = [];
  @Input() statesLines: StateLine[] = [];

  startDate: string = "Start: ---";
  endDate: string = "End: ---";
  orderNumber: string="";

  constructor() { }

  ngOnInit(): void {
  }

  test(event: any) {
    console.log('calling!!', event)
    this.orderNumber = event['idState'];
  }

  testDates(event: any) {
    console.log('calling dates!!', event);
    this.startDate = 'Start:'+event['start'];
    this.endDate = 'End:'+event['end'];
  }
}
