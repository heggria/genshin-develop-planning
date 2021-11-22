import React from 'react';
import styled from 'styled-components';

export interface NormalFrameProps {
  mainTitle: string;
  describe: string;
  content: any;
}

const NormalFrame = (props: NormalFrameProps) => {
  return (
    <NormalFrameC>
      <NormalFrameTitle>{props.mainTitle}</NormalFrameTitle>
      <NormalFrameDescribe>{props.describe}</NormalFrameDescribe>
      <NormalFrameContent>{props.content}</NormalFrameContent>
    </NormalFrameC>
  );
};
export default NormalFrame;

const NormalFrameC = styled.div`
  padding: 15px 20px;
  box-shadow: 0px 4px 12px #ddd;
  min-width: 420px;
  break-inside: avoid;
  margin: 20px 0;
`;
const NormalFrameContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 5px 0;
  user-select: none;
`;
const NormalFrameTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;
const NormalFrameDescribe = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #aaa;
  padding-bottom: 10px;
`;
