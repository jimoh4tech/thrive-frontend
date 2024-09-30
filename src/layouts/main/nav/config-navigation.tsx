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
  // {
  //   title: 'THRIVE Modules',
  //   path: PATH_PAGE.thriveModules,
  // },
  {
    title: 'THRIVE Space',
    path: PATH_PAGE.ecosystem,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'Entrepreneurship Space', path: PATH_PAGE.ecosystem },
          // { title: 'THRIVE TFC', path: PATH_PAGE.thriveTfc },
          // { title: 'THRIVE Consortium', path: PATH_PAGE.thriveConsortiums },
          { title: 'Announcements', path: PATH_PAGE.announcement },
          { title: 'Marketplace', path: PATH_PAGE.marketplace },
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
