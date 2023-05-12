import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
//
import React from 'react';
import { UploadProps } from '../upload/types';
//

// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

export default function UploadButton({
  error,
  file,
  disabled,
  helperText,
  sx,
  uploadText,
  render,
  ...other
}: UploadProps & { render?: React.ReactNode }) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    disabled,
    ...other,
  });

  return (
    <>
      <StyledDropZone {...getRootProps()}>
        <input {...getInputProps()} />

        {render}
      </StyledDropZone>

      {helperText && helperText}
    </>
  );
}
