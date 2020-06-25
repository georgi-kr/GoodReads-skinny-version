import { combineEpics } from 'redux-observable';
import authEpics from './auth.epic';
import booksEpics from './books.epic';

// To add all Epics here
export const rootEpic = combineEpics(
  ...authEpics,
  ...booksEpics
);