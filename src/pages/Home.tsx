import { useState, useRef, useEffect } from 'react'
import { axiosHandler } from '../functions/axios'
import PokemonCard from '../components/PokemonCard'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [fetchUrl, setFetchUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=25')
  const [pokemonUrlList, setPokemonUrlList] = useState<string[]>([])

  const fetchDataFunc = async() => {
    setIsLoading(true)
    const endpoint = fetchUrl.split('v2/')[1]
    const [data, error] = await axiosHandler<any>(endpoint, 'GET')
    if (!error) {
      setPokemonUrlList((oldList) => {
        const newList = data!.results.map((m: any) => m.url)
        return [...oldList, ...newList]
      })
      setFetchUrl(data!.next)
    }
    setIsLoading(false)
  }
  const fetchData = useRef(fetchDataFunc)

  useEffect(() => { fetchData.current() }, [])

  const scrollOffset = 150
  // This function will set the value of position when the page is scrolled
  const onScroll = (e: any) => {
    const target = e.target as HTMLDivElement
    // If closer to the bottom than specified offset, we should load new data
    const shouldLoad = target.scrollHeight <= (target.scrollTop + target.clientHeight + scrollOffset)

    if (shouldLoad && isLoading === false) {
      fetchDataFunc()
    }
  }

  return (
    <div onScroll={onScroll} className='overflow-y-auto h-full'>
      <div className='flex flex-wrap gap-8 justify-center px-8 mx-auto mt-8 max-w-7xl'>
        {pokemonUrlList.map((url, i) => <PokemonCard url={url} key={i} />)}
      </div>
    </div>
  )
}

export default Home
