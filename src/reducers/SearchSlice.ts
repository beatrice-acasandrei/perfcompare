import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchRecentRevisions,
  fetchRevisionByID,
  fetchRevisionsByAuthor,
} from '../thunks/searchThunk';
import type {
  Repository,
  RevisionsList,
  SearchStateForInput,
  InputType,
} from '../types/state';

const DEFAULT_VALUES: SearchStateForInput = {
  repository: 'try',
  searchResults: [],
  searchValue: '',
  inputError: false,
  inputHelperText: '',
  checkedRevisions: [],
};

const initialStateFramework = {
  id: 1,
  name: 'talos',
};

const initialState = {
  base: DEFAULT_VALUES,
  new: DEFAULT_VALUES,
  framework: initialStateFramework,
};

const searchCompareWithBase = createSlice({
  name: 'searchCompareWithBase',
  initialState,
  reducers: {
    updateSearchValue(
      state,
      action: PayloadAction<{
        search: string;
        searchType: InputType;
      }>,
    ) {
      const type = action.payload.searchType;
      state[type].searchValue = action.payload.search;
    },
    //rename payload to more informative names
    updateSearchResults(
      state,
      action: PayloadAction<{
        results: RevisionsList[];
        searchType: InputType;
      }>,
    ) {
      const type = action.payload.searchType;
      state[type].searchResults = action.payload.results;
      state[type].inputError = false;
      state[type].inputHelperText = '';
    },

    updateRepository(
      state,
      action: PayloadAction<{
        repository: Repository['name'];
        searchType: InputType;
      }>,
    ) {
      const type = action.payload.searchType;
      state[type].repository = action.payload.repository;
    },

    updateFramework(
      state,
      action: PayloadAction<{
        id: number;
        name: string;
      }>,
    ) {
      state.framework.id = action.payload.id;
      state.framework.name = action.payload.name;
    },

    updateCheckedRevisions(
      state,
      action: PayloadAction<{
        newChecked: RevisionsList[];
        searchType: InputType;
      }>,
    ) {
      const type = action.payload.searchType;
      state[type].checkedRevisions = action.payload.newChecked;
    },

    clearCheckedRevisions(state) {
      state.base.checkedRevisions = initialState.base.checkedRevisions;
      state.new.checkedRevisions = initialState.new.checkedRevisions;
    },

    clearCheckedRevisionforType(
      state,
      action: PayloadAction<{
        searchType: InputType;
      }>,
    ) {
      const type = action.payload.searchType;
      state[type].checkedRevisions = initialState[type].checkedRevisions;
    },

    setCheckedRevisionsForEdit(
      state,
      action: PayloadAction<{
        revisions: RevisionsList[];
        searchType: InputType;
      }>,
    ) {
      const type = action.payload.searchType;
      state[type].checkedRevisions = action.payload.revisions;
    },

    setInputError(
      state,
      action: PayloadAction<{
        errorMessage: string;
        searchType: InputType;
      }>,
    ) {
      const type = action.payload.searchType;
      state[type].inputError = true;
      state[type].inputHelperText = action.payload.errorMessage;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentRevisions.fulfilled, (state, action) => {
        const type = action.meta.arg.searchType;
        state[type].searchResults = action.payload;
      })
      .addCase(fetchRecentRevisions.rejected, (state, action) => {
        const type = action.meta.arg.searchType;
        state[type].inputError = true;

        state[type].inputHelperText = action.payload
          ? action.payload
          : 'An error has occurred';
      })
      // fetchRevisionByID
      .addCase(fetchRevisionByID.fulfilled, (state, action) => {
        const type = action.meta.arg.searchType;
        state[type].searchResults = action.payload;
      })
      .addCase(fetchRevisionByID.rejected, (state, action) => {
        const type = action.meta.arg.searchType;
        state[type].inputError = true;
        state[type].inputHelperText = action.payload
          ? action.payload
          : 'An error has occurred';
      })
      // fetchRevisionsByAuthor
      .addCase(fetchRevisionsByAuthor.fulfilled, (state, action) => {
        const type = action.meta.arg.searchType;
        state[type].searchResults = action.payload;
      })
      .addCase(fetchRevisionsByAuthor.rejected, (state, action) => {
        const type = action.meta.arg.searchType;
        state[type].inputError = true;
        state[type].inputHelperText = action.payload
          ? action.payload
          : 'An error has occurred';
      });
  },
});

export const {
  updateSearchValue,
  updateSearchResults,
  updateRepository,
  updateCheckedRevisions,
  clearCheckedRevisions,
  clearCheckedRevisionforType,
  setInputError,
  setCheckedRevisionsForEdit,
  updateFramework,
} = searchCompareWithBase.actions;
export default searchCompareWithBase.reducer;
