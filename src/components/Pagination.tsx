import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, selectTotalPages, selectCurrentPage } from '../features/companies/companiesSlice';
import { Pagination as MuiPagination, Box } from '@mui/material';
import { AppDispatch } from '../store';

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        sx={{ '& .MuiPaginationItem-root': { borderRadius: '8px' } }}
        aria-label="Pagination navigation"
      />
    </Box>
  );
};

export default Pagination;