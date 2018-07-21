import React, { Component } from 'react';


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  render() {
    return (
      <div>
        SideBar
      </div>
    );
  }
}

export default SideBar;