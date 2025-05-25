export interface PokemonListItemDto {
  id: number;
  name: string;
  number: number;
  generation: string;
  height: number;
  weight: number;
  type1: string;
  type2: string | null;
  movesCount: number;
  imageUrl: string;
}