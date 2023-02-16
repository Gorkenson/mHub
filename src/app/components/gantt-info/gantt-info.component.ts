import { Component, Input, OnInit, Output } from '@angular/core';
import { StateLine } from '../gantt-control/src/lib/interfaces/state-line';
import { StateType } from '../gantt-control/src/lib/interfaces/state-type';

interface TimeRange {
  id: number;
  viewValue: string;
}
const START_DATE = 0;
const END_DATE = 0;
enum timeRangeTypes {
  Last_15Min = 0,
  Last_1H,
  Last_4H,
  Last_8H,
  Last_24h,
  Last_Morning,
  Last_Evening,
  Last_Night
}
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
    {id:2, name:"steel tres", color:"rgb(255,0,0)"},
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

  startDateText: string = "Start: ---";
  endDateText: string = "End: ---";
  orderNumber: string="";

  @Output() selectedDateRange = [new Date(),new Date()];

  timeRangeList: TimeRange[] = [
    {id: 0, viewValue: '15 min.'},
    {id: 1, viewValue: '1h'},
    {id: 2, viewValue: '4h'},
    {id: 3, viewValue: '8h'},
    {id: 4, viewValue: '24h'},
    {id: 5, viewValue: 'Turno Mañana'},
    {id: 6, viewValue: 'Turno Tarde'},
    {id: 7, viewValue: 'Turno Noche'}
  ];

  selectedTimeRange: TimeRange = {id: 0, viewValue: '15 min.'};

  constructor() { }

  ngOnInit(): void {

  }

  test(event: any) {
    console.log('calling!!', event)
    this.orderNumber = event['idState'];
  }

  testDates(event: any) {
    console.log('calling dates!!', event);
    this.startDateText = 'Start:'+event['start'];
    this.endDateText = 'End:'+event['end'];
  }

  selectTimeRange(event: any){
    this.setDateRange(event);
  }
  setDateRange(id: number){
    this.selectedDateRange = [new Date(),new Date()];
    switch(id){
      case timeRangeTypes.Last_15Min:{
        this.selectedDateRange[END_DATE] = new Date();
        this.selectedDateRange[START_DATE] = new Date(this.selectedDateRange[END_DATE]);
        this.selectedDateRange[START_DATE].setMinutes(this.selectedDateRange[END_DATE].getMinutes() - 15);
        break;
      };
      case timeRangeTypes.Last_1H:{
        this.selectedDateRange[END_DATE] = new Date();
        this.selectedDateRange[START_DATE] = new Date(this.selectedDateRange[END_DATE]);
        this.selectedDateRange[START_DATE].setHours(this.selectedDateRange[END_DATE].getHours() - 1);
        break;
      };
      case timeRangeTypes.Last_4H:{
        this.selectedDateRange[END_DATE] = new Date();
        this.selectedDateRange[START_DATE] = new Date(this.selectedDateRange[END_DATE]);
        this.selectedDateRange[START_DATE].setHours(this.selectedDateRange[END_DATE].getHours() - 4);
        break;
      };
      case timeRangeTypes.Last_8H:{
        this.selectedDateRange[END_DATE] = new Date();
        this.selectedDateRange[START_DATE] = new Date(this.selectedDateRange[END_DATE]);
        this.selectedDateRange[START_DATE].setHours(this.selectedDateRange[END_DATE].getHours() - 8);
        break;
      };
      case timeRangeTypes.Last_24h:{
        this.selectedDateRange[END_DATE] = new Date();
        this.selectedDateRange[START_DATE] = new Date(this.selectedDateRange[END_DATE]);
        this.selectedDateRange[START_DATE].setHours(this.selectedDateRange[END_DATE].getHours() - 24);
        break;
      };
      case timeRangeTypes.Last_Morning:{
        break;
      };
      case timeRangeTypes.Last_Evening:{
        break;
      };
      case timeRangeTypes.Last_Night:{
        break;
      };
    }
    this.startDateText = 'Start: '+this.selectedDateRange[START_DATE].toLocaleDateString();
    this.endDateText = 'End: '+this.selectedDateRange[END_DATE].toLocaleDateString();
  }
}
