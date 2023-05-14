import { listI } from '..';
import {
    changeCurrentCurrencyI,
    clearStateI,
    receiveConvertI,
    receiveDescrI,
    receiveListI,
    requestListI,
} from '../../interfaces';
import { TableActionType } from '../action-types';

export const changeCurrency = (currency: string): changeCurrentCurrencyI => {
    return {
        type: TableActionType.CHANGE_CURRENCY,
        currency,
    };
};

export const clearState = (): clearStateI => {
    return {
        type: TableActionType.CLEAR_STATE,
    };
};

export const requestListAC = (): requestListI => {
    return {
        type: TableActionType.REQUEST_LIST,
    };
};

export const recieveListAC = (list: listI[]): receiveListI => {
    return {
        type: TableActionType.RECEIVE_LIST,
        list,
    };
};

export const recieveDescrAC = (descrList: []): receiveDescrI => {
    return {
        type: TableActionType.RECEIVE_DESCR,
        descrList: Object.values(descrList),
    };
};

export type convertAnswerT = {
    currency_name: string;
    rate: string;
    rate_for_amount: string;
};

export const recieveConvertAC = (convertResult: convertAnswerT): receiveConvertI => {
    return {
        type: TableActionType.RECEIVE_CONVERT,
        convertResult,
    };
};
