import { Box, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
//
import { IMedia } from 'src/@types/media';
import { fileThumb } from './utils';

// ----------------------------------------------------------------------

type FileIconProps = {
  file: IMedia | string;
  imageView?: boolean;
  sx?: SxProps<Theme>;
  imgSx?: SxProps<Theme>;
};

export default function FileThumbnail({ file, imageView, sx, imgSx }: FileIconProps) {
  const _file = typeof file === 'string' ? file : file.format;
  return _file === 'jpg' && imageView ? (
    <Box
      component="img"
      src={_file}
      sx={{
        width: 1,
        height: 1,
        flexShrink: 0,
        objectFit: 'cover',
        ...imgSx,
      }}
    />
  ) : (
    <Box
      component="img"
      src={fileThumb(_file)}
      sx={{
        width: 32,
        height: 32,
        flexShrink: 0,
        ...sx,
      }}
    />
  );
}
