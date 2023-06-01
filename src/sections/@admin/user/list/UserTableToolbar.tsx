// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import { IQuery } from 'src/@types/query';
import { useDateRangePicker } from 'src/components/date-range-picker';
import { ChangeEventHandler, useState } from 'react';
import { Box } from '@mui/system';
import { DateRangePicker } from '@mui/lab';
import ReactLoading from 'react-loading';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  onChange: (query: IQuery) => void;
  onClearFilter: VoidFunction;
  searching: boolean;
  withDateFilter?: boolean;
  filterOptions?: {
    label?: string;
    name: string;
    options: { label: string; value: string | number }[];
  }[];
  onChangeOption?: (name: string, value: any) => void;
};

export default function UserTableToolbar({
  onChange,
  onClearFilter,
  searching,
  withDateFilter = true,
  filterOptions = [],
  onChangeOption,
}: Props) {
  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);

  const handleChangeStartDate = (newValue: Date | null) => {
    onChangeStartDate(newValue);
    onChange({ startDate: newValue || undefined });
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    onChangeEndDate(newValue);
    onChange({ endDate: newValue || undefined });
  };

  const [searchVal, setSearchVal] = useState('');
  const optionDefaults = (() => {
    const _options: any = {};
    for (let i = 0; i < filterOptions.length; i += 1) _options[filterOptions[i].name] = '';
    return _options;
  })();
  const [options, setOptions] = useState(optionDefaults);

  const onSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setSearchVal(e.target.value);
    onChange({ q: e.target.value });
  };

  const handleClearAll = () => {
    if (onResetPicker) {
      onResetPicker();
    }
    setSearchVal('');
    setOptions(optionDefaults);
    onClearFilter();
  };

  const handleChangeOption = (name: string, value: any) => {
    setOptions({ ...options, [name]: value });
    onChangeOption!(name, value);
  };

  const isFiltered =
    !!searchVal ||
    (!!startDate && !!endDate) ||
    Object.keys(options).find((_) => options[_] !== '');
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      {filterOptions?.length && onChangeOption
        ? filterOptions.map((data) => (
            <TextField
              key={`${data.name}`}
              fullWidth
              select
              label={data.label || data.name}
              value={options[data.name]}
              onChange={(e) => handleChangeOption(data.name, e.target.value)}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 260,
                    },
                  },
                },
              }}
              sx={{
                maxWidth: { sm: 240 },
                textTransform: 'capitalize',
              }}
            >
              {data.options.map((opt) => (
                <MenuItem
                  key={opt.value}
                  value={opt.value}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          ))
        : null}

      <TextField
        fullWidth
        value={searchVal}
        onChange={onSearch}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      {withDateFilter && (
        <>
          <Button
            variant="soft"
            color="inherit"
            sx={{
              textTransform: 'unset',
              color: 'text.secondary',
              width: { xs: 1, md: 'auto' },
              justifyContent: 'flex-start',
              fontWeight: 'fontWeightMedium',
              ...(isSelectedValuePicker && {
                color: 'text.primary',
              }),
            }}
            startIcon={<Iconify icon="eva:calendar-fill" />}
            onClick={onOpenPicker}
          >
            {isSelectedValuePicker ? shortLabel : 'Select Date'}

            <Box sx={{ flexGrow: 1 }} />
          </Button>

          <DateRangePicker
            variant="calendar"
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={handleChangeStartDate}
            onChangeEndDate={handleChangeEndDate}
            open={openPicker}
            onClose={onClosePicker}
            isSelected={isSelectedValuePicker}
            isError={isError}
          />
        </>
      )}

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={handleClearAll}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
      {searching && <ReactLoading type="spokes" color="grey" width={28} height={28} />}
    </Stack>
  );
}
