import { currencyDescrI } from './actions';
import { convertAnswerT } from './actions/action-creators';

export interface TableStateI {
    list: any[];
    currencyDescr: currencyDescrI[];
    selectedCurrency: string;
    converResult: convertAnswerT | {};
}
