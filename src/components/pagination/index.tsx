import { Divider, Pagination as Pag } from '@mui/material';
import { Stack, SxProps, Theme } from '@mui/system';
import React from 'react';
import ReactLoading from 'react-loading';

interface Props {
  totalPages: number;
  currentPage: number;
  loading?: boolean;
  withDivider?: boolean;
  onChange: (paheNum: number) => void;
  sx?: SxProps<Theme>;
}
const Pagination = ({ totalPages, currentPage, loading, onChange, withDivider, sx }: Props) =>
  totalPages ? (
    <>
      {withDivider && <Divider sx={{ my: 1 }} />}
      <Stack direction="row" justifyContent="center" my={3} sx={sx}>
        <Pag
          count={Math.ceil(totalPages)}
          onChange={(e, num) => onChange(num)}
          page={currentPage}
        />
        {loading && <ReactLoading type="spokes" color="grey" width={25} />}
      </Stack>
    </>
  ) : null;

export default Pagination;
