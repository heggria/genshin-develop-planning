/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { useStores } from '../../../../../hooks/useStores';
import { Attribute } from '../../../../common/interface';
import { AttrCode, ValueTypeCode } from '../../../../common/type-code';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { fontSize1 } from '../../style/common.style';
import { GridContainer } from '../../style/index.style';

export default observer(function StatisticsPanel() {
  const { attributesStore } = useStores();
  const { actualAttrList } = attributesStore;
  // console.log(actualAttributes);
  const listItems: Array<any> = [];
  actualAttrList.forEach((value: Attribute, key: AttrCode) =>
    listItems.push(
      <ValueBox key={key}>
        <ValueBoxTitle>{value.title.split('/')[0]}</ValueBoxTitle>
        <ValueBoxValue>
          {value.value.toFixed(2) + (value.valueType === 'percent' ? '%' : '')}
        </ValueBoxValue>
      </ValueBox>,
    ),
  );
  return (
    <NormalFrame
      mainTitle="实际属性面板"
      describe="根据配置自动计算的实际属性面板（不包括 Buff）"
      content={
        <GridContainer minWidth="100px" gridGap="20px">
          {listItems}
        </GridContainer>
      }></NormalFrame>
  );
});

const ValueBox = styled.div`
  display: flex;
`;
const ValueBoxTitle = styled.div`
  font-size: ${fontSize1};
  font-weight: bold;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ValueBoxValue = styled.div`
  font-size: ${fontSize1};
  font-weight: bold;
  width: 40%;
  text-align: center;
`;
