const Header = () => {
  return (
    <div className="flex gap-4 justify-center items-center py-4 bg-white shadow-lg">
      <img src="/pokeball.svg" alt="Pokeball Icon" className="w-10 h-10 select-none" />
      <span className="text-xl font-medium text-gray-600 select-none">
        Pokedex Application
      </span>
    </div>
  )
}

export default Header
