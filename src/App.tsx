import { Button, Layout, Menu } from 'antd';
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Conversion from './pages/conversion/Conversion';
import Table from './pages/currencyTable/Table';

const { Content } = Layout;

const App: React.FC = () => {
    const { pathname } = useLocation();
    const pathSnippets = pathname.split('/').filter(i => i);
    const firstPath = pathSnippets[0] || 'table';

    return (
        <Layout className="layout">
            <Menu className="menu" mode="horizontal" selectedKeys={[firstPath]} defaultOpenKeys={['conversion']}>
                <Menu.Item className="menu__item" key="table">
                    <Button size="large">
                        <Link to="table">Таблица</Link>
                    </Button>
                </Menu.Item>
                <Menu.Item className="menu__item" key="conversion">
                    <Button size="large">
                        <Link to="conversion">Конвертация</Link>
                    </Button>
                </Menu.Item>
            </Menu>
            <Content style={{ padding: '0 50px 0 10px' }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/table" element={<Table />} />
                        <Route path="/conversion" element={<Conversion />} />
                        <Route path="/" element={<Navigate to="table" replace />} />
                    </Routes>
                </div>
            </Content>
        </Layout>
    );
};

export default App;
