import type { Pokemon } from '../functions/types'
import { useState, useRef, useEffect } from 'react'
import { axiosHandler } from '../functions/axios'
import { parsePokemon } from '../functions/common'


const PokemonGuess = () => {
  const [showResults, setShowResults] = useState(false)
  const [correctGuess, setCorrectGuess] = useState(false)
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [max, setMax] = useState(898)
  const [guess, setGuess] = useState('')
  const [error, setError] = useState(false)

  const getRandomPokeNoFunc = () => Math.floor(Math.random() * max)
  const getRandomPokeNo = useRef(getRandomPokeNoFunc)

  const fetchDataFunc = async() => {
    const pokeNo = getRandomPokeNoFunc()
    const [data, error] = await axiosHandler<any>(`pokemon/${pokeNo}`, 'GET')
    if (!error) {
      const parsedPokemon = parsePokemon(data)
      setShowResults(false)
      setPokemon(parsedPokemon)
    }
  }
  const fetchData = useRef(fetchDataFunc)

  useEffect(() => {
    fetchDataFunc()
  }, [])

  const reroll = () => { fetchDataFunc() }
  const next = () => {
    if (showResults) {
      setGuess('')
      reroll()
    } else if (guess.trim().length === 0) {
      setError(true)
    } else {
      setCorrectGuess(guess === pokemon?.name)
      setShowResults(true)
    }
  }
  const buttonText = () => {
    if (!showResults) {
      return 'Make a guess...'
    }
    if (correctGuess) {
      return 'Guess another!'
    }
    return 'Try again!'
  }

  const oldSchool = () => {
    setMax(151)
    setCorrectGuess(false)
    setShowResults(false)
    reroll()
  }

  return (
    <div className='flex flex-col gap-8 justify-center px-8 mx-auto mt-8 max-w-7xl'>
      <div className='flex gap-8 justify-center px-8 mx-auto'>
        <div className='flex flex-col gap-4 items-center'>
          <img src={pokemon?.image} alt={'Who\'s this pokemon?'} className={`w-60 h-60 ${!showResults && 'hidden-pokemon'}`} />
          {showResults && <h2 className={correctGuess ? 'text-emerald-600' : 'text-red-600'}>{pokemon?.name}</h2>}
          {!showResults && <h2>&nbsp;</h2>}
        </div>
        <div className='flex flex-col gap-8'>
          <h2>Who's that Pokemon?</h2>
          <input
            value={guess}
            type='text'
            className={`py-2 px-4 border border-gray-500 rounded outline-none ${error ? 'border-red-600' : ''}`}
            placeholder='Enter Pokemon name'
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') { next() }
            }}
          />
          <button
            className='py-2 px-4 text-lg font-medium text-white bg-emerald-600 rounded'
            onClick={next}
          >
            {buttonText()}
          </button>
        </div>
      </div>
      <button
        className='py-2 px-4 text-lg font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-hover'
        onClick={oldSchool}
      >
          Use only first gen!
      </button>
    </div>
  )
}

export default PokemonGuess
