// src/components/ui/CustomContainer.tsx
import { Container, ContainerProps } from '@mui/material';

interface CustomContainerProps extends ContainerProps {}

export const CustomContainer = ({ children, ...props }: CustomContainerProps) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: '#f5fdfc',
        padding: 4,
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        mt: 8,
        ...props.sx, // allow overrides
      }}
      {...props}
    >
      {children}
    </Container>
  );
};
