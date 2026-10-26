import {
  Component,
  inject,
  input,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  ConferenceService
} from '../../services/conference';

import {
  Conference
} from '../../models/conference';

@Component({
  selector: 'app-conference-edit',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './conference-edit.html',

  styleUrl: './conference-edit.css'
})
export class ConferenceEdit implements OnInit {

  private conferenceService =
    inject(ConferenceService);

  private router =
    inject(Router);

  id =
    input.required<string>();


  conferenceForm = new FormGroup({

    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),

    category: new FormControl('', [
      Validators.required
    ]),

    place: new FormControl('', [
      Validators.required
    ]),

    date: new FormControl('', [
      Validators.required
    ]),

    maxParticipants: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ]),

    nbParticipants: new FormControl(0, [
      Validators.required,
      Validators.min(0)
    ])

  });


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

        next: conference => {

          this.conferenceForm.patchValue({

            title:
              conference.title,

            description:
              conference.description,

            category:
              conference.category,

            place:
              conference.place,

            date:
              conference.date,

            maxParticipants:
              conference.maxParticipants,

            nbParticipants:
              conference.nbParticipants

          });

        },

        error: error => {

          console.error(
            'Erreur chargement conférence',
            error
          );

        }

      });

  }


  // ==========================================
  // PUT
  // ==========================================

  updateConference(): void {

    if (
      this.conferenceForm.invalid
    ) {

      this.conferenceForm
        .markAllAsTouched();

      return;

    }

    const formData =
      this.conferenceForm.getRawValue();


    const updatedConference: Conference = {

      id:
        Number(this.id()),

      title:
        formData.title ?? '',

      description:
        formData.description ?? '',

      category:
        formData.category ?? '',

      place:
        formData.place ?? '',

      date:
        formData.date ?? '',

      maxParticipants:
        formData.maxParticipants ?? 1,

      nbParticipants:
        formData.nbParticipants ?? 0

    };


    this.conferenceService
      .update(
        Number(this.id()),
        updatedConference
      )
      .subscribe({

        next: () => {

          console.log(
            'Conférence modifiée avec succès'
          );

          this.router.navigate([
            '/conference',
            this.id()
          ]);

        },

        error: error => {

          console.error(
            'Erreur modification conférence',
            error
          );

        }

      });

  }


  cancel(): void {

    this.router.navigate([
      '/conference',
      this.id()
    ]);

  }

}