import { axiosHandler } from './axios'
import { Pokemon, TypeRelation } from './types'

export const parsePokemonList = (unparsedPokemonList: any[]): Pokemon[] => {
  return unparsedPokemonList.map(m => parsePokemon(m))
}

export const parsePokemon = (unparsedPokemon: any, unparsedSpecies?: any): Pokemon => {
  const pokemon: Pokemon = {
    no: unparsedPokemon.id,
    name: capitalizeFirstLetterOfEveryWord(unparsedPokemon.name),
    image: unparsedPokemon.sprites.other['official-artwork']['front_default'],
    height: `${(unparsedPokemon.height / 10).toFixed(1).toString()} m`,
    weight: `${(unparsedPokemon.weight / 10).toFixed(1).toString()} kg`,
    abilities: unparsedPokemon.abilities.map((m: any) => capitalizeFirstLetterOfEveryWord(m.ability.name)),
    baseStats: unparsedPokemon.stats.map((m: any) => { return { name: m.stat.name, value: m.base_stat } }),
    types: unparsedPokemon.types.map((m: any) => { return { name: m.type.name, color: findTypeColor(m.type.name) } }),
    genderRate: 0,
    description: '',
    habitat: ''
  }

  if (unparsedSpecies) {
    const descObj = unparsedSpecies['flavor_text_entries'].find((f: any) => f.language.name === 'en' && f.version.name === 'shield')
    pokemon.description = descObj?.flavor_text
    pokemon.habitat = capitalizeFirstLetterOfEveryWord(unparsedSpecies.habitat.name)
    pokemon.genderRate = unparsedSpecies['gender_rate']
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

export const getTypeRelations = async(unparsedPokemon: any) => {
  const typeRelations: TypeRelation[] = []

  for (let i = 0; i < unparsedPokemon.types.length; i++) {
    const type = unparsedPokemon.types[i]
    const [typeDetails, error] = await axiosHandler<any>(`type/${type.type.name}`, 'GET')
    if (typeDetails) {
      // Defense
      const doubleFrom: string[] = typeDetails['damage_relations']['double_damage_from'].map((type: any) => type.name)
      const halfFrom: string[] = typeDetails['damage_relations']['half_damage_from'].map((type: any) => type.name)
      const zeroFrom: string[] = typeDetails['damage_relations']['no_damage_from'].map((type: any) => type.name)

      doubleFrom.forEach(rel => {
        const existingRel = typeRelations.find(f => f.name === rel)
        // If this relation already exists, multiplier * 2. Otherwise, multiplier equals to 2.
        if (existingRel) {
          existingRel.multiplier = existingRel.multiplier * 2
        } else {
          typeRelations.push({ name: rel, color: findTypeColor(rel), multiplier: 2 })
        }
      })
      halfFrom.forEach(rel => {
        const existingRel = typeRelations.find(f => f.name === rel)
        if (existingRel) {
          existingRel.multiplier = existingRel.multiplier * 0.5
        } else {
          typeRelations.push({ name: rel, color: findTypeColor(rel), multiplier: 0.5 })
        }
      })
      zeroFrom.forEach(rel => {
        const existingRel = typeRelations.find(f => f.name === rel)
        // Set the multiplier to zero for all cases
        if (existingRel) {
          existingRel.multiplier = 0
        } else {
          typeRelations.push({ name: rel, color: findTypeColor(rel), multiplier: 0 })
        }
      })
    }
  }

  // Attacks that the Pokemon takes less damage from
  const strongAgainst = typeRelations.filter(f => f.multiplier < 1)
  // Attacks that the Pokemon takes more damage from
  const weakAgainst = typeRelations.filter(f => f.multiplier > 1)

  return [strongAgainst, weakAgainst]
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
