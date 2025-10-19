import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, selectCompaniesStatus, selectFilteredCompanies } from '../features/companies/companiesSlice';
import CompanyCard from './CompanyCard';
import Filters from './Filters';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import Pagination from './Pagination';
import Header from './Header';
import { Container, Grid, Typography, Fade } from '@mui/material';
import { AppDispatch } from '../store';
import { Status } from '../features/companies/types';

const CompaniesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectCompaniesStatus);
  const companies = useSelector(selectFilteredCompanies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <Fade in={true} timeout={800}>
        <div>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Companies Directory
          </Typography>
          <Filters />
          {status === Status.Loading && <LoadingSpinner />}
          {status === Status.Failed && <ErrorMessage message="Failed to load companies. Please try again." />}
          {status === Status.Succeeded && (
            <Fade in={true} timeout={500}>
              <div>
                <Grid container={true} spacing={3}>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={company.id}>
                        <CompanyCard company={company} />
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1" align="center" sx={{ width: '100%', py: 4, color: 'text.secondary' }}>
                      No companies found.
                    </Typography>
                  )}
                </Grid>
                <Pagination />
              </div>
            </Fade>
          )}
        </div>
      </Fade>
    </Container>
  );
};

export default CompaniesList;