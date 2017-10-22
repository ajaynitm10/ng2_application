import {Component} from '@angular/core';
import { AuthService } from '../user/auth.service'
import { ISession, EventService } from '../events/shared/index'

@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav/navbar.component.html',
    styles: [`
        .nav.navbar-nav {font-sixe : 15px}
        #searchForm { margin-left : 100px}
        @media (max-width:1200px) { #searchForm {display:none}}
        li > a.active { color: #F97924;}
    `]
})
export class NavBarComponent {
    searchTerm: string = "";
    foundSessions: ISession[];
    constructor(private auth: AuthService, private eventService: EventService){

    }

    searchSessions(searchTerm) {
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions;
            console.log(this.foundSessions);
        })
    }
}