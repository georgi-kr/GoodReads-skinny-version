import { createReducer } from '@reduxjs/toolkit'
import {
  shelvesRequest,
  shelvesResponse,
  shelfVolumeRequest,
  shelfVolumeResponse,
  addToShelfRequest,
  addToShelfResponse,
  removeFromShelfRequest,
  removeFromShelfResponse
} from '../actions/profile.action';
import { Shelf } from '../../models/profile/shelves.response';

export type ProfileState = {
  loading: boolean;
  errors: any[];
  bookShelves: { [key: string]: Shelf };
}

const initialState: ProfileState = {
  loading: false,
  errors: null,
  bookShelves: null
};

export const profileReducer = createReducer<ProfileState>(initialState, builder =>
  builder
    .addCase(shelvesRequest, (state, action) => {
      return {
        ...state,
        loading: true,
      }
    })
    .addCase(shelvesResponse, (state, action) => {
      return {
        ...state,
        loading: false,
        errors: action.payload.errors ? action.payload.errors : null,
        bookShelves: action.payload.result
      }
    })
    .addCase(shelfVolumeRequest, (state, action) => {
      return {
        ...state,
        loading: true,
      }
    })
    .addCase(shelfVolumeResponse, (state, action) => {
      const { id, bookList } = action.payload.result
      return {
        ...state,
        loading: false,
        errors: action.payload.errors ? action.payload.errors : null,
        bookShelves: {
          ...state.bookShelves,
          [id]: {
            ...state.bookShelves[id],
            volume: bookList,
          }
        }
      }
    })
    .addCase(addToShelfRequest, (state, acton) => {
      return {
        ...state,
        loading: true,
      }
    })
    .addCase(addToShelfResponse, (state, action) => {
      const { shelf, volume } = action.payload;
      return {
        ...state,
        loading: false,
        errors: action.payload.errors ? action.payload.errors : null,
        bookShelves: {
          ...state.bookShelves,
          [shelf]: {
            ...state.bookShelves[shelf],
            volume: [...state.bookShelves[shelf].volume, volume],
          }
        }
      }
    })
    .addCase(removeFromShelfRequest, (state, action) => {
      return {
        ...state,
        loading: true,
        errors: null,
      }
    })
    .addCase(removeFromShelfResponse, (state, action) => {
      const shelf = action.payload.shelf.title;
      const index = action.payload.index;
      const volumes = state.bookShelves[shelf].volume;
      return {
        ...state,
        loading: false,
        errors: action.payload.errors ? action.payload.errors : null,
        bookShelves: {
          ...state.bookShelves,
          [shelf]: {
            ...state.bookShelves[shelf],
            volume: [
              ...volumes.slice(0, index),
              ...volumes.slice(
                index + 1, volumes.length
              )]
          }
        }
      }
    })

);