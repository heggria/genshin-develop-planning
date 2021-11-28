/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import BuffGroupLayout from './panels/BuffGroupPanel/BuffGroupPanel';
import CharacterBasePanel from './panels/CharacterBasePanel/CharacterBasePanel';
import EntryStatisticsPanel from './panels/EntryStatisticsPanel/EntryStatisticsPanel';
import HolyRelicConfigPanel from './panels/HolyRelicConfigPanel/HolyRelicConfigPanel';
import BuffConfigFrame from './panels/SkillConfigPlane/SkillConfigPlane';
import StatisticsPanel from './panels/StatisticsPanel/StatisticsPanel';
import WeaponBasePanel from './panels/WeaponBasePanel/WeaponBasePanel';

// 组件层级
// 独立：public-component 公用组件，多个 layout 用到同一个 component
// 每级只维护一个样式文件
// 第一级：layout，独立页面，是一个页面的主入口
// 第二级：panel，每一个页面细分为各个功能区，功能区内主导一个功能
// 第三级：component，panel 由各种 component 组成
export default function MainLayout() {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [columnCount, setColumnCount] = useState(0);
  useEffect(() => {
    const handleResize = (e: any) => {
      // console.log(e);
      setColumnCount(Math.floor(e.currentTarget.innerWidth / 430));
    };
    // console.log(ref);
    if (ref && ref.current) {
      let r = ref.current;
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  });
  return (
    <MainLayoutContainer>
      <Routes>
        <Route
          path={`/`}
          element={
            <Container ref={ref} columnCount={columnCount}>
              <CharacterBasePanel />
              <WeaponBasePanel />

              <BuffConfigFrame />
              <BuffGroupLayout />

              <HolyRelicConfigPanel />
              <EntryStatisticsPanel />
              <StatisticsPanel />
            </Container>
          }
        />
      </Routes>
    </MainLayoutContainer>
  );
}

const MainLayoutContainer = styled.div`
  background: #fff;
  padding: 10px;
`;

const Container = styled.div.attrs((props: any) => ({
  columnCount: props.columnCount as number,
}))`
  column-count: ${(props: any) => props.columnCount};
  column-gap: 10px;
  padding: 20px 0;
`;
