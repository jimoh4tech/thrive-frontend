// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: '/login',
  register: '/register',
  loginUnprotected: '/login-unprotected',
  registerUnprotected: '/register-unprotected',
  verify: '/verify',
  resetPassword: '/reset-password',
  newPassword: '/new-password',
};

export const PATH_PAGE = {
  maintenance: '/maintenance',
  announcement: '/announcement',
  ecosystem: '/ecosystem',
  directory: '/directory',
  icssModules: '/icss-modules',
  services: '/services',
  icssConsortiums: '/icss-implementing-agencies',
  marketplace: '/marketplace',
  icssTfc: '/icss-tfc',
  about: '/about-us',
  contact: '/contact-us',

  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  commingSoon: '/coming-soon',
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  users: path(ROOTS_ADMIN, '/users'),

  businessMedia: {
    root: path(ROOTS_ADMIN, '/business-media'),
    library: path(ROOTS_ADMIN, '/business-media/library'),
    new: path(ROOTS_ADMIN, '/business-media/new'),
  },
  businessTemplate: {
    root: path(ROOTS_ADMIN, '/business-box'),
    library: path(ROOTS_ADMIN, '/business-box/library'),
    new: path(ROOTS_ADMIN, '/business-box/new'),
  },
  health: {
    root: path(ROOTS_ADMIN, '/health'),
    providers: path(ROOTS_ADMIN, '/health/providers'),
    new: path(ROOTS_ADMIN, '/health/new'),
  },
  finance: {
    root: path(ROOTS_ADMIN, '/finance'),
    services: path(ROOTS_ADMIN, '/finance/services'),
    new: path(ROOTS_ADMIN, '/finance/new'),
  },
  event: {
    root: path(ROOTS_ADMIN, '/events'),
    events: path(ROOTS_ADMIN, '/events'),
    new: path(ROOTS_ADMIN, '/events/new'),
  },
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  webAddress: path(ROOTS_DASHBOARD, '/web-address'),
  directoryListing: path(ROOTS_DASHBOARD, '/directory-listing'),
  workplaceBooking: path(ROOTS_DASHBOARD, '/workplace-booking'),
  accessToFinance: path(ROOTS_DASHBOARD, '/access-finance'),
  accessToEvent: path(ROOTS_DASHBOARD, '/access-event'),
  healthWellBeing: path(ROOTS_DASHBOARD, '/health-well-being'),
  virtualOffice: path(ROOTS_DASHBOARD, '/virtual-office'),
  collaborationTools: path(ROOTS_DASHBOARD, '/collaboration-tools'),
  businessTemplateLibrary: path(ROOTS_DASHBOARD, '/business-box'),
  businessMediaLibrary: path(ROOTS_DASHBOARD, '/business-media'),
  contactSupport: path(ROOTS_DASHBOARD, '/contact-support'),
  upgrade: path(ROOTS_DASHBOARD, '/upgrade'),
  account: path(ROOTS_DASHBOARD, '/account'),
  networkingMarketplace: {
    businesses: path(ROOTS_DASHBOARD, '/networking-marketplace'),
    community: path(ROOTS_DASHBOARD, '/networking-marketplace/community'),
    chat: path(ROOTS_DASHBOARD, '/networking-marketplace/chat'),
    newChat: path(ROOTS_DASHBOARD, '/networking-marketplace/chat/chat/new'),
    viewChat: (name: string) => path(ROOTS_DASHBOARD, `/networking-marketplace/chat/${name}`),
  },

  // mail: {
  //   root: path(ROOTS_DASHBOARD, '/mail'),
  //   all: path(ROOTS_DASHBOARD, '/mail/all'),
  // },
  // chat: {
  //   root: path(ROOTS_DASHBOARD, '/chat'),
  //   new: path(ROOTS_DASHBOARD, '/chat/new'),
  //   view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  // },
  // eCommerce: {
  //   root: path(ROOTS_DASHBOARD, '/e-commerce'),
  //   shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
  //   list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
  //   checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
  //   new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
  //   view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
  //   edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
  //   demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
  //   demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  // },
  // invoice: {
  //   root: path(ROOTS_DASHBOARD, '/invoice'),
  //   list: path(ROOTS_DASHBOARD, '/invoice/list'),
  //   new: path(ROOTS_DASHBOARD, '/invoice/new'),
  //   view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
  //   edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
  //   demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
  //   demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  // },
  // blog: {
  //   root: path(ROOTS_DASHBOARD, '/blog'),
  //   posts: path(ROOTS_DASHBOARD, '/blog/posts'),
  //   new: path(ROOTS_DASHBOARD, '/blog/new'),
  //   view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
  //   demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  // },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
