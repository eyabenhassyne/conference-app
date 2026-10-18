import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import {
  toSignal
} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-conference-route-test',

  imports: [],

  templateUrl: './conference-route-test.html',

  styleUrl: './conference-route-test.css'
})
export class ConferenceRouteTest {

  private route =
    inject(ActivatedRoute);

  paramMapSignal =
    toSignal(this.route.paramMap);

  id = computed(() =>
    this.paramMapSignal()?.get('id')
  );

}