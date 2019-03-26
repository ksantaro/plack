import React, { Component } from 'react';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    return (
      <span className="form-input">
        <input className={this.props.error ? "form-error-input" : null} placeholder={this.props.placeholder} type={this.props.type} value={this.props.value} name={this.props.name} onChange={this.props.onChange} required={this.props.required}/>
        {this.props.error &&  <span className={"form-error-input-icon"}>!</span>}
        {this.props.error &&  <span className="form-error-message">{this.props.error}</span>}
      </span>
    );
  }
}

export default FormInput;