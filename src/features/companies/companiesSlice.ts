import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Company, CompaniesState, Status } from './types';
import { fetchCompaniesFromApi } from '../../services/api';

const initialState: CompaniesState = {
  companies: [],
  filteredCompanies: [],
  filters: { name: '', location: '', industry: '' },
  sort: 'asc',
  status: Status.Idle,
  error: null,
  currentPage: 1,
  itemsPerPage: 6, // Adjustable for production
};

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
  return await fetchCompaniesFromApi();
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<{ name?: string; location?: string; industry?: string }>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredCompanies = applyFiltersAndSort(state.companies, state.filters, state.sort);
      state.currentPage = 1; // Reset to first page on filter change
    },
    setSort: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sort = action.payload;
      state.filteredCompanies = applyFiltersAndSort(state.companies, state.filters, state.sort);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.filteredCompanies = applyFiltersAndSort(state.companies, state.filters, state.sort);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<Company[]>) => {
        state.status = Status.Succeeded;
        state.companies = action.payload;
        state.filteredCompanies = applyFiltersAndSort(action.payload, state.filters, state.sort);
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

function applyFiltersAndSort(companies: Company[], filters: CompaniesState['filters'], sort: 'asc' | 'desc'): Company[] {
  let filtered = companies.filter((company) => {
    const nameMatch = company.name.toLowerCase().includes(filters.name.toLowerCase());
    const locationMatch = !filters.location || company.location === filters.location;
    const industryMatch = !filters.industry || company.industry === filters.industry;
    return nameMatch && locationMatch && industryMatch;
  });

  filtered.sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sort === 'asc' ? comparison : -comparison;
  });

  return filtered;
}

export const { setFilters, setSort, setCurrentPage } = companiesSlice.actions;

export const selectCompanies = (state: RootState) => state.companies.companies;
export const selectFilteredCompanies = (state: RootState) => {
  const { filteredCompanies, currentPage, itemsPerPage } = state.companies;
  const start = (currentPage - 1) * itemsPerPage;
  return filteredCompanies.slice(start, start + itemsPerPage);
};
export const selectCompaniesStatus = (state: RootState) => state.companies.status;
export const selectTotalPages = (state: RootState) => Math.ceil(state.companies.filteredCompanies.length / state.companies.itemsPerPage);
export const selectCurrentPage = (state: RootState) => state.companies.currentPage;
export const selectUniqueLocations = (state: RootState) => Array.from(new Set(state.companies.companies.map(c => c.location)));
export const selectUniqueIndustries = (state: RootState) => Array.from(new Set(state.companies.companies.map(c => c.industry)));
export const selectFilters = (state: RootState) => state.companies.filters;
export const selectSort = (state: RootState) => state.companies.sort;

export default companiesSlice.reducer;