import styled from 'styled-components';

import { gray0, gray3, gray6 } from './common.style';

export const AddButton = styled.div.attrs((props: any) => ({
  height: props.height as string,
  width: props.width as string,
}))`
  height: ${(props: any) => props.height};
  width: ${(props: any) => props.width};
  margin: 11px;
  border: 2px ${gray6} dashed;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-align: center;
  :hover {
    cursor: pointer;
    background-color: ${gray3};
  }
`;

export const SkillEditableButton = styled.div`
  width: 100%;
  margin: 7px;
  float: right;
  display: flex;
  justify-content: right;
`;

export const SkillDropArea = styled.div.attrs((props: any) => ({
  editable: props.editable as boolean,
  isHover: props.isHover as boolean,
}))`
  display: flex;
  flex-flow: row wrap;
  border: 1px dashed orange;
  margin-bottom: 16px;
  width: 100%;
  min-height: 73px;
  ${(props: any) => props.editable && `border: 1px ${gray0} dashed`}
  ${(props: any) => props.isHover && `background-color: ${gray3};`}
`;
