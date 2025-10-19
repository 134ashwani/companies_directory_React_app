import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4, bgcolor: 'background.paper' }}>
      <Toolbar>
        <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Frontlines Media
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;