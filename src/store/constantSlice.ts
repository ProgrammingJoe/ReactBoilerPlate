import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SchoolsAPI from 'plugins/schoolsAPI'
import { HighSchoolCategories } from 'types'

export const fetchConstants = createAsyncThunk(
  'constants/fetch',
  async (_) => {
    const response = await SchoolsAPI.get('constants')
    return response.data
  }
)

interface Constants {
  schoolCategories: HighSchoolCategories
}

export interface ConstantsState {
  value: Constants
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ConstantsState = {
  value: {
    schoolCategories: {
      options: []
    }
  },
  loading: 'idle'
}

const constantsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConstants.fulfilled, (state, action) => {
      state.value = action.payload
    })
  }
})

export default constantsSlice.reducer
