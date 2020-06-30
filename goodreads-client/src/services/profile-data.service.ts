import { ajax } from "rxjs/ajax"
import { ENVIROMENT } from '../config/enviroment'

export const getShelves = (token: string) => {
  return ajax.get(
    `${ENVIROMENT.BASE_URL}mylibrary/bookshelves?key=${ENVIROMENT.API_KEY}`,
    {
      Authorization: `Bearer ` + token,
    }
  )
}

export const getShelfVolume = (shelfId: number, token: string) => {
  return ajax.get(
    `${ENVIROMENT.BASE_URL}mylibrary/bookshelves/${shelfId}/volumes?key=${ENVIROMENT.API_KEY}`,
    {
      Authorization: `Bearer ` + token,
    }
  )
}

export const addVolumeToShelf = (volumeId: string, shelfId: number, token: string) => {
  return ajax.post(
    `${ENVIROMENT.BASE_URL}mylibrary/bookshelves/${shelfId}/addVolume?volumeId=${volumeId}&key=${ENVIROMENT.API_KEY}`,
    {},
    {
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json'
    }
  )
}

export const removeVolumeFromShelf = (volumeId: string, shelfId: number, token: string) => {
  return ajax.post(
    `${ENVIROMENT.BASE_URL}mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${volumeId}&key=${ENVIROMENT.API_KEY}`,
    {},
    {
      Authorization: `Bearer ` + token,
      'Content-Type': 'application/json'
    }
  )
}