import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-conference-list',
  imports: [
    DatePipe,
    UpperCasePipe
  ],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css'
})
export class ConferenceList {

  conferences = [
    {
      title: 'Angular Conference',
      description: 'Découvrir Angular',
      date: new Date('2026-10-20'),
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 40
    },
    {
      title: 'AI Conference',
      description: 'Découvrir intelligence artificielle',
      date: new Date('2026-11-15'),
      place: 'Ariana',
      maxParticipants: 50,
      nbParticipants: 45
    },
    {
      title: 'Cloud Conference',
      description: 'Découvrir le Cloud',
      date: new Date('2026-12-10'),
      place: 'Sousse',
      maxParticipants: 30,
      nbParticipants: 30
    }
  ];

}