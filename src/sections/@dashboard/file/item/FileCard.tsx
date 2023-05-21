import { useState } from 'react';
// @mui
import { Box, Card, CardProps, IconButton, MenuItem, Stack } from '@mui/material';
// @ts-ignore
import { saveAs } from 'file-saver';
// hooks
import { IMedia } from 'src/@types/media';
import { fDateTime } from 'src/utils/formatTime';
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
}

export default function FileCard({ file, sx, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleShowCheckbox = () => {
    setShowCheckbox(true);
  };

  const handleHideCheckbox = () => {
    setShowCheckbox(false);
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
            saveAs(file.mediaUrl);
          }}
        >
          <Iconify icon="eva:arrow-circle-down-fill" color="primary.light" />
          Download
        </MenuItem>
      </MenuPopover>

      <FileDetailsDrawer
        item={file}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
      />
    </>
  );
}
