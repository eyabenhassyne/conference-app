import { Component } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-conference-form',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './conference-form.html',

  styleUrl: './conference-form.css'
})
export class ConferenceForm {

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

  onSubmit(): void {

    if (this.conferenceForm.valid) {

      console.log(
        this.conferenceForm.value
      );

    }

  }
}