import { Component } from 'react';
import * as React from 'react';

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export class Header extends Component<Props, { inputValue: string }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: props.searchTerm,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.inputValue.trim());
  };

  render() {
    return (
      <header className="p-6 border rounded-lg space-y-4 bg-white">
        <h2 className="text-lg font-semibold">Top controls</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Search Input Field"
            className="flex-1 text-black border rounded px-3 py-2"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={this.handleSearchClick}
          >
            Search
          </button>
        </div>
      </header>
    );
  }
}
