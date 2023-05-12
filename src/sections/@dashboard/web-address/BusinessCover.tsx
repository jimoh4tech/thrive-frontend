// @mui
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// @types
import { useTheme } from '@mui/system';
import { useCallback, useState } from 'react';
import { IUserBusiness } from 'src/@types/business';
import Iconify from 'src/components/iconify/Iconify';
import { UploadAvatar } from 'src/components/upload';
import { uploadSingle } from 'src/utils/cloudinary';
import { useSnackbar } from 'notistack';
import { updater } from 'src/actions';
import UploadButton from 'src/components/upload-button';
import { bgBlur } from '../../../utils/cssStyles';
// auth
// components
import Image from '../../../components/image';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({
      color: theme.palette.primary.dark,
      blur: 0.4,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function BusinessCover({
  business: { name, industry, cover, logo },
}: {
  business: IUserBusiness;
}) {
  const theme = useTheme();

  const [newLogo, setNewLogo] = useState<File | string | null>(null);
  const [newCover, setNewCover] = useState<string | null>(null);

  const { enqueueSnackbar } = useSnackbar();
  const handleDrop = useCallback(
    async (acceptedFiles: File[], fileType: 'logo' | 'cover') => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        const customFile = Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        });

        if (fileType === 'cover') setNewCover(customFile.preview);
        else setNewLogo(customFile);

        try {
          const res = await uploadSingle(newFile, `${fileType}`);
          await updater('business', { [fileType]: res.data.public_id });
          console.log(res.data);
        } catch (err) {
          console.error(err);
          enqueueSnackbar(err?.message || err, { variant: 'error' });
        }
      }
    },
    [enqueueSnackbar]
  );

  return (
    <StyledRoot>
      <StyledInfo>
        {/* <CustomAvatar
          // src={user?.photoURL}
          // alt={user?.fullName}
          name={name}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
            fontWeight: 700,
            fontSize: 60,
          }}
        >
          <Fab variant="soft" sx={{ position: 'absolute' }}>
            <Iconify icon="ph:camera-rotate-light" width={24} />
          </Fab>
        </CustomAvatar> */}

        <UploadAvatar
          file={newLogo || logo}
          onDrop={(_) => handleDrop(_, 'logo')}
          accept={{
            'image/jpeg': [],
            'image/png': [],
          }}
          uploadText="Logo"
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{name}</Typography>

          <Typography sx={{ opacity: 0.72 }}>{industry}</Typography>
        </Box>
      </StyledInfo>

      <UploadButton
        onDrop={(_) => handleDrop(_, 'cover')}
        accept={{
          'image/jpeg': [],
          'image/png': [],
        }}
        render={
          <Button
            sx={{
              zIndex: 99,
              right: theme.spacing(5),
              bottom: theme.spacing(5),
              position: 'absolute',
              color: '#fff',
            }}
            variant="soft"
            color="inherit"
            startIcon={<Iconify icon="ph:camera-rotate-light" width={24} />}
          >
            Edit Cover Picture
          </Button>
        }
      />

      <Image
        alt="cover"
        src={newCover || cover}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
        }}
      />
    </StyledRoot>
  );
}
