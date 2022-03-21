import './LoaderLine.css'

interface props {
  width: string
  height: string
}

const LoaderLine = ({ width, height }: props) => {
  return (
    <div className='rounded animate-skeleton' style={{ width, height }} />
  )
}

export default LoaderLine
