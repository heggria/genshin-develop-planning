import React from 'react';

import StoresContext from '../store';

export const useStores = () => React.useContext(StoresContext);
