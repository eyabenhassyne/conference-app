import { Routes } from '@angular/router';

import { AdminLayout } from './admin-layout/admin-layout';

export const ADMIN_ROUTES: Routes = [

  {
    path: '',
    component: AdminLayout,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./users/users')
            .then(m => m.Users)
      },

      {
        path: 'statistics',
        loadComponent: () =>
          import('./statistics/statistics')
            .then(m => m.Statistics)
      }

    ]
  }

];