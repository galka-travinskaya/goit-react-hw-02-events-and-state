import React from 'react';
import Controls from './Controls';

class Counter extends React.Component {
  // Вариант как передать в сет таргет - СОХРАНИТЬ!
  // handleIncrement = (event) => {
  //     console.log('Кликнули увеличить');

  //     const {target} = event;
  //     setTimeout(() => {
  //         console.log(target);
  //     }, 1000);
  // };

  static defaultProps = {
    initialValue: 0,
  };

  static propTypes = {
    //
  };

  state = {
    value: this.props.initialValue,
  };

  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1,
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1,
    }));
  };

  render() {
    const { value } = this.state;
    return (
      <div className="Counter">
        <span className="Counter__value">{value}</span>

        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}

export default Counter;
