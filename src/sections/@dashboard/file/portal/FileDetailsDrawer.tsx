import { useState } from 'react';
// @mui
import {
  Box,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
// utils
import { IMedia } from 'src/@types/media';
import { fData } from '../../../../utils/formatNumber';
// @types
// components
import FileThumbnail, { fileFormat } from '../../../../components/file-thumbnail';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//

// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: IMedia;
  favorited?: boolean;
  //
  onCopyLink: VoidFunction;
  //
  onClose: VoidFunction;
}

export default function FileDetailsDrawer({
  item,
  open,
  favorited,
  //
  onCopyLink,
  onClose,
  ...other
}: Props) {
  const {
    name,
    metadata: { bytes: size },
    mediaUrl: url,
    format: type,
    description,
    category,
  } = item;

  const [toggleTags, setToggleTags] = useState(true);

  const [toggleProperties, setToggleProperties] = useState(true);

  const handleToggleTags = () => {
    setToggleTags(!toggleTags);
  };

  const handleToggleProperties = () => {
    setToggleProperties(!toggleProperties);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      BackdropProps={{
        invisible: true,
      }}
      PaperProps={{
        sx: { width: 320 },
      }}
      {...other}
    >
      <Scrollbar sx={{ height: 1 }}>
        <Stack spacing={2.5} justifyContent="center" sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
          <FileThumbnail
            imageView
            file={item}
            sx={{ width: 64, height: 64 }}
            imgSx={{ borderRadius: 1 }}
          />

          <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
            {name}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={1}>
            <Panel label="Tags" toggle={toggleTags} onToggle={handleToggleTags} />
          </Stack>

          <Stack spacing={1.5}>
            <Panel label="Properties" toggle={toggleProperties} onToggle={handleToggleProperties} />

            {toggleProperties && (
              <Stack spacing={1.5}>
                <Row label="Size" value={fData(size)} />

                <Row label="Category" value={category.name} />

                <Row label="Type" value={fileFormat(type)} />
              </Stack>
            )}
          </Stack>
        </Stack>
        <Box p={2.5}>
          <Typography variant="h6">Description</Typography>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: description }} />
        </Box>
      </Scrollbar>
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
