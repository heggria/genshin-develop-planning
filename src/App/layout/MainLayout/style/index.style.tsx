import styled from 'styled-components';

export const AddButton = styled.div`
  height: 307px;
  width: 168px;
  margin: 11px;
  border: 2px #aaa dashed;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  :hover {
    cursor: pointer;
    /* border: 2px #ccc dashed; */
    background-color: rgba(238, 238, 238, 0.75);
  }
`;
