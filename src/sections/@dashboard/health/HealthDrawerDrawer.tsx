import { useState } from 'react';
// @mui
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label/Label';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { IHealth } from 'src/@types/health';
import { useSnackbar } from 'notistack';
import { useAuthContext } from 'src/auth/useAuthContext';
import { deleteHealth } from 'src/actions/admin/usersAction';
import { LoadingButton } from '@mui/lab';
import Image from '../../../components/image';
// utils
// @types
// components
//

// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  institution: IHealth;
  onClose: VoidFunction;
}

export default function HealthDrawerDrawer({
  open,
  institution,
  //
  onClose,
  ...other
}: Props) {
  const { name, cover, description, url, category, isPlatinum, id } = institution;

  const [toggleProperties, setToggleProperties] = useState(true);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const handleToggleProperties = () => {
    setToggleProperties(!toggleProperties);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteHealth(id);
      enqueueSnackbar(res.data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(err.message || err, { color: 'error.main' });
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      // BackdropProps={{
      //   invisible: true,
      // }}
      PaperProps={{
        sx: { width: 320 },
      }}
      {...other}
    >
      <Scrollbar sx={{ height: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Typography variant="h6"> institution Details </Typography>

          {/* <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={onFavorite}
            sx={{ p: 0.75 }}
          /> */}

          {isPlatinum && (
            <Label
              variant="soft"
              color="primary"
              sx={{
                top: 16,
                right: 16,
                zIndex: 9,
                textTransform: 'uppercase',
              }}
            >
              PLATINUM
            </Label>
          )}

          <IconButton size="small" onClick={onClose}>
            <Iconify icon="ic:sharp-close" />
          </IconButton>
        </Stack>

        <Stack spacing={2} justifyContent="center" sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <Image alt={name} src={cover} sx={{ borderRadius: 1 }} />

          <Typography variant="h6" sx={{ wordBreak: 'break-all', color: 'primary.main' }}>
            {name}
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" children={category?.name} />

            {url && (
              <Button href={url} target="_blank" size="small" variant="outlined">
                Visit Website
              </Button>
            )}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={1.5}>
            <Panel label="Properties" toggle={toggleProperties} onToggle={handleToggleProperties} />

            {toggleProperties && (
              <Stack spacing={1.5}>
                <Row label="Institution" value={institution.name} />
                <Row label="Email" value="info@bolajitailors.com" />
                <Row label="Phone" value="+234812345678" />

                {/* <Row label="Date" value={`${fTime(startDate)} - ${fDate(endDate)}`} /> */}
              </Stack>
            )}
          </Stack>
        </Stack>
        <Box p={2.5}>
          <Typography variant="h6">About institution</Typography>
          <Typography>{description}</Typography>
        </Box>

        {/* {hasShared && (
            <List disablePadding sx={{ pl: 2.5, pr: 1 }}>
              {shared.map((person) => (
                <FileInvitedItem key={person.id} person={person} />
              ))}
            </List>
          )} */}
      </Scrollbar>

      <Box sx={{ p: 2.5 }} gap={2}>
        <Button
          fullWidth
          href={url || ''}
          target="_blank"
          startIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          size="large"
          variant="soft"
          color="success"
        >
          APPLY NOW
        </Button>
        {user.role.id === 3 && (
          <LoadingButton
            fullWidth
            variant="soft"
            color="error"
            size="large"
            startIcon={<Iconify icon="eva:trash-2-outline" />}
            onClick={onDelete}
            loading={loading}
          >
            DELETE
          </LoadingButton>
        )}
      </Box>
    </Drawer>
  );
}

// ----------------------------------------------------------------------

interface PanelProps extends StackProps {
  label: string;
  toggle: boolean;
  onToggle: VoidFunction;
}

function Panel({ label, toggle, onToggle, ...other }: PanelProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...other}>
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify icon={toggle ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value = '' }: RowProps) {
  return (
    <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
      <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
