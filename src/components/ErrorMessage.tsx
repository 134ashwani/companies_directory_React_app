import React from 'react';
import { Alert, Fade } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Fade in={true} timeout={500}>
      <Alert severity="error" sx={{ my: 4, borderRadius: '8px', maxWidth: '600px', mx: 'auto' }} role="alert">
        {message}
      </Alert>
    </Fade>
  );
};

export default ErrorMessage;