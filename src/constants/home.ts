import { logo2 } from 'src/assets/images';

const lorem = `<strong>Lorem Ipsum is simply dummy text of the
   printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </strong>
  <p>What is Lorem Directory? <br/>

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
`;

export const puyb = [
  { icon: 'icon-park-solid:browser', desc: 'Your Own Searchable Mini website' },
  { icon: 'fluent:cart-24-filled', desc: 'A marketplace for your business' },
  { icon: 'basil:file-solid', desc: 'Thousands of ready-to-use templates' },
];

export const sa = {
  title: 'Special Announcements',

  posts: [
    {
      id: 1,
      title: 'Welcome to THRIVE',
      body: lorem,
      image: logo2.src,
      comment: 5,
      like: 12,
      tags: ['business', 'startup', 'Entrepreneurs', 'event'],
      createdAt: '2024-10-07 20:43:47',
    },
    {
      id: 2,
      title: 'THRIVE beneficiary displays a new business line',
      body: lorem,
      image: 'https://res.cloudinary.com/thrive-biz/image/upload/v1684509080/su_3.png',
      comment: 5,
      like: 12,
      tags: ['business', 'startup', 'Entrepreneurs', 'event'],
      createdAt: '2024-10-07 20:43:47',
    },
    // {
    //   id: 3,
    //   title: 'THRIVE Consortiums meets in Benin',
    //   body: lorem,
    //   image: sa_2.src,
    //   comment: 5,
    //   like: 12,
    //   tags: ['business', 'startup', 'Entrepreneurs', 'event'],
    //   createdAt: '2024-10-07 20:43:47',
    // },
    {
      id: 4,
      title: 'You can now offer your services on THRIVE. Click to get started',
      body: lorem,
      image: 'https://res.cloudinary.com/dnoeykhuv/image/upload/v1729503880/Picture3_uc5etf.jpg',
      comment: 5,
      like: 12,
      tags: ['business', 'startup', 'Entrepreneurs', 'event'],
      createdAt: '2024-10-07 20:43:47',
      href: 'https://forms.gle/96nrSrPy1Ys1eQNYA',
    },
    // {
    //   id: 5,
    //   title: 'THRIVE beneficiary attends export fair',
    //   body: lorem,
    //   image: 'https://res.cloudinary.com/thrive-biz/image/upload/v1684508627/sa_2.png',
    //   comment: 5,
    //   like: 12,
    //   tags: ['business', 'startup', 'Entrepreneurs', 'event'],
    //   createdAt: '2023-05-07 20:43:47',
    // },
    // {
    //   id: 6,
    //   title: 'THRIVE beneficiary attends export fair',
    //   body: lorem,
    //   image: 'https://res.cloudinary.com/thrive-biz/image/upload/v1684508627/sa_2.png',
    //   comment: 5,
    //   like: 12,
    //   tags: ['business', 'startup', 'Entrepreneurs', 'event'],
    //   createdAt: '2023-05-07 20:43:47',
    // },
    // {
    //   id: 7,
    //   title: 'THRIVE beneficiary attends export fair',
    //   body: lorem,
    //   image: 'https://res.cloudinary.com/thrive-biz/image/upload/v1684509079/su_4.png',
    //   comment: 5,
    //   like: 12,
    //   tags: ['business', 'startup', 'Entrepreneurs', 'event'],
    //   createdAt: '2023-05-07 20:43:47',
    // },
  ],
};
