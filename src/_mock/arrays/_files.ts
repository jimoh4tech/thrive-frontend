import _mock from '../_mock';
import { randomInArray } from '../utils';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

const FILE_TYPE = [
  'jpg',
  'mp3',
  'mp4',
  'pdf',
  'jpg',
  'jpg',
  'txt',
  'psd',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'zip',
  'rar',
  'iso',
  'ai',
  'esp',
  'ppt',
  'pptx',
  'wav',
  'm4v',
  'jpg',
  'jpg',
  'pdf',
];

const FOLDER_NAME = ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'];

const FILE_NAME = [
  'Digital Marketing for Business Owners',
  'Accounting 101 For MSMEs - Summarized',
  'expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
  'Setting Up Your Business For Success',
  'List of All Listings Website in Lagos',
  'Michael Adams’ Principles of Business',
  'Interview questions to filter out the best of employees',
  'How to List Your Business For Free',
  'Transition to a virtual work environment easily',
  'expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
  'Setting Up Your Business For Success',
  'List of All Listings Website in Lagos',
  'Michael Adams’ Principles of Business',
  'Interview questions to filter out the best of employees',
  'How to List Your Business For Free',
  'Transition to a virtual work environment easily',
  'expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
  'Setting Up Your Business For Success',
  'List of All Listings Website in Lagos',
  'Michael Adams’ Principles of Business',
  'Interview questions to filter out the best of employees',
  'How to List Your Business For Free',
  'Transition to a virtual work environment easily',
];

const FILE_URL = [
  _mock.image.cover(1),
  'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
  'https://www.cloud.com/s/c218bo6kjuqyv66/expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
  'https://www.cloud.com/s/c218bo6kjuqyv66/money-popup-crack.pdf',
  _mock.image.cover(3),
  _mock.image.cover(5),
  'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
  'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
  'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
  'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
  'https://www.cloud.com/s/c218bo6kjuqyv66/vintage_bahrain_saipan.xls',
  'https://www.cloud.com/s/c218bo6kjuqyv66/indonesia-quito-nancy-grace-left-glad.xlsx',
  'https://www.cloud.com/s/c218bo6kjuqyv66/legislation-grain.zip',
  'https://www.cloud.com/s/c218bo6kjuqyv66/large_energy_dry_philippines.rar',
  'https://www.cloud.com/s/c218bo6kjuqyv66/footer-243-ecuador.iso',
  'https://www.cloud.com/s/c218bo6kjuqyv66/kyrgyzstan-04795009-picabo-street-guide-style.ai',
  'https://www.cloud.com/s/c218bo6kjuqyv66/india-data-large-gk-chesterton-mother.esp',
  'https://www.cloud.com/s/c218bo6kjuqyv66/footer-barbados-celine-dion.ppt',
  'https://www.cloud.com/s/c218bo6kjuqyv66/socio_respectively_366996.pptx',
  'https://www.cloud.com/s/c218bo6kjuqyv66/socio_ahead_531437_sweden_popup.wav',
  'https://www.cloud.com/s/c218bo6kjuqyv66/trinidad_samuel-morse_bring.m4v',
  _mock.image.cover(11),
  _mock.image.cover(17),
  'https://www.cloud.com/s/c218bo6kjuqyv66/xl_david-blaine_component_tanzania_books.pdf',
];

// ----------------------------------------------------------------------

export const SHARED_PERSON = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  avatar: _mock.image.avatar(index),
  permission: randomInArray(['view', 'edit']),
}));

// ----------------------------------------------------------------------

export const _folders = FOLDER_NAME.map((folder, index) => ({
  id: `${_mock.id(index)}_folders`,
  name: folder,
  size: GB / ((index + 1) * 10),
  type: 'folder',
  totalFiles: (index + 1) * 100,
  isFavorited: _mock.boolean(index + 1),
  shared: SHARED_PERSON.slice(index, 5),
  url: FILE_URL[index],
  tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
  dateCreated: _mock.time(index),
  dateModified: _mock.time(index),
}));

// ----------------------------------------------------------------------

export const _files = FILE_NAME.map((file, index) => ({
  id: `${_mock.id(index)}_files`,
  name: file,
  size: GB / ((index + 1) * 500),
  type: FILE_TYPE[index],
  isFavorited: _mock.boolean(index + 1),
  url: FILE_URL[index],
  tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
  dateCreated: _mock.time(index),
  dateModified: _mock.time(index),
}));

// ----------------------------------------------------------------------

export const _allFiles = [..._folders, ..._files];
