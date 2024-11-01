// next
// @mui
import { Autocomplete, InputAdornment } from '@mui/material';
// utils
// routes
// @types
import { IEvent } from 'src/@types/events';
// components
import { CustomTextField } from '../../../components/custom-input';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

interface IEventSearch {
  onInputChange: (searchVal: string) => void;
  onViewEvent: (event: IEvent) => void;
  searchResults?: IEvent[];
}

export default function EventSearch({ onInputChange, searchResults = [] }: IEventSearch) {
  const _onInputChange = (val: string) => {
    onInputChange(val);
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => _onInputChange(value)}
      getOptionLabel={(event: IEvent) => event.name}
      noOptionsText={null}
      // noOptionsText={<SearchNotFound query={searchVal} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      // renderOption={(props, event, { inputValue }) => {
      //   const { name, cover } = event;
      //   const matches = match(name, inputValue);
      //   const parts = parse(name, matches);

      //   return (
      //     <li {...props}>
      //       <Image
      //         alt={cover}
      //         src={cover}
      //         sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
      //       />

      //       <Link underline="none" onClick={() => onViewEvent(event)}>
      //         {parts.map((part, index) => (
      //           <Typography
      //             key={index}
      //             component="span"
      //             variant="subtitle2"
      //             color={part.highlight ? 'primary' : 'textPrimary'}
      //           >
      //             {part.text}
      //           </Typography>
      //         ))}
      //       </Link>
      //     </li>
      //   );
      // }}
    />
  );
}
