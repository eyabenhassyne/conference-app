import {
  Component,
  computed
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

  onSubmit(): void {

    if (this.conferenceForm.valid) {

      console.log(
        'Conférence enregistrée :',
        this.conferenceForm.getRawValue()
      );

    }

  }

}