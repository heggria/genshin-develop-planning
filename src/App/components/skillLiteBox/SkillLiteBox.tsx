/* eslint-disable no-unused-vars */
import './SkillLiteBox.css';

import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import { useStores } from '../../../hooks/useStores';
import { SingleAttack } from '../../common/interface';

interface SkillLiteBoxProps {
  skill: SingleAttack;
  index: number;
  id: any;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
  skillId: string;
}

export default observer(function SkillLiteBox(skillLiteBoxProps: SkillLiteBoxProps) {
  const { skill, id, index, moveCard } = skillLiteBoxProps;
  const ref = useRef<HTMLDivElement>(null);
  const { skillConfigStore } = useStores();

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    canDrag: !skillConfigStore.skillGroupEditable,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // const [{ handlerId }, drop] = useDrop({
  //   accept: 'item',
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
  //   hover(item: DragItem, monitor: DropTargetMonitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;

  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     // Determine rectangle on screen
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();

  //     // Get vertical middle
  //     const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset();

  //     // Get pixels to the top
  //     const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

  //     // Only perform the move when the mouse has crossed half of the items height
  //     // When dragging downwards, only move when the cursor is below 50%
  //     // When dragging upwards, only move when the cursor is above 50%

  //     // Dragging downwards
  //     if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
  //       return;
  //     }

  //     // Dragging upwards
  //     if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
  //       return;
  //     }

  //     console.log(dragIndex, hoverIndex);
  //     // Time to actually perform the action
  //     moveCard(dragIndex, hoverIndex);

  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     item.index = hoverIndex;
  //   },
  // });
  // drag(drop(ref));
  return (
    <>
      <div
        className="dropped-item"
        style={
          isDragging ? { opacity: 0.5, border: '1px #f00 solid', margin: '4px' } : {}
        }
        ref={ref}
        // data-handler-id={handlerId}
      >
        <div className="dropped-item__title">{skill.title}</div>
        <div className="dropped-item__time">{skill.costTime + 's'}</div>
      </div>
    </>
  );
});
