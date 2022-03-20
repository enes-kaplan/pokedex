import type { Pokemon } from '../functions/types'
import { useState, useRef, useEffect } from 'react'
import { axiosHandler } from '../functions/axios'
import { parsePokemon } from '../functions/common'

const getRandomPokeNo = () => Math.floor(Math.random() * 898)

const PokemonGuess = () => {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [guess, setGuess] = useState('')
  const fetchDataFunc = async() => {
    const pokeNo = getRandomPokeNo()
    const [data, error] = await axiosHandler<any>(`pokemon/${pokeNo}`, 'GET')
    if (!error) {
      const parsedPokemon = parsePokemon(data)
      setPokemon(parsedPokemon)
    }
  }
  const fetchData = useRef(fetchDataFunc)
  const reroll = () => { fetchData.current() }

  useEffect(() => {
    fetchData.current()
  }, [])

  return (
    <div className='flex gap-8 justify-center px-8 mx-auto mt-8 max-w-7xl'>
      <img src={pokemon?.image ?? '/loader.gif'} alt={'Who\'s this pokemon?'} className='w-60 h-60 hidden-pokemon' />
      <div className='flex flex-col gap-8'>
        <h2>Who's that Pokemon?</h2>
        <input
          value={guess}
          type='text'
          className=''
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
    </div>
  )
}

export default PokemonGuess
