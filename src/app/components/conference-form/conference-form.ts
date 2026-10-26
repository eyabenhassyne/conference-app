import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {
  toSignal
} from '@angular/core/rxjs-interop';

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
  selector: 'app-conference-form',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './conference-form.html',

  styleUrl: './conference-form.css'
})
export class ConferenceForm {

  private conferenceService =
    inject(ConferenceService);

  private router =
    inject(Router);


  conferenceForm = new FormGroup(
    {

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

    },

    {
      validators: [
        this.participantsValidator
      ]
    }
  );


  formValue = toSignal(
    this.conferenceForm.valueChanges,
    {
      initialValue:
        this.conferenceForm.getRawValue()
    }
  );


  formStatus = toSignal(
    this.conferenceForm.statusChanges,
    {
      initialValue:
        this.conferenceForm.status
    }
  );


  titleLength = computed(() => {

    return (
      this.formValue().title?.length ?? 0
    );

  });


  descriptionLength = computed(() => {

    return (
      this.formValue().description?.length ?? 0
    );

  });


  isFormValid = computed(() => {

    return (
      this.formStatus() === 'VALID'
    );

  });


  participantsValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const maxParticipants =
      control.get('maxParticipants')?.value;

    const nbParticipants =
      control.get('nbParticipants')?.value;

    if (
      maxParticipants !== null &&
      nbParticipants !== null &&
      nbParticipants > maxParticipants
    ) {

      return {
        participantsExceeded: true
      };

    }

    return null;

  }


  // ==========================================
  // POST : ajouter une nouvelle conférence
  // ==========================================

  onSubmit(): void {

    if (
      this.conferenceForm.invalid
    ) {

      this.conferenceForm
        .markAllAsTouched();

      return;

    }

    const formData =
      this.conferenceForm.getRawValue();


    const newConference: Conference = {

      id: 0,

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
      .add(newConference)
      .subscribe({

        next: conference => {

          console.log(
            'Conférence ajoutée :',
            conference
          );

          this.conferenceForm.reset({

            title: '',
            description: '',
            category: '',
            place: '',
            date: '',
            maxParticipants: 1,
            nbParticipants: 0

          });

          this.router.navigate([
            '/conferences'
          ]);

        },

        error: error => {

          console.error(
            'Erreur lors de ajout de la conférence',
            error
          );

        }

      });

  }

}