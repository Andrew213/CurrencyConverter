import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import useAction from '../../../hooks/useAction';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const CurrencySelect: React.FC = () => {
    const [data, setData] = useState<DefaultOptionType[]>([]);
    const [loading, setLoading] = useState(false);
    const { GetWithDescr } = useAction();
    const {
        TableState: { currencyDescr },
    } = useTypedSelector(state => state);

    useEffect(() => {
        GetWithDescr();
    }, []);

    const { ChangeCurrency } = useAction();
    const {
        TableState: { selectedCurrency },
    } = useTypedSelector(state => state);
    useEffect(() => {
        if (currencyDescr) {
            setData(
                currencyDescr.map((currencyObj: any) => ({
                    label: `${currencyObj.symbol} ${currencyObj.name}`,
                    value: currencyObj.code,
                    record: currencyObj,
                }))
            );
        }
    }, [currencyDescr]);

    return (
        <Select
            onChange={ChangeCurrency}
            style={{ width: '200px' }}
            defaultValue={selectedCurrency}
            placeholder="Текущая валюта"
            options={data}
            loading={loading}
        />
    );
};

export default CurrencySelect;
