import { useState, useRef, useEffect } from 'react'
import { axiosHandler } from './functions/axios'
import Header from './layout/Header'
import PokemonList from './components/PokemonList'

const App = () => {
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

  useEffect(() => {
    fetchData.current()
  }, [])

  const scrollOffset = 150
  // This function will set the value of position when the page is scrolled
  const onScroll = (e: any) => {
    const target = e.target as HTMLDivElement
    // If closer to the bottom than specified offset, we should load new data
    const shouldLoad = target.scrollHeight <= (target.scrollTop + target.clientHeight + scrollOffset)

    if (shouldLoad && isLoading === false) {
      fetchData.current()
    }
  }

  return (
    <div onScroll={onScroll} className="overflow-y-auto pb-8 w-screen h-screen bg-slate-100">
      <Header />
      <PokemonList pokemonUrlList={pokemonUrlList} />
    </div>
  )
}

export default App
