import { Component} from '@angular/core'
import { EventService} from '../shared/events.service'
import { ActivatedRoute, Params } from '@angular/router'
import { IEvent, ISession } from '../shared/index'

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles:[`
        .container {padding-left:20px;padding-right:20px;}
        .event-image { height:200px; }
        a {cursor: pointer}
    `]
})
export class EventDetailsComponent {
    event: IEvent
    addMode: boolean
    filterBy: string = 'all'
    sortBy: string = 'votes'
    
    constructor(private eventService: EventService, private route: ActivatedRoute){
    // we cannot write ajax code in a constructor.Bcz it takes time load
    }

    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            this.event = this.eventService.getEvent(+params['id'])
            this.addMode = false
        })
       //if we do not add + at the start it takes as string
    }

    addSession(){
        this.addMode = true
    }

    saveNewSessionOutput(session: ISession){
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }

    cancelAddSessionOutput(){
        this.addMode = false
    }
}