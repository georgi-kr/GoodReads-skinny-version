import { createAction } from '@reduxjs/toolkit';

import { AddVolumeRequest } from '../../models/profile/addVolume.request';
import { RemoveVolumeRequest } from '../../models/profile/removeVolume.request';

export const SHELVES_REQUEST = '[Profile] Shelves Request';
export const SHELVES_RESPONSE = '[Profile] Shelves Response';
export const SHELF_VOLUME_REQUEST = '[Profile] Shelf Volume Request';
export const SHELF_VOLUME_RESPONSE = '[Profile] Shelf Volume Response';
export const ADD_TO_SHELF_REQUEST = '[Profile] Add to shelf Request';
export const ADD_TO_SHELF_RESPONSE = '[Profile] Add to shelf Response';
export const REMOVE_FROM_SHELF_REQUEST = '[Profile] Remove from shelf Request';
export const REMOVE_FROM_SHELF_RESPONSE = '[Profile] Remove from shelf Response';

export const shelvesRequest = createAction<null>(SHELVES_REQUEST);
export const shelvesResponse = createAction<any>(SHELVES_RESPONSE);

export const shelfVolumeRequest = createAction<string>(SHELF_VOLUME_REQUEST);
export const shelfVolumeResponse = createAction<any>(SHELF_VOLUME_RESPONSE);

export const addToShelfRequest = createAction<AddVolumeRequest>(ADD_TO_SHELF_REQUEST);
export const addToShelfResponse = createAction<any>(ADD_TO_SHELF_RESPONSE);

export const removeFromShelfRequest = createAction<RemoveVolumeRequest>(REMOVE_FROM_SHELF_REQUEST);
export const removeFromShelfResponse = createAction<any>(REMOVE_FROM_SHELF_RESPONSE);