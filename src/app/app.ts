import { Component } from '@angular/core';

import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { UserProfile } from './components/user-profile/user-profile';
import { FriendList } from './components/friend-list/friend-list';
import { Notifications } from './components/notifications/notifications';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Navbar,
    UserProfile,
    FriendList,
    Notifications,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}