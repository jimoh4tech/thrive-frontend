import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';

export default function VirtualModal({ setCheck }: { setCheck: (val: boolean) => void }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    setOpen(false);
    setCheck(true);
  };
  const handleDisagree = () => {
    setOpen(false);
    setCheck(false);
  };

  return (
    <>
      <Link variant="caption" onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
        By agreeing to these terms, you acknowledge and understand the conditions of using THRIVE’s
        virtual office feature. Misuse of this service may result in the suspension or permanent
        discontinuation of access.
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Virtual Office Disclaimer and Agreement</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="caption">
            Before using the THRIVE virtual office feature, users are required to agree to the
            following terms and conditions: <br />
            1. The virtual office feature is only available to users with an active subscription to
            the THRIVE platform. Users in the 30-day trial period will not have access to this
            feature unless they subscribe to the service. <br />
            2. THRIVE reserves the right to terminate access to the virtual office feature if a user
            is found to be conducting illegal, unauthorized, or unethical activities using our
            address. Users are required to ensure that the service is used for lawful purposes in
            compliance with all applicable regulations. <br />
            3. The virtual office is strictly for virtual correspondence and does not allow for any
            physical business activities to be conducted at the provided address. <br />
            4. Users are required to designate a specific individual as the Contact Person for the
            virtual office service. This individual will be responsible for managing any
            correspondence or inquiries related to the virtual office. <br />
            5. THRIVE shall not be held liable for any losses, damages, or claims arising from the
            misuse of the virtual office address or non-compliance with this agreement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
