import { useRef, useState } from 'react';
// @mui
import { Box, Collapse } from '@mui/material';
// @types
// components
import { IMedia } from 'src/@types/media';
//
import FilePanel from '../FilePanel';
import FileCard from '../item/FileCard';

// ----------------------------------------------------------------------

type Props = {
  data: IMedia[];
  dataFiltered: IMedia[];
};

export default function FileGridView({ data, dataFiltered }: Props) {
  const containerRef = useRef(null);

  const [collapseFiles, setCollapseFiles] = useState(false);

  return (
    <Box ref={containerRef}>
      <FilePanel title="Files" />

      <Collapse in={!collapseFiles} unmountOnExit>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={3}
        >
          {dataFiltered
            .filter((i) => i.format !== 'folder')
            .map((file) => (
              <FileCard key={file.id} file={file} sx={{ maxWidth: 'auto' }} />
            ))}
        </Box>
      </Collapse>
    </Box>
  );
}
