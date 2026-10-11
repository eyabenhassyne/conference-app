import { Component, inject } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  private conferenceService = inject(ConferenceService);

  conferences: Conference[] =
    this.conferenceService.getAll();

  register(conference: Conference, event: Event) {

    event.stopPropagation();

    this.conferenceService.register(conference.id);
  }
}