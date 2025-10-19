import React from 'react';
import { CircularProgress, Box, Fade } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <Fade in={true} timeout={500}>
      <Box display="flex" justifyContent="center" alignItems="center" my={4} minHeight="200px">
        <CircularProgress size={48} aria-label="Loading companies" />
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;