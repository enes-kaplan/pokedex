import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Link to='/' className="flex fixed inset-x-0 top-0 z-10 gap-4 justify-center items-center h-16 bg-white shadow-lg">
      <img src="/pokeball.svg" alt="Pokeball Icon" className="w-10 h-10 select-none" />
      <span className="text-xl font-medium text-gray-600 select-none">
        Pokedex Application
      </span>
    </Link>
  )
}

export default Header
