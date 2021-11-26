import styled from 'styled-components';

import { boldFont, fontSize1, gray0, gray3, gray6 } from './common.style';

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

export const InputBox = styled.div.attrs((props: any) => ({
  width: props.width as string,
  height: props.height as string,
  hidden: props.hidden as boolean,
}))`
  /* width: ${(props) => props.width}; */
  /* margin: 0 10px 0 10px; */
  /* flex: 1 1 100px; */
  height: ${(props) => props.height};
  display: ${(props) => (props.hidden ? 'none' : '')};
`;

export const InputTitle = styled.div`
  font-size: ${fontSize1};
  font-weight: ${boldFont};
  line-height: ${2};
`;

export const GridContainer = styled.div.attrs((props: any) => ({
  minWidth: props.minWidth as string,
  gridGap: props.gridGap as string,
}))`
  width: 100%;
  display: grid;
  grid-gap: ${(props) => props.gridGap};
  grid-auto-rows: auto;
  grid-template-columns: ${(props) =>
    'repeat(auto-fit, minmax(' + props.minWidth + ', 1fr))'};
  padding: 0 10px;
`;
