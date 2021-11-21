import React from 'react';

import { AttributesStore } from './attributes';
import { BuffGroupStore } from './buffGroup';
import { SkillConfigStore } from './skillConfig';

const StoresContext = React.createContext({
  buffGroupStore: new BuffGroupStore(),
  skillConfigStore: new SkillConfigStore(),
  attributesStore: new AttributesStore(),
});

export default StoresContext;
