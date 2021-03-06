export interface Pokemon {
  no: number
  name: string
  image: string
  description: string
  height: string
  weight: string
  habitat: string
  genderRate: number
  abilities: string[]
  baseStats: PokemonStat[]
  types: PokemonType[]
}

export interface PokemonStat {
  name: string
  value: number
}

export interface PokemonType {
  name: string
  color: string
  multiplier?: number
}

export interface TypeRelation {
  name: string
  color: string
  multiplier: number
}
