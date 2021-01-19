import React, { Component } from 'react';
import s from './ColorPicker.module.css';
// import classNames from 'classnames'

class ColorPicker extends Component {
  state = {
    activeOptionsIdx: 0,
  };

  setActiveIdx = index => {
    this.setState({ activeOptionsIdx: index });
  };
  // без пакета classnames
  makeOptionClassName = index => {
    const optionClasses = [s.option];
    if (index === this.state.activeOptionsIdx) {
      optionClasses.push(s.optionActive);
    }

    return optionClasses.join(' ');
  };

  // с пакетом classnames
  // makeOptionClassName = index => {
  //   return classNames('s.option', {
  //     's.optionActive': index === this.state.activeOptionsIdx,
  //   });
  // }

  render() {
    const { activeOptionsIdx } = this.state;
    const { options } = this.props;
    const { label } = options[activeOptionsIdx];

    return (
      <div className={s.container}>
        <h2 className={s.title}>Color Picker</h2>
        <p>Выбран цвет: {label}</p>
        <div>
          {options.map(({ label, color }, index) => (
            <button
              key={label}
              className={this.makeOptionClassName(index)}
              style={{ backgroundColor: color }}
              onClick={() => this.setActiveIdx(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
