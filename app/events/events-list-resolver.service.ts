import { Injectable } from '@angular/core'
import { Resolve} from '@angular/router'
import { EventService} from './shared/events.service'

@Injectable()
export class EventListResolver implements Resolve<any>{
    constructor(private eventService: EventService){}
    resolve(){
        //In resolve we will do asynchronous calls like ajax calss
        return this.eventService.getEvents().map(events => events)
        //map, which give us access the values passed on to that string and it does the job as subscription and return an observable
        //If we use subscribe in place of map,the value that return would not be the observable.
        //subscribe returns a subscription but not an observable
        // (events => events) is shorthand for (events => {return events})
    }
}