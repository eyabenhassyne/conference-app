import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  DatePipe,
  UpperCasePipe
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
  selector: 'app-conference-list',

  imports: [
    DatePipe,
    UpperCasePipe,
    RouterLink
  ],

  templateUrl: './conference-list.html',

  styleUrl: './conference-list.css'
})
export class ConferenceList implements OnInit {

  private conferenceService =
    inject(ConferenceService);

  private router =
    inject(Router);


  // ==========================================
  // SIGNAL : liste des conférences
  // ==========================================

  conferences =
    signal<Conference[]>([]);


  ngOnInit(): void {

    this.loadConferences();

  }


  // ==========================================
  // GET ALL
  // ==========================================

  loadConferences(): void {

    this.conferenceService
      .getAll()
      .subscribe({

        next: data => {

          this.conferences.set(data);

        },

        error: error => {

          console.error(
            'Erreur lors du chargement des conférences',
            error
          );

        }

      });

  }


  // ==========================================
  // REGISTER / PATCH
  // ==========================================

  register(
    conference: Conference,
    event: Event
  ): void {

    event.stopPropagation();

    if (
      conference.nbParticipants <
      conference.maxParticipants
    ) {

      this.conferenceService
        .register(conference.id)
        .subscribe({

          next: () => {

            this.router.navigate([
              '/confirmation',
              conference.id
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


  // ==========================================
  // DELETE
  // ==========================================

  deleteConference(
    conference: Conference,
    event: Event
  ): void {

    event.stopPropagation();

    this.conferenceService
      .delete(conference.id)
      .subscribe({

        next: () => {

          console.log(
            'Conférence supprimée'
          );

          this.loadConferences();

        },

        error: error => {

          console.error(
            'Erreur lors de la suppression',
            error
          );

        }

      });

  }

}