import axios from 'axios';

const url = 'https://api.cloudinary.com/v1_1/thrive-biz/auto/upload';
const preset = 'ehu6yguh';

export const uploadSingle = async (
  file: File,
  type:
    | 'logo'
    | 'cac'
    | 'ids'
    | 'avatar'
    | 'cover'
    | 'media'
    | 'template'
    | 'event'
    | 'health'
    | 'finace',
  public_id?: string
) => {
  const data = new FormData();

  data.append('file', file);
  data.append('upload_preset', preset);
  data.append('folder', type);
  if (public_id) data.append('public_id', public_id);

  return axios.post(url, data);
};
