import {Component, OnInit} from '@angular/core';
import { EventService} from './shared/events.service'
import { ActivatedRoute} from '@angular/router'
import { IEvent } from './shared/event.model'

@Component({
    selector:'events-list',
    // we are routing directly to events-list, so selector not required
    template : `
        <div>
            <h1>Upcoming Angular 2 Events</h1>
            <hr/>
            <div class="row">
                <div *ngFor="let event of events" class="col-md-5">
                    <events-thumbnail [event]="event" ></events-thumbnail>
                </div>
            </div>
        </div>`
})

export class EventsListComponent implements OnInit {
  events: IEvent[]
  
  constructor(private eventService: EventService, private route:ActivatedRoute){
    // we cannot write ajax code in a constructor.Bcz it takes time load
  }

  ngOnInit(){
    // this.eventService.getEvents().subscribe(eventSubject => {this.events = eventSubject})
    //Here we are using resolver to load.
    //Because we use subscribe like above it will load the load asynchronous but h1 tag loads before events data.
    //To wait for events data we have to use resolve and below line of code 
    this.events = this.route.snapshot.data['events']
  }

    
}