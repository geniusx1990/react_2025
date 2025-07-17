import { Component } from 'react';

export default class Skeleton extends Component {
  render() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-300 h-32 rounded"></div>
        ))}
      </div>
    );
  }
}
