/* eslint-disable no-unused-vars */
import './SkillGroupPanel.css';

import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { useStores } from '../../../../../hooks/useStores';
import SkillLiteBox from '../../../../components/SkillLiteBox/SkillLiteBox';

export interface AttackSubModule {
  skillId: string;
  arrangementId: string;
}

export default observer(function SkillGroupPanel() {
  const {
    skillGroup,
    addSkillGroup,
    setSkillGroup,
    skillGroupEditable,
    setSkillGroupEditable,
  } = useStores().skillConfigStore;
  const appendItem = useCallback(
    ({ skillId }) => {
      addSkillGroup({
        skillId: skillId,
        arrangementId: new Date().getTime().toString(),
      } as AttackSubModule);
    },
    [addSkillGroup],
  );
  console.log(skillGroup);
  // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
  const [collectProps, drop] = useDrop({
    // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    accept: 'SkillConfigBox',
    drop: appendItem,
    // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
    collect: (monitor) => ({
      hovered: monitor.isOver(),
    }),
  });
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = skillGroup[dragIndex];
      setSkillGroup(skillGroup.splice(dragIndex, 1));
      setSkillGroup(skillGroup.splice(hoverIndex, 0, dragCard));
    },
    [setSkillGroup, skillGroup],
  );
  const renderCard = skillGroup.map((item, index) => {
    return (
      <SkillLiteBox
        key={item.arrangementId}
        index={index}
        id={item.arrangementId}
        moveCard={moveCard}
        skillId={item.skillId}></SkillLiteBox>
    );
  });
  const onToggleForbidDrag = useCallback(() => {
    setSkillGroupEditable(!skillGroupEditable);
  }, [setSkillGroupEditable, skillGroupEditable]);
  return (
    <>
      <div className={'skill-edit-button'}>
        {skillGroupEditable ? (
          <Button icon={<EditOutlined />} onClick={onToggleForbidDrag}>
            {'编辑'}
          </Button>
        ) : (
          <Button type={'primary'} icon={<SaveOutlined />} onClick={onToggleForbidDrag}>
            {'保存'}
          </Button>
        )}
      </div>
      <div
        ref={!skillGroupEditable ? drop : null}
        className={`drop-area ${collectProps.hovered ? 'drop-area-hovered' : ''}`}
        style={skillGroupEditable ? { border: '1px #fff dashed' } : {}}>
        {renderCard}
      </div>
    </>
  );
});
