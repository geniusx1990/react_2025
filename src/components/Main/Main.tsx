import type { IPokemon } from '../../utils/types.ts';
import { Component } from 'react';
import CardList from '../CardList/CardList.tsx';
import Skeleton from '../Skeleton/Skeleton.tsx';
import Loader from '../Loader/Loader.tsx';
import { ErrorButton } from '../ErrorButton/ErrorButton.tsx';

interface Props {
  data: IPokemon[];
  isLoading: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasNext?: boolean;
}

export class Main extends Component<Props> {
  render() {
    const { data, isLoading, onLoadMore, hasNext, error } = this.props;

    let content;
    if (error) {
      content = (
        <div className="text-red-600 font-semibold bg-red-100 p-4 rounded text-center">
          {error}
        </div>
      );
    } else if (isLoading) {
      content = (
        <div className="flex flex-col items-center gap-4">
          <Skeleton />
          <Loader />
        </div>
      );
    } else if (data.length === 0) {
      content = (
        <div className="text-center text-gray-600 py-8">No results found.</div>
      );
    } else {
      content = <CardList data={data} />;
    }

    return (
      <main className="border rounded-lg p-4 shadow-sm bg-red-400">
        <section className="border rounded-lg p-4 bg-white shadow">
          <h2 className="text-lg font-semibold mb-4">Results</h2>
          {content}
        </section>

        {hasNext && !isLoading && (
          <div className="flex justify-center mt-4">
            <button
              onClick={onLoadMore}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Load more
            </button>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <ErrorButton />
        </div>
      </main>
    );
  }
}
