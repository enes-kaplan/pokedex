import type { Pokemon } from '../functions/types'
import { useState, useEffect } from 'react'
import { axiosHandler } from '../functions/axios'
import { parsePokemon } from '../functions/common'


const PokemonGuess = () => {
  const [loading, setLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [correctGuess, setCorrectGuess] = useState(false)
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [max, setMax] = useState(898)
  const [guess, setGuess] = useState('')
  const [error, setError] = useState(false)

  const getRandomPokeNoFunc = () => Math.floor(Math.random() * max)

  const fetchDataFunc = async() => {
    setLoading(true)
    const pokeNo = getRandomPokeNoFunc()
    const [data, error] = await axiosHandler<any>(`pokemon/${pokeNo}`, 'GET')
    if (!error) {
      const parsedPokemon = parsePokemon(data)
      setShowResults(false)
      setPokemon(parsedPokemon)
    }

    setTimeout(() => {
      setLoading(false)
    }, 250)
  }

  useEffect(() => {
    const initialFetch = async() => {
      setLoading(true)

      const pokeNo = Math.floor(Math.random() * max)
      const [data, error] = await axiosHandler<any>(`pokemon/${pokeNo}`, 'GET')

      if (!error) {
        const parsedPokemon = parsePokemon(data)
        setShowResults(false)
        setPokemon(parsedPokemon)
      }

      setTimeout(() => {
        setLoading(false)
      }, 250)
    }
    initialFetch()
  }, [max])

  const reroll = () => { fetchDataFunc() }
  const next = () => {
    if (showResults) {
      setGuess('')
      reroll()
    } else if (guess.trim().length === 0) {
      setError(true)
    } else {
      setCorrectGuess(guess.toLowerCase() === pokemon?.name.toLowerCase())
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

  const oldSchool = async() => {
    setCorrectGuess(false)
    setShowResults(false)
    setMax(151)
  }

  return (
    <div className='flex overflow-y-auto flex-col gap-4 px-8 pb-16 mx-auto mt-8 max-w-7xl sm:pb-0 h-content'>
      <div className='flex flex-col gap-2 justify-center px-8 mx-auto sm:flex-row sm:gap-8'>
        <div className='flex flex-col items-center'>
          {loading && <img src='/loader.gif' alt='Loader' className='w-40 h-40 sm:w-60 sm:h-60' />}
          {pokemon && !loading
            && <img
              src={pokemon?.image}
              alt={'Who\'s this pokemon?'}
              className={`w-40 h-40 sm:w-60 sm:h-60 pointer-events-none select-none transition-default ${!showResults && 'hidden-pokemon'}`}
            />
          }
          {!loading && showResults
            ? <h2 className={correctGuess ? 'text-emerald-600' : 'text-red-600'}>{pokemon?.name}</h2>
            : <h2>&nbsp;</h2>
          }
        </div>
        <div className='flex flex-col gap-2 sm:gap-8'>
          <h2>Who's that Pokemon?</h2>
          <input
            value={guess}
            type='text'
            className={`py-2 px-4 border border-gray-500 rounded outline-none ${error ? 'border-red-600' : ''}`}
            placeholder='*case insensitive*'
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
