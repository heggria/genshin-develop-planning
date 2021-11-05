import React from 'react';

import { BuffGroupStore } from './buffGroup';
import { SkillConfigStore } from './skillConfig';

const StoresContext = React.createContext({
  buffGroupStore: new BuffGroupStore(),
  skillConfigStore: new SkillConfigStore(),
});

export default StoresContext;
