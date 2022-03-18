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
    types: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, color: findTypeColor(m.type.name) } }),
    strongAgainst: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, color: findTypeColor(m.type.name) } }),
    weakAgainst: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, color: findTypeColor(m.type.name) } })
    // TODO: Calculate strong/weak against
  }

  return pokemon
}

const findTypeColor = (type: string) => {
  switch (type) {
  case 'bug':
    return '#A8B82F'
  case 'dark':
    return '#6F5849'
  case 'dragon':
    return '#7235F5'
  case 'electric':
    return '#F5D040'
  case 'fairy':
    return '#807870'
  case 'fire':
    return '#EC4D37'
  case 'flying':
    return '#A98FEE'
  case 'ghost':
    return '#705897'
  case 'grass':
    return '#7BC956'
  case 'ground':
    return '#DEC06D'
  case 'ice':
    return '#9CD8D8'
  case 'normal':
    return '#A7A87A'
  case 'poison':
    return '#9E3E9F'
  case 'psychic':
    return '#F45589'
  case 'rock':
    return '#B6A040'
  case 'shadow':
    return '#403246'
  case 'steel':
    return '#B8B8CF'
  case 'water':
    return '#6D90EE'
  case 'unknown':
    return '#7BC956'
  default:
    return '#6BA090'
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
