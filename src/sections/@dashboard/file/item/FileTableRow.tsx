import { useState } from 'react';
// @mui
import {
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// @ts-ignore
import { saveAs } from 'file-saver';
// hooks
import { IMedia } from 'src/@types/media';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
import useDoubleClick from '../../../../hooks/useDoubleClick';
// utils
import { fData } from '../../../../utils/formatNumber';
import { fDate } from '../../../../utils/formatTime';
// @types
// components
import FileThumbnail from '../../../../components/file-thumbnail';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { useSnackbar } from '../../../../components/snackbar';
//
import FileDetailsDrawer from '../portal/FileDetailsDrawer';

// ----------------------------------------------------------------------

type Props = {
  row: IMedia;
};

export default function FileTableRow({ row }: Props) {
  const {
    name,
    metadata: { bytes: size },
    format: type,
    updatedAt: dateModified,
  } = row;

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const [openDetails, setOpenDetails] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

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

  const handleClick = useDoubleClick({
    click: () => {
      handleOpenDetails();
    },
    doubleClick: () => console.log('DOUBLE CLICK'),
  });

  const handleCopy = () => {
    enqueueSnackbar('Copied!');
    copy(row.mediaUrl);
  };

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 1,
          '& .MuiTableCell-root': {
            bgcolor: 'background.default',
          },
          ...(openDetails && {
            '& .MuiTableCell-root': {
              color: 'text.primary',
              typography: 'subtitle2',
              bgcolor: 'background.default',
            },
          }),
        }}
      >
        <TableCell onClick={handleClick}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FileThumbnail file={row} />

            <Typography noWrap variant="inherit" sx={{ maxWidth: 360, cursor: 'pointer' }}>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell
          align="left"
          onClick={handleClick}
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {fData(size)}
        </TableCell>

        <TableCell
          align="center"
          onClick={handleClick}
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {type}
        </TableCell>

        <TableCell
          align="left"
          onClick={handleClick}
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {fDate(dateModified)}
        </TableCell>
        <TableCell
          align="right"
          sx={{
            whiteSpace: 'nowrap',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow="right-top"
          sx={{ width: 160 }}
        >
          <MenuItem
            onClick={() => {
              handleClosePopover();
              saveAs(row.mediaUrl);
            }}
          >
            <Iconify icon="eva:arrow-circle-down-fill" color="primary.light" />
            Download
          </MenuItem>
        </MenuPopover>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>

      <FileDetailsDrawer
        item={row}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
      />
    </>
  );
}
