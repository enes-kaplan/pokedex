import { useState, useEffect } from 'react'
import { axiosHandler } from '../functions/axios'
import PokemonCard from './PokemonCard'

const PokemonList = () => {
  const [pokemonUrlList, setPokemonUrlList] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async() => {
      const [data, error] = await axiosHandler<any>('pokemon/?limit=25', 'GET')
      if (!error) {
        setPokemonUrlList(data!.results.map((m: any) => m.url))
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-wrap gap-8 justify-center px-8 mx-auto mt-8 max-w-7xl'>
      {pokemonUrlList.map((url, i) => <PokemonCard url={url} key={i} />)}
    </div>
  )
}

export default PokemonList
