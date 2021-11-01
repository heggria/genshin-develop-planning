/* eslint-disable no-unused-vars */
import './SkillConfigFrame.css';

import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useStores } from '../../../hooks/useStores';
import SkillBoxPanel from '../../panel/skillBoxPanel/SkillBoxPanel';
import SkillDetailPanel from '../../panel/skillDetailPanel/SkillDetailPanel';
import NormalFrame from '../normalFrame/normalFrame';

export default observer(function SkillConfigFrame() {
  const [skillDetailPanelVisible, setSkillDetailPanelVisible] = useState(false);
  const [drawIndex, setDrawIndex] = useState(-1);

  const { buffGroupStore } = useStores();
  const addClick = () => {
    buffGroupStore.addSkillList();
  };
  return (
    <>
      <NormalFrame
        mainTitle="技能与攻击方式配置"
        describe="自由搭配技能释放和攻击方式，计算结果为本攻击组合的期望总伤"
        content={
          <>
            <Divider style={{ fontSize: '1rem', fontWeight: 700 }}>技能预设</Divider>
            {buffGroupStore.skillList.map((item, index) => (
              <SkillBoxPanel
                key={index}
                singleAttack={item}
                showDrawer={() => {
                  setSkillDetailPanelVisible(true);
                  setDrawIndex(index);
                }}
                delSkill={() => buffGroupStore.delSkillList(index)}></SkillBoxPanel>
            ))}
            <div
              role="button"
              tabIndex={0}
              className="add-div add-skill"
              onClick={addClick}
              onKeyDown={addClick}>
              <PlusOutlined />
            </div>
            <Divider style={{ fontSize: '1rem', fontWeight: 700 }}>技能组编辑</Divider>
            <SkillDetailPanel
              visible={skillDetailPanelVisible}
              setVisible={setSkillDetailPanelVisible}
              dataIndex={drawIndex}></SkillDetailPanel>
          </>
        }></NormalFrame>
    </>
  );
});
