/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import BuffGroupLayout from './panels/BuffGroupPanel/BuffGroupPanel';
import HolyRelicConfigPanel from './panels/HolyRelicConfigPanel/HolyRelicConfigPanel';
import BuffConfigFrame from './panels/SkillConfigPlane/SkillConfigPlane';

const MainLayoutContainer = styled.div`
  background: #fff;
  max-width: 902px;
`;
// 组件层级
// 独立：public-component 公用组件，多个 layout 用到同一个 component
// 每级只维护一个样式文件
// 第一级：layout，独立页面，是一个页面的主入口
// 第二级：panel，每一个页面细分为各个功能区，功能区内主导一个功能
// 第三级：component，panel 由各种 component 组成
export default function MainLayout() {
  return (
    <MainLayoutContainer>
      <Routes>
        <Route
          path={`/`}
          element={
            <>
              <HolyRelicConfigPanel />
              {/* <BuffConfigFrame />
              <BuffGroupLayout /> */}
            </>
          }
        />
      </Routes>
    </MainLayoutContainer>
  );
}
