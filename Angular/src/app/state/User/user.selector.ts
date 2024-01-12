import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// Create a feature selector to select the auth state
export const selectUserState = createFeatureSelector<UserState>('auth');

// Create a selector to get the user profile
export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) => state.userProfile
);
