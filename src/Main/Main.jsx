import React, { Component } from 'react';
import SideBar from '../SideBar/SideBar';
import Messages from '../Messages/Messages';


class Main extends Component {
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
        <SideBar/>
        <Messages /> {/* props: channel */}
      </div>
    );
  }
}

export default Main;