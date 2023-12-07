// routes
import { PATH_PAGE } from '../../../routes/paths';
// config
// components

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: PATH_PAGE.about,
  },
  {
    title: 'Thrive Modules',
    path: PATH_PAGE.thriveModules,
  },
  {
    title: 'Ecosystem',
    path: PATH_PAGE.ecosystem,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'MSME Development', path: PATH_PAGE.ecosystem },
          { title: 'ThriveTFC', path: PATH_PAGE.thriveTfc },
          { title: 'Thrive Consortium', path: PATH_PAGE.thriveConsortiums },
          { title: 'Announcements', path: PATH_PAGE.announcement },
          { title: 'MSME Market', path: PATH_PAGE.marketplace },
        ],
      },
    ],
  },
  {
    title: 'Services',
    path: PATH_PAGE.services,
  },
  {
    title: 'Contact',
    path: PATH_PAGE.contact,
  },
];

export default navConfig;
