import './LoaderLine.css'

interface props {
  width: string
  height: string
  classes?: string
}

const LoaderLine = ({ width, height, classes }: props) => {
  return (
    <div className={`rounded animate-skeleton ${classes}`} style={{ width, height }} />
  )
}

export default LoaderLine
