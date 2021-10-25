import React from 'react';

import { BuffGroupStore } from './buffGroup';

const StoresContext = React.createContext({
  buffGroupStore: new BuffGroupStore(),
});

export default StoresContext;
