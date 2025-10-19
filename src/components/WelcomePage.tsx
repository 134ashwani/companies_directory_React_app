import React from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
        role="main"
        aria-label="Welcome to Companies Directory"
      >
        <BusinessIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
          Welcome to the Companies Directory
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, color: 'text.secondary' }}>
          Discover and explore a curated list of companies with powerful filtering and sorting capabilities. Built by Frontlines Media.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/companies')}
          sx={{ borderRadius: '8px', px: 4, py: 1.5 }}
          aria-label="Explore the companies directory"
        >
          Explore Companies
        </Button>
      </Box>
    </Fade>
  );
};

export default WelcomePage;