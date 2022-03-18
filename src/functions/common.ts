import { Pokemon } from './types'

export const parsePokemonList = (unparsedPokemonList: any[]): Pokemon[] => {
  return unparsedPokemonList.map(m => parsePokemon(m))
}

export const parsePokemon = (unparsedPokemon: any): Pokemon => {
  const pokemon: Pokemon = {
    no: unparsedPokemon.id,
    name: capitalizeFirstLetterOfEveryWord(unparsedPokemon.name),
    image: unparsedPokemon.sprites.other['official-artwork']['front_default'],
    description: 'NotFound',
    height: `${(unparsedPokemon.height / 10).toFixed(1).toString()} m`,
    weight: `${(unparsedPokemon.weight / 10).toFixed(1).toString()} kg`,
    habitat: 'Chill',
    baseStats: unparsedPokemon.stats.map((m: any) => { return { name: m.stat.name, value: m.base_stat } }),
    types: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, background: findTypeBackground(m.type.name), color: findTypeColor(m.type.name) } }),
    strongAgainst: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, background: findTypeBackground(m.type.name), color: findTypeColor(m.type.name) } }),
    weakAgainst: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, background: findTypeBackground(m.type.name), color: findTypeColor(m.type.name) } })
    // TODO: Calculate strong/weak against
  }

  return pokemon
}

const findTypeBackground = (type: string) => {
  // TODO: Calculate type colorings
  switch (type) {
  case 'psychic':
    return '#F00000'
  default:
    return '#A0A0A0'
  }
}
const findTypeColor = (type: string) => {
  // TODO: Calculate type colorings
  switch (type) {
  case 'psychic':
    return '#000'
  default:
    return '#FFF'
  }
}

export const capitalizeFirstLetterOfEveryWord = (str: string, localization = 'EN', lowerCaseAllFirst = false) => {
  let result = str.split(' ')
  if (lowerCaseAllFirst) {
    result = str.toLocaleLowerCase(localization).split(' ')
  }

  for (let i = 0; i < result.length; ++i) {
    result[i] = result[i].charAt(0).toLocaleUpperCase(localization) + result[i].slice(1)
  }

  return result.join(' ')
}
