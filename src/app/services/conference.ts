import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';

import { Conference } from '../models/conference';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/conferences';


  // =====================================================
  // GET : récupérer toutes les conférences
  // =====================================================

  getAll(): Observable<Conference[]> {

    return this.http.get<Conference[]>(
      this.apiUrl
    );

  }


  // =====================================================
  // GET BY ID : récupérer une conférence par son id
  // =====================================================

  getById(id: number): Observable<Conference> {

    return this.http.get<Conference>(
      `${this.apiUrl}/${id}`
    );

  }


  // =====================================================
  // POST : ajouter une nouvelle conférence
  // =====================================================

  add(conference: Conference): Observable<Conference> {

    return this.http.post<Conference>(
      this.apiUrl,
      conference
    );

  }


  // =====================================================
  // PUT : modifier complètement une conférence
  // =====================================================

  update(
    id: number,
    conference: Conference
  ): Observable<Conference> {

    return this.http.put<Conference>(
      `${this.apiUrl}/${id}`,
      conference
    );

  }


  // =====================================================
  // PATCH : modifier seulement certaines propriétés
  // =====================================================

  patch(
    id: number,
    changes: Partial<Conference>
  ): Observable<Conference> {

    return this.http.patch<Conference>(
      `${this.apiUrl}/${id}`,
      changes
    );

  }


  // =====================================================
  // DELETE : supprimer une conférence
  // =====================================================

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


  // =====================================================
  // REGISTER : inscrire un participant
  // =====================================================

  register(id: number): Observable<Conference> {

    return this.getById(id).pipe(

      switchMap(conference => {

        if (
          conference.nbParticipants <
          conference.maxParticipants
        ) {

          return this.patch(
            id,
            {
              nbParticipants:
                conference.nbParticipants + 1
            }
          );

        }

        return throwError(
          () => new Error(
            'La conférence est complète'
          )
        );

      })

    );

  }

}