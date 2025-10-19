import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { Company } from '../features/companies/types';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card sx={{ p: 1 }} role="article" aria-labelledby={`company-${company.id}`}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" id={`company-${company.id}`} sx={{ fontWeight: 600 }}>
            {company.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {company.location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {company.industry}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(CompanyCard);