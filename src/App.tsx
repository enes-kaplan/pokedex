import { Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import PokemonGuess from './pages/PokemonGuess'

const App = () => {
  return (
    <div className="overflow-x-hidden w-screen h-screen">
      <Header />
      <div className='overflow-hidden mt-16 h-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:no" element={<PokemonDetail />} />
          <Route path="/whosthatpokemon" element={<PokemonGuess />} />
          {/* <Route path="about" element={<About />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App
