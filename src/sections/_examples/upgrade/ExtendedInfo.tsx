import { Button, Dialog, DialogContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { EmailInboxIcon } from 'src/assets/icons';
import { ConfirmDialogProps } from 'src/components/confirm-dialog/types';

const ExtendedInfo = ({ title, content, action, open, onClose, ...other }: ConfirmDialogProps) => (
  <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
    {content && (
      <DialogContent sx={{ typography: 'body2' }}>
        <Stack spacing={2}>
          <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

          <Typography variant="h3" paragraph>
            Upgrade to an Extended License
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            You’ve clicked on a premium feature, please upgrade your license to get access to all
            disabled features. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </Typography>
          {content}

          <Button variant="contained" fullWidth>
            Upgrade Now
          </Button>
        </Stack>
      </DialogContent>
    )}
  </Dialog>
);

export default ExtendedInfo;
