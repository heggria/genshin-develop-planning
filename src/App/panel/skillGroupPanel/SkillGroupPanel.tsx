/* eslint-disable no-unused-vars */
import './SkillGroupPanel.css';

import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import update from 'immutability-helper';
import { observer } from 'mobx-react';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { useStores } from '../../../hooks/useStores';
import SkillLiteBox, { DragItem } from '../../component/skillLiteBox/SkillLiteBox';
import { SingleAttack } from '../skillBoxPanel/SkillBoxPanel';

export default observer(function SkillGroupPanel() {
  const [items, setItems] = useState<Array<DragItem>>([]);
  const { skillConfigStore } = useStores();
  const appendItem = useCallback(
    ({ skill }) => {
      setItems((items: any) => [
        ...items,
        { skill: skill, id: String(items.length + 1) },
      ]);
    },
    [setItems],
  );
  console.log(items);
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
      const dragCard = items[dragIndex];
      setItems(
        update(items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      );
    },
    [items],
  );
  const renderCard = (card: { id: string; skill: SingleAttack }, index: number) => {
    return (
      <SkillLiteBox
        key={card.id}
        index={index}
        id={card.id}
        moveCard={moveCard}
        skill={card.skill}></SkillLiteBox>
    );
  };
  const onToggleForbidDrag = useCallback(() => {
    skillConfigStore.setSkillGroupEditable(!skillConfigStore.skillGroupEditable);
  }, [skillConfigStore]);
  return (
    <>
      <div className={'skill-edit-button'}>
        {skillConfigStore.skillGroupEditable ? (
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
        ref={!skillConfigStore.skillGroupEditable ? drop : null}
        className={`drop-area ${collectProps.hovered ? 'drop-area-hovered' : ''}`}
        style={skillConfigStore.skillGroupEditable ? { border: '1px #fff dashed' } : {}}>
        {items.map((item, i) => renderCard(item, i))}
      </div>
    </>
  );
});
