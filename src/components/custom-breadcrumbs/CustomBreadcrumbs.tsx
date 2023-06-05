// @mui
import { Box, Breadcrumbs, Button, Link, Stack, Typography } from '@mui/material';
//
import { yupResolver } from '@hookform/resolvers/yup';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IEndpoints, creator } from 'src/actions';
import * as Yup from 'yup';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';
import { RHFTextField } from '../hook-form';
import FormProvider from '../hook-form/FormProvider';
import LinkItem from './LinkItem';
import { CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------
interface IAction {
  title: string;
  endpoint: IEndpoints;
  cb: VoidFunction;
}
// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  sx,
  actions = [],
  ...other
}: CustomBreadcrumbsProps & { actions?: IAction[] }) {
  const [action_, setAction] = useState<IAction | null>(null);

  const lastLink = links[links.length - 1].name;

  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography color="primary" variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {actions.map((axn, i) => (
          <Button
            key={i}
            variant="soft"
            color="success"
            startIcon={<Add />}
            children={axn.title}
            sx={{ textTransform: 'capitalize', mx: 1 }}
            onClick={() => setAction(axn)}
          />
        ))}
        {/* {!user?.platinumSub.length && user?.role.id < 3 && (
          <Button variant="soft" startIcon={<Iconify icon="material-symbols:bolt-rounded" />}>
            Upgrade to Platinum
          </Button>
        )} */}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}

      {action_ && <Action onClose={() => setAction(null)} action={action_} />}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }}
    />
  );
}

type FormValuesProps = {
  name: string;
  afterSubmit?: string;
};
function Action({ onClose, action }: { action: IAction; onClose: VoidFunction }) {
  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Schema),
    defaultValues: { name: '' },
  });

  const {
    formState: { isSubmitting },
    reset,
    handleSubmit,
  } = methods;

  const { title, endpoint, cb } = action;
  const onSubmit = async (data: FormValuesProps) => {
    try {
      await creator(endpoint, data);
      enqueueSnackbar(`New ${title} created`);
      reset();
    } catch (error) {
      enqueueSnackbar(error.message || error, { variant: 'error' });
    }
  };

  const handleClose = () => {
    cb();
    onClose();
  };

  return (
    <ConfirmDialog
      open={action !== null}
      onClose={handleClose}
      title={`Add New ${title}`}
      content={
        <FormProvider methods={methods}>
          <RHFTextField name="name" label={`${title} name`} sx={{ mt: 2 }} />
        </FormProvider>
      }
      action={
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          color="success"
          onClick={handleSubmit(onSubmit)}
        >
          Create
        </LoadingButton>
      }
    />
  );
}
