import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import { RouterLink } from '@angular/router';

import {
  ConferenceService
} from '../../services/conference';

@Component({
  selector: 'app-registration-confirmation',

  imports: [
    RouterLink
  ],

  templateUrl: './registration-confirmation.html',

  styleUrl: './registration-confirmation.css'
})
export class RegistrationConfirmation {

  private conferenceService =
    inject(ConferenceService);

  id = input.required<string>();

  conference = computed(() => {

    return this.conferenceService.getById(
      Number(this.id())
    );

  });

}