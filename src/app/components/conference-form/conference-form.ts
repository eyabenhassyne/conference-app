import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
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

  conferenceForm = new FormGroup({

    title: new FormControl(''),

    description: new FormControl(''),

    category: new FormControl(''),

    place: new FormControl(''),

    date: new FormControl(''),

    maxParticipants: new FormControl(0),

    nbParticipants: new FormControl(0)

  });

  onSubmit(): void {

    console.log(
      this.conferenceForm.value
    );

  }

}