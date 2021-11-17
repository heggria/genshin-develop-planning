import { PlusOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useStores } from '../../../../../hooks/useStores';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import { AddButton } from '../../style/index.style';
import SkillBoxPanel from '../SkillBoxPanel/SkillBoxPanel';
import SkillDetailPanel from '../SkillDetailPanel/SkillDetailPanel';
import SkillGroupPanel from '../SkillGroupPanel/SkillGroupPanel';

export default observer(function SkillConfigFrame() {
  const [skillDetailPanelVisible, setSkillDetailPanelVisible] = useState(false);
  const [drawIndex, setDrawIndex] = useState(-1);

  const { skillConfigStore } = useStores();
  const addClick = () => {
    skillConfigStore.addSkillList();
  };
  const skillList = skillConfigStore.skillList.map((item, index) => (
    <SkillBoxPanel
      key={index}
      singleAttack={item}
      showDrawer={() => {
        setSkillDetailPanelVisible(true);
        setDrawIndex(index);
      }}
      id={index}
      delSkill={() => skillConfigStore.delSkillList(index)}></SkillBoxPanel>
  ));
  return (
    <>
      <NormalFrame
        mainTitle="技能与攻击方式配置"
        describe="自由搭配技能释放和攻击方式，计算结果为本攻击组合的期望总伤"
        content={
          <>
            <Divider style={{ fontSize: '1rem', fontWeight: 700 }}>技能预设</Divider>
            {skillList}
            <AddButton
              role="button"
              tabIndex={0}
              height={'73px'}
              width={'168px'}
              onClick={addClick}
              onKeyDown={addClick}>
              <PlusOutlined />
            </AddButton>
            <Divider style={{ fontSize: '1rem', fontWeight: 700 }}>技能组编辑</Divider>
            <SkillGroupPanel></SkillGroupPanel>
            {drawIndex >= 0 ? (
              <SkillDetailPanel
                visible={skillDetailPanelVisible}
                closeDrawer={() => {
                  setSkillDetailPanelVisible(false);
                  setDrawIndex(-1);
                }}
                dataIndex={drawIndex}></SkillDetailPanel>
            ) : null}
          </>
        }></NormalFrame>
    </>
  );
});
