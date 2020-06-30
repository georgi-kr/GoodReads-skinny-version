import { combineEpics } from 'redux-observable';
import authEpics from './auth.epic';
import booksEpics from './books.epic';
import profileEpic from './profile.epic';

export const rootEpic = combineEpics(
  ...authEpics,
  ...booksEpics,
  ...profileEpic
);