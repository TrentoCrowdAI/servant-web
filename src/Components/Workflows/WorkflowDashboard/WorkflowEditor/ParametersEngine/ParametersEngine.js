import React from 'react';
import {Alert} from "react-bootstrap";
import {Parameters} from "./parameters";

export default ({parametrizedBlock, onParameterModelUpdate}) => {
  const id = parametrizedBlock.getId();
  const parameterModelsMap = parametrizedBlock.getParameterModelsMap();
  const parameterDefinitions = parametrizedBlock.getParameterDefinitionList();

  return (
    <div>
      {
        parameterDefinitions.map((parameterDefinition) => {
          const parameterComponent = Parameters[parameterDefinition.type];
          const key = `${id}-${parameterDefinition.name}`;
          const parameterModel = parameterModelsMap[parameterDefinition.name]; // TODO: Handle empty case

          if (parameterComponent) {
            const Component = parameterComponent.Widget;
            return (
              <div key={key}>
                <Component model={parameterModel}
                           onModelUpdated={onParameterModelUpdate}/>
                <hr/>
              </div>
            );
          } else {
            return <UnsupportedParameter key={key} parameter={parameterDefinition}/>
          }

        })
      }
    </div>
  )
};


const UnsupportedParameter = ({parameter}) => (
  <Alert variant="danger">
    Error: Unknown parameter '{parameter.name}' of type '{parameter.type}'.
  </Alert>
);
