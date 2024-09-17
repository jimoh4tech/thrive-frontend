// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      {
        title: 'Digital Address',
        path: PATH_DASHBOARD.digitalAddress,
        icon: ICONS.external,
      },
      {
        title: 'Virtual Office ',
        path: PATH_DASHBOARD.virtualOffice,
        icon: ICONS.banking,
      },
      {
        title: 'Business Library',
        path: PATH_DASHBOARD.businessMediaLibrary,
        icon: ICONS.folder,
      },
      // {
      //   title: 'Collaboration tool',
      //   path: PATH_DASHBOARD.collaborationTools,
      //   icon: ICONS.calendar,
      // },
      {
        title: 'Business Toolkit ',
        path: PATH_DASHBOARD.businessTemplateLibrary,
        icon: ICONS.file,
      },
      {
        title: 'Marketplace',
        path: PATH_DASHBOARD.networkingMarketplace.businesses,
        icon: ICONS.ecommerce,
        children: [
          {
            title: 'Businesses',
            // roles: ['admin'],
            path: PATH_DASHBOARD.networkingMarketplace.businesses,
          },
          // {
          //   title: 'Community',
          //   // roles: ['admin'],
          //   path: PATH_DASHBOARD.networkingMarketplace.community,
          // },
          // { title: 'Chat', path: PATH_DASHBOARD.networkingMarketplace.chat },
        ],
      },
      {
        title: 'Access to Events ',
        path: PATH_DASHBOARD.accessToEvent,
        icon: ICONS.booking,
      },
      {
        title: 'Access to Finance ',
        path: PATH_DASHBOARD.accessToFinance,
        icon: ICONS.invoice,
      },
      {
        title: 'Workplace Booking ',
        path: PATH_DASHBOARD.workplaceBooking,
        icon: ICONS.kanban,
      },
      {
        title: 'Business Directory',
        path: PATH_DASHBOARD.directoryListing,
        icon: ICONS.menuItem,
      },
      {
        title: 'Health and Wellness',
        path: PATH_DASHBOARD.healthWellBeing,
        icon: ICONS.user,
      },
      // { title: 'Thrivee-Learning ', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
      // { title: 'ThrivePartner’s portal ', path: PATH_DASHBOARD.general.file, icon: ICONS.invoice },
      // info: <Iconify icon="material-symbols:lock" color="error.dark" />,
    ],
  },

  {
    subheader: 'HELP',
    // roles: ['admin'],
    items: [
      { title: 'Contact Support & FAQs', path: PATH_DASHBOARD.contactSupport, icon: ICONS.chat },
    ],
  },
  // MANAGEMENT
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.new },
  //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // E-COMMERCE
  //     {
  //       title: 'ecommerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //       ],
  //     },

  //     // INVOICE
  //     {
  //       title: 'invoice',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.invoice,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  //     // BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.blog.new },
  //       ],
  //     },
  //     {
  //       title: 'File manager',
  //       path: PATH_DASHBOARD.fileManager,
  //       icon: ICONS.folder,
  //     },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Other Addons',
  //   items: [],
  // },

  // // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.lock,
  //        roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level',
  //       path: '#/dashboard/menu_level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'menu_level_2a',
  //           path: '#/dashboard/menu_level/menu_level_2a',
  //         },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/dashboard/menu_level/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'item_disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },

  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'item_external_link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //     },
  //     {
  //       title: 'blank',
  //       path: PATH_DASHBOARD.blank,
  //       icon: ICONS.blank,
  //     },
  //   ],
  // },
];

export default navConfig;
