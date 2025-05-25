import { useEffect, useState } from 'react';
import { getAllPokemons, getAvailableGenerations, getAvailableTypes } from '../api/pokemonApi';
import { PokemonListItemDto } from '../models';
import PokemonDetailsModal from "./PokemonDetailsModal";
import DashboardSummary from './DashboardSummary';
import { toast } from 'react-toastify';

export default function PokemonListPage() {
  const [pokemons, setPokemons] = useState<PokemonListItemDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableGenerations, setAvailableGenerations] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [sortBy, setSortBy] = useState('number');
  const [desc, setDesc] = useState(false);

  const [filterType, setFilterType] = useState('');
  const [filterGeneration, setFilterGeneration] = useState('');
  const [filterSearch, setFilterSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getAvailableTypes();
        setAvailableTypes(types);

        const generations = await getAvailableGenerations();
        setAvailableGenerations(generations);
      } catch (err) {
        toast.error("Failed to load filter options.");
      }

      try {
        const data = await getAllPokemons({
          page,
          pageSize,
          search: filterSearch || undefined,
          sortBy,
          desc,
          type: filterType || undefined,
          generation: filterGeneration || undefined,
        });

        setPokemons(data.items);
        setTotalCount(data.totalCount);
      } catch (err) {
        toast.error("Failed to load Pokémon list.");
      }
    };

    fetchData();
  }, [page, sortBy, desc, filterSearch, filterType, filterGeneration]);

  function getPaginationRange(current: number, total: number): (number | string)[] {
    const delta = 1;
    const range: (number | string)[] = [];

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 || 
        i === total || 
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      } else if (
        range[range.length - 1] !== '...'
      ) {
        range.push('...');
      }
    }

    return range;
  }

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setDesc(!desc);
    } else {
      setSortBy(column);
      setDesc(false);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        
      <DashboardSummary />
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search Pokémon"
                    value={filterSearch}
                    onChange={e => {
                      setFilterSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex items-center justify-end md:space-x-3">
              <select
                value={filterType}
                onChange={e => {
                  setFilterType(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="">All Types</option>
                {availableTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={filterGeneration}
                onChange={e => {
                  setFilterGeneration(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="">All Generations</option>
                {availableGenerations.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 w-16 cursor-pointer" onClick={() => toggleSort('number')}>#</th>
                    <th className="px-4 py-3 w-48 cursor-pointer" onClick={() => toggleSort('name')}>Name</th>
                    <th className="px-4 py-3 w-32">Generation 🧬</th>
                    <th className="px-4 py-3 w-16 cursor-pointer" onClick={() => toggleSort('height')}>Height ⬆️</th>
                    <th className="px-4 py-3 w-16 cursor-pointer" onClick={() => toggleSort('weight')}>Weight ⚖️</th>
                    <th className="px-4 py-3 w-24">Type 1 🌀</th>
                    <th className="px-4 py-3 w-24">Type 2 🌀</th>
                    <th className="px-4 py-3 w-16 cursor-pointer" onClick={() => toggleSort('movesCount')}>Moves ⚡</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemons.map(p => (
                    <tr key={p.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 w-16">{p.number}</td>
                      <td className="px-4 py-3 w-48">
                        <div className="flex items-center gap-2">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-10 h-10 rounded-md object-contain bg-transparent p-1"
                          />
                          <div>
                            <span
                              onClick={() => setSelectedId(p.id)}
                              className="text-white font-medium hover:underline cursor-pointer">
                              {p.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 w-32">{p.generation}</td>
                      <td className="px-4 py-3 w-16">{p.height}</td>
                      <td className="px-4 py-3 w-16">{p.weight}</td>
                      <td className="px-4 py-3 w-24">{p.type1}</td>
                      <td className="px-4 py-3 w-24">{p.type2 ?? ''}</td>
                      <td className="px-4 py-3 w-16">{p.movesCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white"> {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)} </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white"> {totalCount} </span>
            </span>
            <ul className="inline-flex items-center space-x-1">
              <li>
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center text-sm text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {'<'}
                </button>
              </li>

              {getPaginationRange(page, totalPages).map((value, idx) => (
                <li key={idx}>
                  {value === '...' ? (
                    <span className="w-10 h-10 flex items-center justify-center text-sm text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      onClick={() => setPage(Number(value))}
                      className={`w-10 h-10 flex items-center justify-center text-sm border ${
                        page === value
                          ? 'text-primary-600 bg-primary-50 border-primary-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      }`}
                    >
                      {value}
                    </button>
                  )}
                </li>
              ))}

              <li>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center text-sm text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {'>'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {selectedId && (
        <PokemonDetailsModal
          pokemonId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  );
}