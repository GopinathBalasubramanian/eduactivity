import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const searchProviders = createAsyncThunk(
  'search/searchProviders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/search/', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Search failed');
    }
  }
);

// Search slice
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
    filters: {
      category: '',
      subcategory: '',
      location: '',
      radius: 10,
      minRating: 0,
      maxPrice: '',
      sort: 'relevance',
    },
    pagination: {
      count: 0,
      next: null,
      previous: null,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        subcategory: '',
        location: '',
        radius: 10,
        minRating: 0,
        maxPrice: '',
        sort: 'relevance',
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        };
      })
      .addCase(searchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError } = searchSlice.actions;
export default searchSlice.reducer;
