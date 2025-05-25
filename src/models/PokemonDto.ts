export interface PokemonDto {
  id: number;
  name: string;
  generation: string;
  height: number;
  weight: number;
  imageUrl: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  types: string[];
  moves: string[];
  abilities: string[];
  evolvesFrom: string | null;
  evolvesTo: string[];
}