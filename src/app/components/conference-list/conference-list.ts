import { Component, inject } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { ConferenceService } from '../../services/conference';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-conference-list',

  imports: [
    DatePipe,
    UpperCasePipe,
    RouterLink
  ],

  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css'
})
export class ConferenceList {

  private conferenceService =
    inject(ConferenceService);

  private router =
    inject(Router);

  conferences: Conference[] =
    this.conferenceService.getAll();

  register(
    conference: Conference,
    event: Event
  ): void {

    event.stopPropagation();

    if (
      conference.nbParticipants <
      conference.maxParticipants
    ) {

      this.conferenceService.register(
        conference.id
      );

      this.router.navigate([
        '/confirmation',
        conference.id
      ]);
    }
  }
}