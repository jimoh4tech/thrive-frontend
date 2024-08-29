// @mui
import { Box, Button, Typography } from '@mui/material';
// @types
import { Container, Stack, useTheme } from '@mui/system';
import { useSnackbar } from 'notistack';
import { Fragment, useCallback, useState } from 'react';
import ReactLoading from 'react-loading';
import { IUserBusiness } from 'src/@types/business';
import { updater } from 'src/actions';
import Iconify from 'src/components/iconify/Iconify';
import { UploadAvatar } from 'src/components/upload';
import UploadButton from 'src/components/upload-button';
import { uploadSingle } from 'src/utils/cloudinary';
import { useAuthContext } from 'src/auth/useAuthContext';
import { CustomAvatar } from 'src/components/custom-avatar';
import { bgBlur } from '../../../utils/cssStyles';
// auth
// components
import Image from '../../../components/image';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BusinessCover({
  business: { name, industry, cover, logo },
  isPublic,
}: {
  business: IUserBusiness;
  isPublic?: boolean;
}) {
  const theme = useTheme();

  const { user } = useAuthContext();

  const [newLogo, setNewLogo] = useState<File | string | null>(null);
  const [newCover, setNewCover] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleDrop = useCallback(
    async (acceptedFiles: File[], fileType: 'logo' | 'cover') => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setLoading(true);
        const customFile = Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        });

        if (fileType === 'cover') setNewCover(customFile.preview);
        else setNewLogo(customFile);

        try {
          const res = await uploadSingle(newFile, `${fileType}`);
          console.log({ res });
          await updater('userBusiness', { [fileType]: res.data.public_id });
        } catch (err) {
          console.error(err);
          enqueueSnackbar(err?.message || err, { variant: 'error' });
        }
        setLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  const IBox = isPublic ? Container : Fragment;

  return (
    <>
      <Box p={4} height="100%">
        <Image
          alt="cover"
          src={newCover || cover}
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
            zIndex: 0,
            '&:before': {
              ...bgBlur({
                color: theme.palette.primary.dark,
                blur: 0.4,
              }),
              top: 0,
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
            },
          }}
        />

        <IBox>
          <Stack
            direction={{ md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            mt="auto"
            height="100%"
          >
            <Stack spacing={2} direction={{ md: 'row' }} alignItems="center">
              {user ? (
                <UploadAvatar
                  file={newLogo || logo}
                  onDrop={(_) => handleDrop(_, 'logo')}
                  accept={{
                    'image/jpeg': [],
                    'image/png': [],
                  }}
                  uploadText="Logo"
                />
              ) : (
                <CustomAvatar
                  src={logo}
                  alt={name}
                  name={name}
                  sx={{
                    mx: 'auto',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'common.white',
                    width: { xs: 80, md: 128 },
                    height: { xs: 80, md: 128 },
                    fontWeight: 700,
                    fontSize: 60,
                  }}
                />
              )}
              <Box
                sx={{
                  color: 'common.white',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typography variant="h4" sx={{ opacity: 0.72 }}>
                  {name}
                </Typography>

                <Typography sx={{ opacity: 0.72 }}>{industry?.name}</Typography>
              </Box>
            </Stack>
            {user && (
              <Box>
                <UploadButton
                  onDrop={(_) => handleDrop(_, 'cover')}
                  accept={{
                    'image/jpeg': [],
                    'image/png': [],
                  }}
                  render={
                    <Button
                      sx={{
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
              </Box>
            )}
          </Stack>
        </IBox>
      </Box>

      {loading && <ReactLoading type="spokes" color="grey" width={25} />}
    </>
  );
}
