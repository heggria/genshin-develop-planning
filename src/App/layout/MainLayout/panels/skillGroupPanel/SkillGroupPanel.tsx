import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { useStores } from '../../../../../hooks/useStores';
import SkillLiteBox from '../../../../components/SkillLiteBox/SkillLiteBox';
import { SkillDropArea, SkillEditableButton } from '../../style/index.style';

export default observer(function SkillGroupPanel() {
  const {
    skillGroup,
    skillList,
    addSkillGroup,
    skillGroupEditable,
    setSkillGroupEditable,
    moveSkill,
  } = useStores().skillConfigStore;

  const appendItem = useCallback(
    ({ skillId }) => {
      for (let skill of skillList) {
        if (skill.id === skillId) {
          addSkillGroup({
            skill,
            arrangementId: new Date().getTime().toString(),
          });
          break;
        }
      }
    },
    [addSkillGroup, skillList],
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
      console.log('moveCard');
      moveSkill(hoverIndex, dragIndex);
    },
    [moveSkill],
  );
  const renderCard =
    skillGroup.length > 0 &&
    skillGroup.map((item, index) => {
      console.log(item.skill);
      return (
        <SkillLiteBox
          key={item.arrangementId}
          index={index}
          id={item.arrangementId}
          moveCard={moveCard}
          skill={item.skill}></SkillLiteBox>
      );
    });
  const onToggleForbidDrag = useCallback(() => {
    setSkillGroupEditable(!skillGroupEditable);
  }, [setSkillGroupEditable, skillGroupEditable]);

  console.log(1111);
  return (
    <>
      <SkillEditableButton>
        {skillGroupEditable ? (
          <Button icon={<EditOutlined />} onClick={onToggleForbidDrag}>
            {'编辑'}
          </Button>
        ) : (
          <Button type={'primary'} icon={<SaveOutlined />} onClick={onToggleForbidDrag}>
            {'保存'}
          </Button>
        )}
      </SkillEditableButton>
      <SkillDropArea
        isHover={collectProps.hovered}
        editable={skillGroupEditable}
        ref={drop}>
        {renderCard}
      </SkillDropArea>
    </>
  );
});
