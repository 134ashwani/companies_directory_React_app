import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setSort, selectUniqueLocations, selectUniqueIndustries, selectFilters, selectSort } from '../features/companies/companiesSlice';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import { AppDispatch } from '../store';

const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(selectUniqueLocations);
  const industries = useSelector(selectUniqueIndustries);
  const filters = useSelector(selectFilters);
  const sort = useSelector(selectSort);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ name: e.target.value }));
  };

  const handleLocationChange = (e: { target: { value: string } }) => {
    dispatch(setFilters({ location: e.target.value }));
  };

  const handleIndustryChange = (e: { target: { value: string } }) => {
    dispatch(setFilters({ industry: e.target.value }));
  };

  const handleSortChange = () => {
    dispatch(setSort(sort === 'asc' ? 'desc' : 'asc'));
  };

  const handleReset = () => {
    dispatch(setFilters({ name: '', location: '', industry: '' }));
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: '12px', mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <Grid container={true} spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={filters.name}
            onChange={handleNameChange}
            InputProps={{ 'aria-label': 'Search companies by name' }}
            sx={{ transition: 'all 0.2s' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={filters.location}
              onChange={handleLocationChange}
              label="Location"
              aria-label="Filter by location"
            >
              <MenuItem value="">All Locations</MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Industry</InputLabel>
            <Select
              value={filters.industry}
              onChange={handleIndustryChange}
              label="Industry"
              aria-label="Filter by industry"
            >
              <MenuItem value="">All Industries</MenuItem>
              {industries.map((ind) => (
                <MenuItem key={ind} value={ind}>
                  {ind}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }} container={true} spacing={1}>
          <Grid size={{ xs: 6 }}>
            <Button
              variant="contained"
              onClick={handleSortChange}
              fullWidth
              aria-label={`Sort companies ${sort === 'asc' ? 'descending' : 'ascending'}`}
            >
              Sort {sort === 'asc' ? '↓' : '↑'}
            </Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button
              variant="outlined"
              onClick={handleReset}
              fullWidth
              aria-label="Reset all filters"
              color="secondary"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;