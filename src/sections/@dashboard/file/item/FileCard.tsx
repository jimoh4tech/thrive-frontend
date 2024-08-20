import { useState } from 'react';
// @mui
import { Box, Button, Card, CardProps, IconButton, MenuItem, Stack } from '@mui/material';
// @ts-ignore
import { saveAs } from 'file-saver';
// hooks
import { IMedia } from 'src/@types/media';
import { fDateTime } from 'src/utils/formatTime';
import ConfirmDialog from 'src/components/confirm-dialog';
import { useAuthContext } from 'src/auth/useAuthContext';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
// utils
import { fData } from '../../../../utils/formatNumber';
// @types
// components
import FileThumbnail from '../../../../components/file-thumbnail';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { useSnackbar } from '../../../../components/snackbar';
import TextMaxLine from '../../../../components/text-max-line';
//
import FileDetailsDrawer from '../portal/FileDetailsDrawer';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  file: IMedia;
  onDelete: (id: number) => void;
}

export default function FileCard({ file, sx, onDelete, ...other }: Props) {
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleShowCheckbox = () => {
    setShowCheckbox(true);
  };

  const handleHideCheckbox = () => {
    setShowCheckbox(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleCopy = () => {
    enqueueSnackbar('Copied!');
    copy(file.mediaUrl);
  };

  return (
    <>
      <Card
        onMouseEnter={handleShowCheckbox}
        onMouseLeave={handleHideCheckbox}
        sx={{
          p: 2.5,
          width: 1,
          maxWidth: 222,
          boxShadow: 0,
          bgcolor: 'background.default',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          ...(showCheckbox && {
            borderColor: 'transparent',
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        {...other}
      >
        <FileThumbnail file={file} sx={{ width: 40, height: 40 }} />

        <TextMaxLine variant="subtitle2" persistent onClick={handleOpenDetails} sx={{ mt: 2 }}>
          {file.name}
        </TextMaxLine>

        <Stack spacing={0.75} sx={{ typography: 'caption', color: 'text.disabled' }}>
          <Stack direction="row" justifyContent="space-between">
            <span>{file.category.name}</span>
            <span>{fDateTime(file.updatedAt)} </span>
          </Stack>
          <Box> {fData(file.metadata.bytes)} </Box>

          <Box sx={{ width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }} />

          {/* <Box> {fDateTime(file.dateModified)} </Box> */}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
          {/* <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          /> */}

          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleClosePopover();
            saveAs(file.mediaUrl, file.name);
          }}
        >
          <Iconify icon="eva:arrow-circle-down-fill" color="primary.light" />
          Download
        </MenuItem>

        {user.role.id === 3 && (
          <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
        )}
      </MenuPopover>

      <FileDetailsDrawer
        item={file}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={() => onDelete(file.id)}>
            Delete
          </Button>
        }
      />
    </>
  );
}
