import { useParams } from 'react-router-dom'

const PokemonDetail = () => {
  const routeParams = useParams()

  return (
    <div>{routeParams.no}</div>
  )
}

export default PokemonDetail
