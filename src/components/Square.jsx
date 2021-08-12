import React, {Component} from 'react';

import './Square.css';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {col, row, start, end, wall, onClick} = this.props;
    let name;
    if (start) {
      name = 'square starting';
    } else if (end) {
      name = 'square ending';
    } else if (wall) {
      name = 'square wall';
    } else {
      name = 'square';
    }

    return <div onClick={() => onClick(row, col)} className={`${name}`} id={`square-${row}-${col}`}></div>;
  }
}
