import { Button, Divider, Table as AntdTable, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CurrencySelect from './CurrencySelect/CurrencySelect';
import { ReloadOutlined } from '@ant-design/icons';
import useAction from '../../hooks/useAction';

const Table: React.FC = () => {
    const [activeInterval, setActiveInterval] = useState<NodeJS.Timer>();
    const [reload, setReload] = useState<boolean>(false);
    const { GetList } = useAction();

    const columns: ColumnsType<any> = [
        {
            title: 'Название валюты',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            },
        },
        {
            title: 'Символ валюты',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'Код',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Курс',
            dataIndex: 'rate',
            key: 'rate',
        },
    ];
    const {
        TableState: { currencyDescr, selectedCurrency, list },
    } = useTypedSelector(state => state);

    useEffect(() => {
        clearInterval(activeInterval);

        if (currencyDescr.length) {
            GetList(selectedCurrency, currencyDescr);

            const interval = setInterval(() => {
                GetList(selectedCurrency, currencyDescr);
            }, 60000);

            setActiveInterval(interval);
        }

        return () => {
            clearInterval(activeInterval);
        };
    }, [currencyDescr, selectedCurrency]);

    useEffect(() => {
        if (reload) {
            GetList(selectedCurrency, currencyDescr);
            setReload(false);
        }
    }, [currencyDescr, selectedCurrency, reload]);

    return (
        <>
            <div>
                <CurrencySelect />
                <Tooltip title="Перезагрузить таблицу">
                    <Button icon={<ReloadOutlined />} onClick={() => setReload(true)} style={{ marginLeft: '20px' }} />
                </Tooltip>
            </div>
            <Divider />
            <AntdTable
                pagination={false}
                size="small"
                columns={columns}
                rowKey="code"
                dataSource={list.length && 'name' in list[0] ? list : []}
            />
        </>
    );
};

export default Table;
