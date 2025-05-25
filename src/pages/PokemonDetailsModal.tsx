import { useEffect, useRef, useState } from 'react';
import { getPokemonById } from '../api/pokemonApi';
import { PokemonDto } from '../models';

interface Props {
  pokemonId: number;
  onClose: () => void;
}

export default function PokemonDetailsModal({ pokemonId, onClose }: Props) {
  const [pokemon, setPokemon] = useState<PokemonDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPokemonById(pokemonId)
      .then(data => setPokemon(data))
      .catch(() => setError('Failed to load Pokémon data.'))
      .finally(() => setLoading(false));
  }, [pokemonId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        style={{ width: '1000px', borderWidth: '1px' }}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg w-full max-w-3xl shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold">
            {loading ? 'Loading...' : pokemon?.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>

        {loading && <p>Loading Pokémon data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && pokemon && (
          <div>
            <img src={pokemon.imageUrl} alt={pokemon.name} className="w-32 h-32 object-contain mx-auto mb-4" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              {pokemon.evolvesFrom && <p><strong>⬅️ Evolves from:</strong> {pokemon.evolvesFrom}</p>}
              {pokemon.evolvesTo.length > 0 && (
                <p><strong>➡️ Evolves to:</strong> {pokemon.evolvesTo.join(', ')}</p>
              )}
              <p><strong>🧬 Generation:</strong> {pokemon.generation}</p>
              <p><strong>✨ Abilities:</strong> {pokemon.abilities.join(', ')}</p>
              <p><strong>⬆️ Height:</strong> {pokemon.height}</p>
              <p><strong>🌀 Types:</strong> {pokemon.types.join(', ')}</p>
              <p><strong>⚖️ Weight:</strong> {pokemon.weight}</p>
              <p><strong>❤️ HP:</strong> {pokemon.hp}</p>
              <p><strong>⚔️ Attack:</strong> {pokemon.attack}</p>
              <p><strong>🛡️ Defense:</strong> {pokemon.defense}</p>
              <p><strong>✴️ Sp. Attack:</strong> {pokemon.specialAttack}</p>
              <p><strong>🔰 Sp. Defense:</strong> {pokemon.specialDefense}</p>
              <p><strong>🥾 Speed:</strong> {pokemon.speed }</p>              
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2">⚡ Moves:</h3>
              <ul className="flex flex-wrap gap-2 text-sm">
                {pokemon.moves.map((move, index) => (
                  <li key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {move}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
