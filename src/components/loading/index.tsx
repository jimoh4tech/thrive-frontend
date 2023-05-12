import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = ({ open = false }: { open: boolean }) =>
  open ? (
    <Box
      sx={{
        color: '#fff',
        bgcolor: '#00000050',
        position: 'absolute',
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
      // open
      // onClick={handleClose}
    >
      <CircularProgress
        color="inherit"
        sx={{ position: 'absolute', my: 'auto', top: 0, bottom: 0 }}
      />
    </Box>
  ) : (
    <></>
  );

export default Loading;
