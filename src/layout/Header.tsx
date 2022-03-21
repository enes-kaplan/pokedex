import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex fixed inset-x-0 top-0 z-10 justify-between items-center px-12 w-screen h-16 bg-white shadow-lg'>
      <Link to='/' className="flex gap-4 items-center">
        <img src="/pokeball.svg" alt="Pokeball Icon" className="self-center w-10 h-10 select-none" />
        <span className='text-sm font-medium text-gray-600 select-none sm:text-xl'>
          Pokedex Application
        </span>
      </Link>
      <Link to='/whosthatpokemon' className='flex items-center hover:underline transition-hover'>
        <img src="/pokedex.png" alt="Pokedex Icon" className="self-center w-16 select-none" />
        <span className='text-sm font-medium text-gray-600 select-none sm:text-xl'>
          Who's that Pokemon?
        </span>
      </Link>
    </div>
  )
}

export default Header
