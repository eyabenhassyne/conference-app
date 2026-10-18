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

    place: new FormControl('')

  });

}