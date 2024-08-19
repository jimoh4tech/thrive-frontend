import { DialogProps } from '@mui/material';
import { IUserAccountGeneral } from 'src/@types/user';

export interface ViewDialogProps extends Omit<DialogProps, 'title'> {
  title: React.ReactNode;
  content?: React.ReactNode;
  user: IUserAccountGeneral;
  action: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
}
