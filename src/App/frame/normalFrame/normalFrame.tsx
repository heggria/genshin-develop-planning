import './normalFrame.css';

import React from 'react';

export interface NormalFrameProps {
  mainTitle: string;
  describe: string;
  content: any;
}

const NormalFrame = (props: NormalFrameProps) => {
  return (
    <div className="normal-frame">
      <div>
        <h2 className="normal-frame__title">{props.mainTitle}</h2>
      </div>
      <div className="normal-frame__describe">{props.describe}</div>
      <div className="normal-frame__content">{props.content}</div>
    </div>
  );
};
export default NormalFrame;
