import { ThunkDispatch } from 'redux-thunk';
import { RooteState } from '../../reducers';
import { TableActionT } from '../interfaces';
import { TableStateI } from '../TableState';
import { recieveConvertAC, recieveDescrAC, recieveListAC } from './action-creators';
import { TableActionType } from './action-types';

const headers = {
    headers: { 'apikey': 'jKrgvtQ7oCYXOJCzchpGqzIcNmpWnSY154NdHvQE' },
};

export interface currencyDescrI {
    symbol: string;
    code: string;
    name: string;
    symbol_native?: string;
}

export interface listI extends currencyDescrI {
    rate: number;
}

export const getList = (baseCurr: string = 'USD', descr?: currencyDescrI[]) => {
    return async (dispatch: ThunkDispatch<TableStateI, void, TableActionT>, getState: () => RooteState) => {
        dispatch({
            type: TableActionType.REQUEST_LIST,
        });

        try {
            const response = await fetch(
                `https://api.freecurrencyapi.com/v1/latest?base_currency=${baseCurr}`,
                headers
            ).then(res => res.json());
            const resultCurrWithRate: { code: string; rate: number }[] = [];
            for (let [key, value] of Object.entries(response.data)) {
                resultCurrWithRate.push({ code: key, rate: value as number });
            }
            const concatDescriptionWithRate: listI[] = [];
            if (descr) {
                descr.forEach((currWithDescr, i) => {
                    const findedCurrWithRate = resultCurrWithRate.find(
                        currWithRate => currWithDescr.code === currWithRate.code
                    );
                    concatDescriptionWithRate.push({ ...currWithDescr, rate: findedCurrWithRate?.rate as number });
                });
            }

            dispatch(recieveListAC(descr ? concatDescriptionWithRate : (resultCurrWithRate as any)));
        } catch (err) {
            console.log(`err `, err);
        }
    };
};

export const getWithDescr = () => {
    return async (dispatch: ThunkDispatch<TableStateI, void, TableActionT>, getState: () => RooteState) => {
        try {
            const response = await fetch(`https://api.freecurrencyapi.com/v1/currencies`, headers).then(res =>
                res.json()
            );
            dispatch(recieveDescrAC(response.data));
        } catch (err) {
            console.log(`err `, err);
        }
    };
};
