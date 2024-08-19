import { DialogProps } from '@mui/material';

export interface ViewDialogProps extends Omit<DialogProps, 'title' | 'id'> {
  title: React.ReactNode;
  id: number;
  content?: React.ReactNode;
  action?: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
}
