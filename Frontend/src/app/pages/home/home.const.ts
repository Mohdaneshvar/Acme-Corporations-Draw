import { KeyValue } from '@angular/common';
import { Role } from 'src/app/app-role';
import { Route } from 'src/app/app-routing';
import { Menu, NavbarIcon } from './home.model';


export const AppMenu: Menu[] = [
  {
    id: 100,
    route: null,
    title: 'Register for the Draw',
    icon: 'mdi-email',
    sidebar: true,
    subMenu: [
      {
        id: 101,
        route: Route.Participants_Register,
        title: 'Register',
        desc: 'Register for the Draw',
        icon: 'mdi-account-plus',
        shortcut: 1,
      },
      {
        id: 102,
       // roles: [Role.Admin],
        route: Route.Participant_List,
        title: 'Submissions',
        desc: 'Show all submissions',
        icon: 'mdi-view-list',
        shortcut: 2,
      },
      {
        id: 103,
        route: Route.Create_Serial_Number,
        title: 'Create serial number',
        desc: 'Create new draw\'s serial number',
        icon: 'mdi-download-box',
        shortcut: 3,
      },
    ],
  },
];

export const AppNabBarList: NavbarIcon[] = [
  //{ name: 'help', icon: 'mdi-help-circle', title: 'راهنما'},
  { name: 'home', icon: 'mdi-home', title: 'شروع مجدد' },
 // { name: 'wealth', icon: 'mdi-home', title: 'شروع مجدد' }
];

export const AppThemeList: KeyValue<number, string>[] = [
  { key: 1, value: '#51b75e' },
  { key: 2, value: '#9d51b7' },
  { key: 3, value: '#00bfff' },
  { key: 4, value: '#51b7ae' },
  { key: 5, value: '#ff3a8c' },
  { key: 6, value: '#0099cc' },
  { key: 7, value: '#ffbb05' },
  { key: 8, value: '#403cad' },
  { key: 9, value: '#ff5d44' },
  { key: 10, value: '#ff8bbe' },
];
