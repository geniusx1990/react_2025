import { Component } from 'react';

interface State {
  hasError: boolean;
}

export class TestErrorButton extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('This is a Toto error!');
    }

    return (
      <button
        onClick={this.handleClick}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Throw Error
      </button>
    );
  }
}
