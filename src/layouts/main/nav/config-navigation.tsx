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
    title: 'ICSS Modules',
    path: PATH_PAGE.icssModules,
  },
  {
    title: 'Ecosystem',
    path: PATH_PAGE.ecosystem, 
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'MSME Development', path: PATH_PAGE.ecosystem },
          { title: 'ICSS TFC', path: PATH_PAGE.icssTfc },
          { title: 'ICSS THRIVE Consortium', path: PATH_PAGE.icssConsortiums },
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
