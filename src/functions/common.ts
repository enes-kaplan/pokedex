import { Pokemon } from './types'

export const parsePokemonList = (unparsedPokemonList: any[]): Pokemon[] => {
  return unparsedPokemonList.map(m => parsePokemon(m))
}

export const parsePokemon = (unparsedPokemon: any): Pokemon => {
  const pokemon: Pokemon = {
    name: unparsedPokemon.name,
    image: unparsedPokemon.sprites.other['official-artwork']['front_default'],
    description: 'NotFound',
    height: `${(unparsedPokemon.height / 10).toFixed(1).toString()} m`,
    weight: `${(unparsedPokemon.weight / 10).toFixed(1).toString()} kg`,
    habitat: 'Chill',
    baseStats: unparsedPokemon.stats.map((m: any) => { return { name: m.stat.name, value: m.base_stat } }),
    types: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, color: findTypeColor(m.type.name) } }),
    strongAgainst: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, color: findTypeColor(m.type.name) } }),
    weakAgainst: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, color: findTypeColor(m.type.name) } })
    // TODO: Calculate strong/weak against
  }

  return pokemon
}

const findTypeColor = (type: string) => {
  switch (type) {
  case 'psychic':
    return '#F00000'
  default:
    return '#F0F000'
  }
}
