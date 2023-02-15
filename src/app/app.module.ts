import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GanttControlModule } from './components/gantt-control/src/lib/gantt-control.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GanttInfoComponent } from './components/gantt-info/gantt-info.component';
import { MatCardModule } from '@angular/material/card';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    GanttInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    GanttControlModule,
    BrowserAnimationsModule,
    MatCardModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
