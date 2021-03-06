import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})

export class SessionListComponent {
    @Input() sessions: ISession[];
    @Input() filterByInput: string;
    @Input() sortByInput: string;
    visibleSessions: ISession[];

    constructor(private auth: AuthService, private voterService: VoterService){

    }

    ngOnChanges(){
        if(this.sessions){
            this.filterSessions(this.filterByInput);
            this.sortByInput === 'name' ? this.visibleSessions.sort(sortByNameAsc): this.visibleSessions.sort(sortByVotesDesc)
        }
    }

    toggleVote(session: ISession){
        if(this.userHasVoted(session)){
            this.voterService.deleteVoter(session, this.auth.currentUser.userName);
        } else {
            this.voterService.addVoter(session, this.auth.currentUser.userName)
        }
        if(this.sortByInput === 'votes'){
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession){
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
    }

    filterSessions(filter){
        if(filter === 'all'){
            this.visibleSessions = this.sessions.slice(0)
        }
        else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            })
        }
    }

    
}

function sortByNameAsc(s1:ISession, s2:ISession) {
    if(s1.name > s2.name) return 1
    else if(s1.name === s2.name) return 0
    else return -1
}

function sortByVotesDesc(s1: ISession, s2:ISession){
    return s2.voters.length - s1.voters.length
}