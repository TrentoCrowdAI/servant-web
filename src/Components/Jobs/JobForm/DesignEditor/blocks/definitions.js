import React from 'react';

import InputDynamicText from './input/InputDynamicText';
import InputStaticText from "./input/InputStaticText";

const mapBlocksDefinitionArrayToMap = (blockDefinitions) => {
  const map = {};
  blockDefinitions.forEach(blockDefinition => map[blockDefinition.blockTypeName] = blockDefinition);
  return map;
};

export default mapBlocksDefinitionArrayToMap([
  InputDynamicText,
  InputStaticText
]);