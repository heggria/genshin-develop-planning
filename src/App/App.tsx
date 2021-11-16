/* eslint-disable no-unused-vars */
import './App.css';

import { Layout, Menu } from 'antd';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import logo from '../img/logo.svg';
import MainLayout from './layout/MainLayout';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="zh-cn" />
        <title>Genshin Develop Planning</title>
        <meta name="description" content="Help you planning easier!" />
      </Helmet>
      <Layout>
        <Header
          style={{ position: 'fixed', zIndex: 100, width: '100%', display: 'flex' }}>
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
