import PokemonCard from './PokemonCard'

interface props {
  pokemonUrlList: string[]
}

const PokemonList = ({ pokemonUrlList }: props) => {
  return (
    <div className='flex flex-wrap gap-8 justify-center px-8 mx-auto mt-8 max-w-7xl'>
      {pokemonUrlList.map((url, i) => <PokemonCard url={url} key={i} />)}
    </div>
  )
}

export default PokemonList
