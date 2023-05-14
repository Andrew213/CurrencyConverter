import { listI } from '../actions';
import { convertAnswerT } from '../actions/action-creators';
import { TableActionType } from '../actions/action-types';

export interface changeCurrentCurrencyI {
    type: TableActionType.CHANGE_CURRENCY;
    currency: string;
}

export interface requestListI {
    type: TableActionType.REQUEST_LIST;
}

export interface receiveListI {
    type: TableActionType.RECEIVE_LIST;
    list: listI[];
}
export interface requestDescrI {
    type: TableActionType.REQUEST_DESCR;
}

export interface receiveDescrI {
    type: TableActionType.RECEIVE_DESCR;
    descrList: any[];
}
export interface receiveConvertI {
    type: TableActionType.RECEIVE_CONVERT;
    convertResult: convertAnswerT;
}

export interface clearStateI {
    type: TableActionType.CLEAR_STATE;
}
export type TableActionT =
    | changeCurrentCurrencyI
    | requestListI
    | receiveListI
    | requestDescrI
    | receiveDescrI
    | receiveConvertI
    | clearStateI;
