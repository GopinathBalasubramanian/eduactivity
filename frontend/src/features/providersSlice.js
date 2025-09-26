import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchProviders = createAsyncThunk(
  'providers/fetchProviders',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Convert frontend parameter names to backend parameter names
      const backendParams = {
        q: params.q,
        category: params.category,
        subcategory: params.subcategory,
        location: params.location,
        min_rating: params.min_rating,
        max_price: params.maxPrice,
        sort: params.sort,
      };

      // Remove empty parameters
      Object.keys(backendParams).forEach(key => {
        if (backendParams[key] === '' || backendParams[key] === undefined || backendParams[key] === null) {
          delete backendParams[key];
        }
      });

      const response = await axios.get('/api/search/', { params: backendParams });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch providers');
    }
  }
);

export const fetchProviderDetail = createAsyncThunk(
  'providers/fetchProviderDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/providers/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch provider');
    }
  }
);

export const createProvider = createAsyncThunk(
  'providers/createProvider',
  async (providerData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/providers/', providerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create provider');
    }
  }
);

export const updateProvider = createAsyncThunk(
  'providers/updateProvider',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/providers/${id}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update provider');
    }
  }
);

// Providers slice
const providersSlice = createSlice({
  name: 'providers',
  initialState: {
    providers: [],
    currentProvider: null,
    loading: false,
    error: null,
    pagination: {
      count: 0,
      next: null,
      previous: null,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProvider: (state) => {
      state.currentProvider = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        };
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProviderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProvider = action.payload;
      })
      .addCase(fetchProviderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.providers.push(action.payload);
      })
      .addCase(createProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProvider.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.providers.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.providers[index] = action.payload;
        }
        if (state.currentProvider?.id === action.payload.id) {
          state.currentProvider = action.payload;
        }
      })
      .addCase(updateProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentProvider } = providersSlice.actions;
export default providersSlice.reducer;
