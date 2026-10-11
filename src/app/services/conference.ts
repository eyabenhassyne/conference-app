import { Injectable } from '@angular/core';
import { Conference } from '../models/conference';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  private conferences: Conference[] = [
    {
      id: 1,
      title: 'Angular Conference',
      description: 'Découvrir Angular et ses fonctionnalités modernes',
      date: new Date('2026-10-20'),
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 40
    },
    {
      id: 2,
      title: 'AI Conference',
      description: 'Découvrir intelligence artificielle',
      date: new Date('2026-11-15'),
      place: 'Ariana',
      maxParticipants: 50,
      nbParticipants: 45
    },
    {
      id: 3,
      title: 'Cloud Conference',
      description: 'Découvrir le Cloud',
      date: new Date('2026-12-10'),
      place: 'Sousse',
      maxParticipants: 30,
      nbParticipants: 30
    }
  ];

  getAll(): Conference[] {
    return this.conferences;
  }

  getById(id: number): Conference | undefined {
    return this.conferences.find(
      conference => conference.id === id
    );
  }

  register(id: number): void {

    const conference = this.getById(id);

    if (
      conference &&
      conference.nbParticipants < conference.maxParticipants
    ) {
      conference.nbParticipants++;
    }
  }
}