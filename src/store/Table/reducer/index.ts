import { TableActionType } from '../actions/action-types';
import { TableActionT } from '../interfaces';
import { TableStateI } from '../TableState';

const initialState: TableStateI = {
    list: [],
    currencyDescr: [],
    selectedCurrency: 'USD',
    converResult: {},
};

export const TableReducer = (state: TableStateI = initialState, action: TableActionT): TableStateI => {
    switch (action.type) {
        case TableActionType.CHANGE_CURRENCY:
            return { ...state, selectedCurrency: action.currency };
        case TableActionType.RECEIVE_DESCR:
            return { ...state, currencyDescr: action.descrList };
        case TableActionType.RECEIVE_LIST:
            return { ...state, list: action.list };
        case TableActionType.RECEIVE_CONVERT:
            return { ...state, converResult: action.convertResult };
        case TableActionType.CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
};
