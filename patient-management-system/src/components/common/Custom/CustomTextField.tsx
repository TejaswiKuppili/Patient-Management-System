import { TextField, TextFieldProps } from '@mui/material';

export const CustomTextField = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
};
