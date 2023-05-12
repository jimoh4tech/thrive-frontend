import { useState } from 'react';
// @mui
import {
  Button,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// @types
import { useForm } from 'react-hook-form';
import { CustomAvatar } from 'src/components/custom-avatar';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { fDate } from 'src/utils/formatTime';
import { IUserAccountGeneral } from '../../../../@types/user';
// components
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IUserAccountGeneral;
  // onEditRow?: VoidFunction;
  // onSelectRow?: VoidFunction;
  // onDeleteRow?: VoidFunction;
  onApprove: (icssId: string) => void;
  onDecline: VoidFunction;
};

export default function UserTableRow({
  row,
  // onEditRow,
  // onSelectRow,
  // onDeleteRow,
  onApprove,
  onDecline,
}: Props) {
  const { fullName, avatarUrl, email, icssId, dob, createdAt, status } = row;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleApprove = (_icssId: string) => {
    setOpenConfirm(false);
    onApprove(_icssId);
  };

  const handlePopoverClick = (callback: (status: boolean) => void) => {
    callback(true);
    handleClosePopover();
  };

  return (
    <>
      <TableRow
        hover
        // selected={selected}
      >
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={fullName} src={avatarUrl} />

            <Typography variant="subtitle2" noWrap>
              {fullName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {icssId || 'null'}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {dob}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {fDate(createdAt)}
        </TableCell>

        {/* <TableCell align="center">
          <Iconify
            icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!isVerified && { color: 'warning.main' }),
            }}
          />
        </TableCell> */}

        <TableCell align="left">
          <Label
            variant="soft"
            color={(status === 'banned' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={() => handlePopoverClick(setOpenConfirm)} sx={{ color: 'success.main' }}>
          <Iconify icon="mdi:approve" />
          Approve
        </MenuItem>

        <MenuItem onClick={() => handlePopoverClick(setOpenDecline)} sx={{ color: 'error.main' }}>
          <Iconify icon="mdi:cancel" />
          Decline
        </MenuItem>
      </MenuPopover>

      <RenderApproveDialog
        onApprove={handleApprove}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
      <ConfirmDialog
        open={openDecline}
        onClose={() => setOpenDecline(false)}
        title="Delete"
        content="Enter ICSS ID to proceed"
        action={
          <Button variant="contained" color="error" onClick={onDecline}>
            Decline
          </Button>
        }
      />
    </>
  );
}

type RProps = {
  openConfirm: boolean;
  setOpenConfirm: (val: boolean) => void;
  onApprove: Props['onApprove'];
};

function RenderApproveDialog({ openConfirm, setOpenConfirm, onApprove }: RProps) {
  const methods = useForm({ defaultValues: { icssId: '' } });

  const { getValues } = methods;

  return (
    <ConfirmDialog
      open={openConfirm}
      onClose={() => setOpenConfirm(false)}
      title="Approve This User"
      content={
        <FormProvider methods={methods}>
          <Typography sx={{ my: 2 }}>Enter ICSS ID to proceed</Typography>

          <RHFTextField name="icssId" label="ICSS ID" />
        </FormProvider>
      }
      action={
        <Button variant="contained" color="success" onClick={() => onApprove(getValues('icssId'))}>
          Approve
        </Button>
      }
    />
  );
}
