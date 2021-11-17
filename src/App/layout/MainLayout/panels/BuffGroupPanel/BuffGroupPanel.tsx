import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '../../../../../hooks/useStores';
import NormalFrame from '../../../../components/NormalFrame/NormalFrame';
import BuffConfigPanel from '../../components/BuffConfigBox/BuffConfigBox';
import { AddButton } from '../../style/index.style';

export default observer(function BuffGroupFrame() {
  const { buffGroupStore } = useStores();
  const addClick = () =>
    buffGroupStore.addBuffGroup({
      collected: false,
      available: true,
      title: '',
      buffs: [],
      allProductivity: 1,
    });
  return (
    <NormalFrame
      mainTitle="Buff 配置"
      describe="配置你想要生效的各种 Buff , 将会影响到最终收益"
      content={
        <>
          {buffGroupStore.buffGroupsData.map((item: any, index: any) => (
            <BuffConfigPanel key={index} buffGroup={item} index={index}></BuffConfigPanel>
          ))}
          <AddButton
            role="button"
            tabIndex={0}
            onClick={addClick}
            height={'307px'}
            width={'168px'}
            onKeyDown={addClick}>
            <PlusOutlined />
          </AddButton>
        </>
      }></NormalFrame>
  );
});
