/* eslint-disable no-unused-vars */
import { Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { useStores } from '../../../../../hooks/useStores';
import { Entry } from '../../../../common/interface';
import { AttributesCode } from '../../../../common/type-code';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { fontSize1 } from '../../style/common.style';

export default observer(function EntryStatisticsPanel() {
  const { attributesStore } = useStores();
  const { entryStatisticsList } = attributesStore;

  const listItems: Array<any> = [];
  entryStatisticsList.forEach((value: Entry, key: AttributesCode) =>
    listItems.push(
      <ValueBox key={key}>
        <ValueBoxTitle>{value.attribute.title.split('/')[0]}</ValueBoxTitle>
        <ValueBoxValue
          style={{
            color:
              value.mount < 0 || isNaN(value.mount) || !isFinite(value.mount)
                ? 'red'
                : '',
          }}>
          {isNaN(value.mount) || !isFinite(value.mount)
            ? '数据异常'
            : value.mount.toFixed(2)}
        </ValueBoxValue>
      </ValueBox>,
    ),
  );
  return (
    <NormalFrame
      mainTitle="圣遗物状况分析"
      describe=""
      content={
        <div>
          <div>{listItems}</div>
          <Tooltip placement="topLeft" title="词条总值/单词条平均值">
            <div>有效词条数</div>
          </Tooltip>
          <div>有效词条数最大值</div>
          <Tooltip placement="topLeft" title="视无词条伤害为100">
            <div>当前词条伤害增益</div>
          </Tooltip>
          <Tooltip
            placement="topLeft"
            title="词条平均毕业伤害增益，初始三词条，视无词条伤害为100">
            <div>平均毕业词条总分</div>
          </Tooltip>
          <Tooltip
            placement="topLeft"
            title="词条极限毕业伤害增益，初始四词条，视无词条伤害为100">
            <div>理论毕业词条总分</div>
          </Tooltip>
          <Tooltip
            placement="topLeft"
            title="当前词条伤害增益/词条平均伤害增益*有效词条最大值">
            <div>有效词条分布分（平均）</div>
          </Tooltip>
          <Tooltip
            placement="topLeft"
            title="当前词条伤害增益/词条极限伤害增益*有效词条最大值">
            <div>有效词条分布分（理论）</div>
          </Tooltip>
        </div>
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
