import { combineReducers, Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TableReducer } from './Table/reducer';
import { TableStateI } from './Table/TableState';

export type RooteState = {
    TableState: TableStateI;
};

export const reducers = combineReducers({
    TableState: TableReducer,
});

export type RootStore = ReturnType<typeof reducers>;

export type DispatchType = Dispatch<Action> & ThunkDispatch<RootStore, any, Action>;
