import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'conferences',
    pathMatch: 'full'
  },

  {
    path: 'conferences',
    loadComponent: () =>
      import(
        './components/conference-list/conference-list'
      )
        .then(m => m.ConferenceList)
  },

  {
    path: 'conference/:id',
    loadComponent: () =>
      import(
        './components/conference-detail/conference-detail'
      )
        .then(m => m.ConferenceDetail)
  },

  {
    path: 'confirmation/:id',
    loadComponent: () =>
      import(
        './components/registration-confirmation/registration-confirmation'
      )
        .then(
          m => m.RegistrationConfirmation
        )
  },

  {
    path: 'profile',
    loadComponent: () =>
      import(
        './components/profile/profile'
      )
        .then(m => m.Profile)
  },

  {
    path: 'admin',
    loadChildren: () =>
      import(
        './features/admin/admin.routes'
      )
        .then(m => m.ADMIN_ROUTES)
  },
  {
  path: 'route-test/:id',
  loadComponent: () =>
    import(
      './components/conference-route-test/conference-route-test'
    )
      .then(m => m.ConferenceRouteTest)
},
  {
    path: '**',
    redirectTo: 'conferences'
  }

];