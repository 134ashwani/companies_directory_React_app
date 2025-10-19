export interface Company {
  id: number;
  name: string;
  location: string;
  industry: string;
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface CompaniesState {
  companies: Company[];
  filteredCompanies: Company[];
  filters: {
    name: string;
    location: string;
    industry: string;
  };
  sort: 'asc' | 'desc';
  status: Status;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}