/* eslint-disable no-unused-vars */
import './App.css';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Observer, useLocalStore } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import logo from '../img/logo.svg';
import store from '../store';
import MainLayout from './layout/mainLayout/MainLayout';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { todoListStore } = useLocalStore(() => store);

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  useEffect(() => {
    const inputChange = () => {
      todoListStore.changeInput('88888');
    };
    inputChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <html lang="zh-cn" />
        <title>Genshin Develop Planning</title>
        <meta name="description" content="Help you planning easier!" />
      </Helmet>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex' }}>
          <div className="logo">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="logo title">Genshin Planning</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            inlineCollapsed={false}
            style={{ minWidth: '200px' }}>
            <Menu.Item key="1">计算器</Menu.Item>
            <Menu.Item key="2">计划</Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 100 }}>
          <MainLayout></MainLayout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Designed by heggria ©2021</Footer>
      </Layout>
    </HelmetProvider>
  );
}

export default App;
