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
import { CustomAvatar } from 'src/components/custom-avatar';
import { fDate } from 'src/utils/formatTime';
import ViewDialog from 'src/components/view-dialog';
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
  onApprove: (id: number) => void;
  onDecline: (id: number) => void;
  onSuspend: (id: number) => void;
};

export default function UserTableRow({
  row,
  // onEditRow,
  // onSelectRow,
  // onDeleteRow,
  onApprove,
  onDecline,
  onSuspend,
}: Props) {
  const { fullName, avatarUrl, email, phone, createdAt, status, ngo, isApproved, role } = row;

  const [openView, setOpenView] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
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
          {phone || 'null'}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {ngo?.name}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {fDate(createdAt)}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(isApproved && 'success') || (status === 'pending' && 'warning') || 'error'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status !== 'pending' ? status : 'Suspended'}
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
        <MenuItem onClick={() => handlePopoverClick(setOpenView)} sx={{ color: 'info.main' }}>
          <Iconify icon="carbon:play" />
          View
        </MenuItem>
        <MenuItem onClick={() => handlePopoverClick(setOpenConfirm)} sx={{ color: 'success.main' }}>
          <Iconify icon="mdi:approve" />
          Approve
        </MenuItem>
        <MenuItem
          onClick={() => handlePopoverClick(setOpenDecline)}
          sx={{ color: 'error.main' }}
          disabled={role.id === 3}
        >
          <Iconify icon="mdi:cancel" />
          Decline
        </MenuItem>
        <MenuItem
          onClick={() => handlePopoverClick(setOpenSuspend)}
          sx={{ color: 'warning.main' }}
          disabled={role.id === 3}
        >
          <Iconify icon="mdi:warning" />
          Suspend
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openDecline}
        onClose={() => setOpenDecline(false)}
        title="Decline User"
        content="Are you sure you want to decline user?"
        action={
          <Button variant="contained" color="error" onClick={() => onDecline(row.id)}>
            Decline
          </Button>
        }
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Approve User"
        content="Are you sure you want to approve user?"
        action={
          <Button variant="contained" color="success" onClick={() => onApprove(row.id)}>
            Approve
          </Button>
        }
      />

      <ConfirmDialog
        open={openSuspend}
        onClose={() => setOpenSuspend(false)}
        title="Suspend User"
        content="Are you sure you want to suspend user?"
        action={
          <Button variant="contained" color="warning" onClick={() => onSuspend(row.id)}>
            Suspend
          </Button>
        }
      />

      {openView && (
        <ViewDialog
          open={openView}
          onClose={() => setOpenView(false)}
          title="User Info"
          id={row.id}
        />
      )}
    </>
  );
}
