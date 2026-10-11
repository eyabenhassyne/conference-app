import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import {
  DatePipe
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  ConferenceService
} from '../../services/conference';

@Component({
  selector: 'app-conference-detail',

  imports: [
    DatePipe,
    RouterLink
  ],

  templateUrl: './conference-detail.html',

  styleUrl: './conference-detail.css'
})
export class ConferenceDetail {

  private conferenceService =
    inject(ConferenceService);

  id = input.required<string>();

  conference = computed(() => {

    const conferenceId = Number(this.id());

    return this.conferenceService.getById(
      conferenceId
    );

  });

}