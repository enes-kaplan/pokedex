export interface Pokemon {
  name: string
  image: string
  description: string
  height: string
  weight: string
  habitat: string
  baseStats: PokemonStat[]
  types: PokemonType[]
  strongAgainst: PokemonType[]
  weakAgainst: PokemonType[]
}

export interface PokemonStat {
  name: string
  value: number
}

export interface PokemonType {
  name: string
  color: string
}