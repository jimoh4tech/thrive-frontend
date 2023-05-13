import { Box, CircularProgress } from '@mui/material';

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
  ) : null;

export default Loading;
