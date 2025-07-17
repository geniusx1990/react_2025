import { Component } from 'react';
import { Header } from '../../components/Header/Header.tsx';
import { Main } from '../../components/Main/Main.tsx';
import type { IPokemon } from '../../utils/types.ts';
import { fetchAllPokemon } from '../../utils/api.ts';

interface State {
  search: string;
  allPokemon: IPokemon[];
  filteredData: IPokemon[];
  visibleCount: number;
  isLoading: boolean;
  error: string | null;
}

export class HomePage extends Component<object, State> {
  constructor(props: object) {
    super(props);
    const saved = localStorage.getItem('searchTerm') || '';
    this.state = {
      search: saved,
      allPokemon: [],
      filteredData: [],
      visibleCount: 8,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadAllPokemon();
  }

  loadAllPokemon = () => {
    this.setState({ isLoading: true });

    fetchAllPokemon()
      .then((all) => {
        const filtered = this.filterData(this.state.search, all);
        this.setState({
          allPokemon: all,
          filteredData: filtered,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: err.message || 'Unknown error occurred',
        });
      });
  };

  filterData = (term: string, data: IPokemon[]): IPokemon[] => {
    const cleaned = term.trim().toLowerCase();
    if (!cleaned) return data;
    return data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(cleaned)
    );
  };

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    const filtered = this.filterData(term, this.state.allPokemon);
    this.setState({
      search: term,
      filteredData: filtered,
      visibleCount: 8,
    });
  };

  handleLoadMore = () => {
    this.setState((prev) => ({
      visibleCount: prev.visibleCount + 8,
    }));
  };

  render() {
    const { filteredData, visibleCount } = this.state;
    const visibleData = filteredData.slice(0, visibleCount);
    const hasMore = visibleData.length < filteredData.length;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Header searchTerm={this.state.search} onSearch={this.handleSearch} />
        <Main
          data={visibleData}
          isLoading={this.state.isLoading}
          error={this.state.error}
          hasNext={hasMore}
          onLoadMore={this.handleLoadMore}
        />
      </div>
    );
  }
}
