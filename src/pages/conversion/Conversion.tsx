import { Button, InputNumber, Select } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import './styles.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useCallback, useEffect, useState } from 'react';
import useAction from '../../hooks/useAction';
import { DefaultOptionType } from 'antd/es/select';

const Conversion: React.FC = () => {
    const [optionsFrom, setOptionsFrom] = useState<DefaultOptionType[]>([]);
    const [optionsTo, setOptionsTo] = useState<DefaultOptionType[]>([]);
    const [from, setFrom] = useState<string>('USD');
    const [to, setTo] = useState<string>('RUB');
    const [pageConfig, setPageConfig] = useState<{
        amount: number;
        rate: number;
        convertToValue?: number;
    }>({
        amount: 1,
        rate: 0,
    });
    const { GetList, ClearState } = useAction();
    const {
        TableState: { list },
    } = useTypedSelector(state => state);

    useEffect(() => {
        GetList(from);
        return () => {
            ClearState();
        };
    }, [from, to]);

    useEffect(() => {
        if (list.length) {
            const currentRate = list.find(curr => curr.code === to).rate;
            setPageConfig(prev => ({
                ...prev,
                rate: currentRate.toFixed(3) * 1,
                convertToValue: +(currentRate * prev.amount).toFixed(3) * 1,
            }));
            setOptionsFrom(
                list
                    .filter(({ code }) => code !== to)
                    .map(({ code }) => ({
                        label: code,
                        value: code,
                    }))
            );

            setOptionsTo(
                list
                    .filter(({ code }) => code !== from)
                    .map(({ code }) => ({
                        label: code,
                        value: code,
                    }))
            );
        }
    }, [list, from]);

    const swipe = useCallback(() => {
        const currentFrom = from;
        const currentTo = to;
        setTo(from);
        setFrom(to);
    }, [to, from]);

    return (
        <div className="wrapper">
            <div className="wrapper__inner">
                <Select
                    // defaultValue={from}
                    value={from}
                    options={optionsFrom}
                    onSelect={value => {
                        setFrom(value);
                    }}
                    size="large"
                    style={{ width: 100 }}
                    className="select1"
                />
                <InputNumber
                    value={pageConfig.amount}
                    onChange={value => {
                        if (value) {
                            return setPageConfig(prev => ({
                                ...prev,
                                amount: value,
                                convertToValue: +(pageConfig.rate * value).toFixed(3) * 1,
                            }));
                        }
                    }}
                    min={1}
                    type="number"
                    style={{ width: 100 }}
                    className="input1"
                    size="large"
                />
                <Button icon={<SwapOutlined />} onClick={swipe} size="large" />
                <InputNumber
                    value={pageConfig.convertToValue}
                    min={0}
                    onChange={value => {
                        if (value) {
                            return setPageConfig(prev => ({
                                ...prev,
                                convertToValue: value,
                                amount: +(value / pageConfig.rate).toFixed(3) * 1,
                            }));
                        }
                    }}
                    type="number"
                    style={{ width: 100 }}
                    className="input2"
                    size="large"
                />
                <Select
                    onSelect={value => {
                        setTo(value);
                    }}
                    value={to}
                    options={optionsTo}
                    size="large"
                    style={{ width: 100 }}
                    className="select2"
                />
            </div>
        </div>
    );
};

export default Conversion;
