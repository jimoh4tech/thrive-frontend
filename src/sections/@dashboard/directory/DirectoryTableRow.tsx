// @mui
import { Button, Stack, TableCell, TableRow, Typography } from '@mui/material';
import Link from 'next/link';
// @types
import { IUserBusiness } from 'src/@types/business';
import { CustomAvatar } from 'src/components/custom-avatar';
// components

// ----------------------------------------------------------------------

type Props = {
  row: IUserBusiness;
};

export default function DirectoryTableRow({ row }: Props) {
  const { name, logo, email, address, slug, industry, id } = row;

  return (
    <TableRow
      hover
      // selected={selected}
    >
      {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CustomAvatar name={name} src={logo} />

          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {address}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {industry?.name}
      </TableCell>

      {/* <TableCell align="center">
          <Iconify
            icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!isVerified && { color: 'warning.main' }),
            }}
          />
        </TableCell> */}

      <TableCell align="right">
        <Button LinkComponent={Link} target="_blank" href={slug} variant="soft">
          VIEW
        </Button>
      </TableCell>
    </TableRow>
  );
}
