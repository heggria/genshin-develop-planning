/* eslint-disable no-unused-vars */
import { Checkbox, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { useStores } from '../../../../../hooks/useStores';
import { attributeMap } from '../../../../common/attributes-list';
import { Entry } from '../../../../common/interface';
import { AttrCode } from '../../../../common/type-code';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { fontSize1, fontSize2 } from '../../style/common.style';

export default observer(function EntryStatisticsPanel() {
  const { attributesStore } = useStores();
  const { entryStatisticsList, setEntryStatisticsList, entryStatisticsData } =
    attributesStore;

  const listToString = (array: AttrCode[]) => {
    const list = new Map<AttrCode, number>();
    array.map((item) => {
      let c = list.get(item) || 0;
      list.set(item, (c += 1));
    });
    let strings: any[] = [];
    list.forEach((value, key) => {
      strings.push(
        <span key={key}>
          {attributeMap.get(key) + ':' + value}
          <br />
        </span>,
      );
    });
    return strings;
  };

  const min = listToString(entryStatisticsData.minGE[0]);
  const minP = listToString(entryStatisticsData.minGE[2]);
  const avg = listToString(entryStatisticsData.averageGE[0]);
  const avgP = listToString(entryStatisticsData.averageGE[2]);
  const max = listToString(entryStatisticsData.theoreticalGE[0]);
  const maxP = listToString(entryStatisticsData.theoreticalGE[2]);

  const listItems: Array<any> = [];
  entryStatisticsList.forEach((value: Entry, key: AttrCode) =>
    listItems.push(
      <Checkbox
        key={key}
        style={{ margin: '0' }}
        checked={value.efficient}
        onChange={(e: any) => {
          setEntryStatisticsList(key, {
            ...value,
            efficient: e.target.checked,
          } as Entry);
        }}>
        <ValueBox
          style={{
            width: '180px',
          }}>
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
      describe="请勾选有效词条，右边会自动分析词条带来的收益，注意勾选元素精通后会无视伤害类型，默认显示增幅伤害"
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
            <Tooltip
              placement="topLeft"
              title="当前有效词条带来的伤害增益（简化为独立乘区）">
              <ValueBox>
                <ValueBoxTitle>当前伤害增益</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.currentEntryDamageGain.toFixed(2) +
                    '%' +
                    (entryStatisticsList.get('proficient_plus')?.efficient
                      ? ' / ' +
                        entryStatisticsData.currentEntryReactionDamageGain.toFixed(2) +
                        '%'
                      : '')}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            <ValueBox>
              <Tooltip
                placement="topLeft"
                title="特定条件下最优词条分布的伤害增益(最多30词条，单类词条最多15条，每词条均为平均值)">
                <ValueBoxTitle>小毕业伤害增益</ValueBoxTitle>
              </Tooltip>
              <ValueBoxValue>
                <Tooltip title={min}>
                  {entryStatisticsData.minGE[1].toFixed(2) + '%'}
                </Tooltip>
                {entryStatisticsList.get('proficient_plus')?.efficient ? (
                  <>
                    {' / '}
                    <Tooltip title={minP}>
                      {entryStatisticsData.minGE[3].toFixed(2) + '%'}
                    </Tooltip>
                  </>
                ) : null}
              </ValueBoxValue>
            </ValueBox>

            <ValueBox>
              <Tooltip
                placement="topLeft"
                title="特定条件下最优词条分布的伤害增益(最多35词条，单类词条最多20条，每词条均为平均值)">
                <ValueBoxTitle>大毕业伤害增益</ValueBoxTitle>
              </Tooltip>
              <ValueBoxValue>
                <Tooltip title={avg}>
                  {entryStatisticsData.averageGE[1].toFixed(2) + '%'}
                </Tooltip>
                {entryStatisticsList.get('proficient_plus')?.efficient ? (
                  <>
                    {' / '}
                    <Tooltip title={avgP}>
                      {entryStatisticsData.averageGE[3].toFixed(2) + '%'}
                    </Tooltip>
                  </>
                ) : null}
              </ValueBoxValue>
            </ValueBox>

            <ValueBox>
              <Tooltip
                placement="topLeft"
                title="特定条件下最优词条分布的伤害增益(最多45词条，单类词条最多30条，每词条均为最大值)">
                <ValueBoxTitle>理论最大伤害增益</ValueBoxTitle>
              </Tooltip>
              <ValueBoxValue>
                <Tooltip title={() => <span>{max}</span>}>
                  {entryStatisticsData.theoreticalGE[1].toFixed(2) + '%'}
                </Tooltip>
                {entryStatisticsList.get('proficient_plus')?.efficient ? (
                  <>
                    {' / '}
                    <Tooltip title={maxP}>
                      {entryStatisticsData.theoreticalGE[3].toFixed(2) + '%'}
                    </Tooltip>
                  </>
                ) : null}
              </ValueBoxValue>
            </ValueBox>
            <Tooltip
              placement="topLeft"
              title="当前伤害/大毕业伤害*100，个人分级：及格60/能用70/优秀80/准毕业90/大毕业100">
              <ValueBox>
                <ValueBoxTitle>有效词条分布分</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.validScore[0].toFixed(2) +
                    (entryStatisticsList.get('proficient_plus')?.efficient
                      ? ' / ' + entryStatisticsData.validScore[1].toFixed(2)
                      : '')}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip>
            {/* <Tooltip
              placement="topLeft"
              title="当前词条伤害增益/词条极限伤害增益*有效词条最大值">
              <ValueBox>
                <ValueBoxTitle>有效词条分布分（理论）</ValueBoxTitle>
                <ValueBoxValue>
                  {entryStatisticsData.validEntriesDistributionTheoryScore.toFixed(2)}
                </ValueBoxValue>
              </ValueBox>
            </Tooltip> */}
          </ItemContainer>
        </div>
      }></NormalFrame>
  );
});

const ValueBox = styled.span`
  display: flex;
`;
const ValueBoxTitle = styled.span`
  flex: 1;
  font-size: ${fontSize2};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ValueBoxValue = styled.span`
  flex: 1;
  font-size: ${fontSize2};
  font-weight: bold;
  /* width: 20%; */
  text-align: center;
`;
const ItemContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-auto-columns: auto;
  width: 50%;
  text-align: left;
`;
