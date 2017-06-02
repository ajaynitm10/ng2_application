import { NgModule} from "@angular/core"
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
    EventsListComponent,
    EventsThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    UpvoteComponent,
    VoterService,
    LocationValidator,
    DurationPipe
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { jQuery_Token,
         TOASTR_TOKEN, 
         Toastr, 
         CollapsibleWellComponent,
         SimpleModalComponent,
         ModalTriggerDirective
} from './common/index'
import { appRoutes} from './routes'
import { Error404Component} from './errors/404component'
import { AuthService } from './user/auth.service'

declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventsThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        SimpleModalComponent,
        UpvoteComponent,
        ModalTriggerDirective,
        LocationValidator,
        DurationPipe],
    providers: [ 
        EventService,
        {provide: TOASTR_TOKEN, useValue: toastr },
        {provide: jQuery_Token, useValue: jQuery },
        EventRouteActivator,
        //above EventRouteActivator looks like this {provide: EventRouteActivator, useClass: EventRouteActivator}
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        EventListResolver,
        VoterService,
        AuthService],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component: CreateEventComponent){
    if(component.isDirty)
        return window.confirm('Your data is not saved!!')
    return true
}

//useClass, useValue, useExisting, useFactory