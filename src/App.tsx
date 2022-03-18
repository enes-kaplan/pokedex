import Header from './layout/Header'
import PokemonList from './components/PokemonList'

const App = () => {
  return (
    <div className="overflow-y-auto pb-8 w-screen h-screen bg-slate-100">
      <Header />
      <PokemonList />
    </div>
  )
}

export default App
