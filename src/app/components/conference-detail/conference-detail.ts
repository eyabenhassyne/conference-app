import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-conference-detail',
  imports: [FormsModule],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css'
})
export class ConferenceDetail {

  title = signal('Angular Conference');
  speaker = signal('John Doe');
  date = signal('20 octobre 2026');
  availablePlaces = signal(50);
  register() {
  if (this.availablePlaces() > 0) {
    this.availablePlaces.update(value => value - 1);
  }
}
  changeTitle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.title.set(input.value);
  }
}