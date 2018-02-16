/// <reference path="./types.d.ts" />

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { accountReducer } from './account/reducers';
import { profileReducer } from './profile/reducers';
import { RootState } from './types';

export const rootReducer = combineReducers<RootState>({
    router: routerReducer,
    account: accountReducer,
    profile: profileReducer,
});