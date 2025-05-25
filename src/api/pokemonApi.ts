import axios from 'axios';
import { PokemonListItemDto, PagedResult, DashboardSummaryDto, PokemonDto } from '../models';

const API_BASE = 'https://localhost:65176/api';

export async function getAllPokemons(params: {
  page: number;
  pageSize: number;
  search?: string;
  type?: string;
  generation?: string;
  sortBy?: string;
  desc?: boolean;
}): Promise<PagedResult<PokemonListItemDto>> {
  const response = await axios.get<PagedResult<PokemonListItemDto>>(`${API_BASE}/pokemons`, {
    params
  });
  return response.data;
}

export async function getPokemonById(id: number): Promise<PokemonDto> {
  const response = await axios.get(`${API_BASE}/pokemons/${id}`);
  return response.data;
}

export async function getDashboardSummary(): Promise<DashboardSummaryDto> {
  const response = await axios.get<DashboardSummaryDto>(`${API_BASE}/pokemons/dashboard`);
  return response.data;
}

export async function getAvailableTypes(): Promise<string[]> {
  const response = await axios.get(`${API_BASE}/pokemons/types`);
  return response.data;
}

export async function getAvailableGenerations(): Promise<string[]> {
  const response = await axios.get(`${API_BASE}/pokemons/generations`);
  return response.data;
}