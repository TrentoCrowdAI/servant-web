import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import AbstractParameterModel from "../AbstractParameterModel";

const type = 'boolean';

class BooleanModel extends AbstractParameterModel {

  isValid() {
    return true;
  }
}

// TODO: This is a copy and paste of Text, improve solution
class BooleanWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.getModel().getValue()
    };
  }

  getModel() {
    return this.props.model;
  }

  onChange = (event) => {
    const {checked} = event.target;
    this.getModel().setValue(checked);
    this.setState({value: checked}, this.props.onModelUpdated);
  };

  render() {
    const model = this.getModel();
    const definition = model.getDefinition();

    return (
      <Form.Group>
        <Form.Label>
          {definition.displayName}
        </Form.Label>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>
        <Form.Check type="checkbox"
                    label={definition.displayName}
                    checked={this.state.value}
                    onChange={this.onChange}/>
      </Form.Group>
    );
  }
}

export default {
  type,
  Model: BooleanModel,
  Widget: BooleanWidget
}
