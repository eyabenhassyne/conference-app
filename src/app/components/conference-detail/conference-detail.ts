import {
  Component,
  inject,
  input,
  OnInit
} from '@angular/core';

import {
  DatePipe
} from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  ConferenceService
} from '../../services/conference';

import {
  Conference
} from '../../models/conference';

@Component({
  selector: 'app-conference-detail',

  imports: [
    DatePipe,
    RouterLink
  ],

  templateUrl: './conference-detail.html',

  styleUrl: './conference-detail.css'
})
export class ConferenceDetail implements OnInit {

  private conferenceService =
    inject(ConferenceService);

  private router =
    inject(Router);

  id = input.required<string>();

  conference?: Conference;


  ngOnInit(): void {

    this.loadConference();

  }


  // ==========================================
  // GET BY ID
  // ==========================================

  loadConference(): void {

    const conferenceId =
      Number(this.id());

    this.conferenceService
      .getById(conferenceId)
      .subscribe({

        next: data => {

          this.conference = data;

        },

        error: error => {

          console.error(
            'Erreur lors du chargement de la conférence',
            error
          );

        }

      });

  }


  // ==========================================
  // REGISTER
  // ==========================================

  register(): void {

    if (!this.conference) {
      return;
    }

    if (
      this.conference.nbParticipants >=
      this.conference.maxParticipants
    ) {
      return;
    }

    const conferenceId =
      Number(this.id());

    this.conferenceService
      .register(conferenceId)
      .subscribe({

        next: () => {

          this.router.navigate([
            '/confirmation',
            conferenceId
          ]);

        },

        error: error => {

          console.error(
            'Erreur lors de inscription',
            error
          );

        }

      });

  }

}