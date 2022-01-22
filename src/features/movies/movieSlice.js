import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { APIKey } from 'common/apis/MovieApiKey'
import MovieApi from 'common/apis/MovieApi'

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term) => {
    const response = await MovieApi.get(
      `?apikey=${APIKey}&s=${term}&type=movie`
    )
    return response.data
  }
)

export const fetchAsyncShows = createAsyncThunk(
  'Shows/fetchAsyncShows',
  async (term) => {
    const response = await MovieApi.get(
      `?apikey=${APIKey}&s=${term}&type=series`
    )
    return response.data
  }
)

export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
  'Shows/fetchAsyncMovieOrShowDetails',
  async (id) => {
    const response = await MovieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`)
    return response.data
  }
)

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
}
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {}
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('pending...')
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('fulfilled...')
      return { ...state, movies: payload }
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('rejected....')
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('fulfilled...')
      return { ...state, shows: payload }
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
      console.log('fulfilled...')
      return { ...state, selectedMovieOrShow: payload }
    },
  },
})

export const { removeSelectedMovieOrShow } = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow

export default movieSlice.reducer
