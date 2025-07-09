import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

export const CustomButton = ({ loading, children, className, ...props }: CustomButtonProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      className={className}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};
