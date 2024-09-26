import axios from 'axios';

const url = 'https://api.cloudinary.com/v1_1/dnoeykhuv/auto/upload';
const preset = 'ngo3aerq';

export const uploadSingle = async (
  file: File,
  type:
    | 'logo'
    | 'cac'
    | 'govId'
    | 'ids'
    | 'avatar'
    | 'cover'
    | 'media'
    | 'template'
    | 'event'
    | 'health'
    | 'finance'
    | 'validId',
  public_id?: string
) => {
  const data = new FormData();

  data.append('file', file);
  data.append('upload_preset', preset);
  data.append('folder', type);
  if (public_id) data.append('public_id', public_id);

  return axios.post(url, data);
};
