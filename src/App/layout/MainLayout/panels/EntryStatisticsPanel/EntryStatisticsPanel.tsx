/* eslint-disable no-unused-vars */
import { Checkbox, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { useStores } from '../../../../../hooks/useStores';
import { Entry } from '../../../../common/interface';
import { AttributesCode } from '../../../../common/type-code';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { fontSize1, fontSize2 } from '../../style/common.style';

export default observer(function EntryStatisticsPanel() {
  const { attributesStore } = useStores();
  const { entryStatisticsList, setEntryStatisticsList, entryStatisticsData } =
    attributesStore;

  const listItems: Array<any> = [];
  entryStatisticsList.forEach((value: Entry, key: AttributesCode) =>
    listItems.push(
      <Checkbox
        key={key}
        style={{ margin: '0 auto' }}
        checked={value.efficient}
        onChange={(e: any) => {
          setEntryStatisticsList(key, {
            ...value,
            efficient: e.target.checked,
          } as Entry);
        }}>
        <ValueBox>
          <ValueBoxTitle>{value.attribute.title.split('/')[0]}</ValueBoxTitle>
          <ValueBoxValue
            style={{
              color:
                value.mount < 0 ||
                value.mount > 30 ||
                isNaN(value.mount) ||
                !isFinite(value.mount)
                  ? 'red'
                  : '',
            }}>
            {isNaN(value.mount) || !isFinite(value.mount)
              ? '数据异常'
              : value.mount.toFixed(2)}
          </ValueBoxValue>
        </ValueBox>
      </Checkbox>,
    ),
  );
  return (
    <NormalFrame
      mainTitle="圣遗物状况分析"
      describe=""
      content={
        <div style={{ display: 'flex', width: '100%' }}>
          <ItemContainer>{listItems}</ItemContainer>
          <ItemContainer>
            <Tooltip placement="topLeft" title="词条总值/单词条平均值">
              <ValueBox>
                <ValueBoxTitle>有效词条数</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.validEntriesNumber.toFixed(2)}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            <ValueBox>
              <ValueBoxTitle>有效词条数最大期望</ValueBoxTitle>
              <ValueBoxValue>
                {entryStatisticsData.validEntriesMaximumNumber.toFixed(2)}
              </ValueBoxValue>
            </ValueBox>
            <Tooltip placement="topLeft" title="词条带来的伤害增益">
              <ValueBox>
                <ValueBoxTitle>伤害增益</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.currentEntryDamageGain.toFixed(2) + '%'}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            <Tooltip placement="topLeft" title="词条带来的增幅反应伤害增益">
              <ValueBox>
                <ValueBoxTitle>增幅反应伤害增益</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.currentEntryReactionDamageGain.toFixed(2) + '%'}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title="词条平均毕业伤害增益，初始三词条，视无词条伤害为100">
              <ValueBox>
                <ValueBoxTitle>平均毕业词条总分</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.averageGraduationEntryTotalScore.toFixed(2)}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title="词条极限毕业伤害增益，初始四词条，视无词条伤害为100">
              <ValueBox>
                <ValueBoxTitle>理论毕业词条总分</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.theoreticalGraduationEntryTotalScore.toFixed(2)}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title="当前词条伤害增益/词条平均伤害增益*有效词条最大值">
              <ValueBox>
                <ValueBoxTitle>有效词条分布分（平均）</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.validEntriesDistributionAverageScore.toFixed(2)}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title="当前词条伤害增益/词条极限伤害增益*有效词条最大值">
              <ValueBox>
                <ValueBoxTitle>有效词条分布分（理论）</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.validEntriesDistributionTheoryScore.toFixed(2)}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
          </ItemContainer>
        </div>
      }></NormalFrame>
  );
});

const ValueBox = styled.div`
  display: flex;
  width: 310px;
`;
const ValueBoxTitle = styled.div`
  flex: 1;
  font-size: ${fontSize2};
  font-weight: bold;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ValueBoxValue = styled.div`
  flex: 1;
  font-size: ${fontSize2};
  font-weight: bold;
  width: 20%;
  text-align: center;
`;
const ItemContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-auto-columns: auto;
  width: 50%;
`;
