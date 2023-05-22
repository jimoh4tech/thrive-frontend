import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { ChangeEventHandler, useState } from 'react';
import ReactLoading from 'react-loading';
import { IQuery } from 'src/@types/query';
import { useDateRangePicker } from '../date-range-picker';
import DateRangePicker from '../date-range-picker/DateRangePicker';
import Iconify from '../iconify/Iconify';

interface Props {
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
}

const SearchBar = ({
  onChange,
  onClearFilter,
  searching,
  withDateFilter = true,
  filterOptions = [],
  onChangeOption,
}: Props) => {
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
      spacing={1}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ md: 'center' }}
      sx={{ width: 1, mb: 5 }}
    >
      <TextField
        size="small"
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

      {filterOptions?.length && onChangeOption
        ? filterOptions.map((data) => (
            <FormControl size="small" sx={{ minWidth: 150 }} key={`${data.name}`}>
              <InputLabel id="demo-select-small-label">{data.label || data.name}</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                sx={{ bgcolor: '#f9f9f9' }}
                value={options[data.name]}
                label={data.name}
                onChange={(e) => handleChangeOption(data.name, e.target.value)}
              >
                {data.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))
        : null}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
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
            variant="soft"
            color="error"
            onClick={handleClearAll}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Clear
          </Button>
        )}
        {searching && <ReactLoading type="spokes" color="grey" width={28} height={28} />}
      </Stack>
    </Stack>
  );
};

export default SearchBar;
