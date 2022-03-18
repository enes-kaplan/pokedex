// import {} from 'react'
import './FlipCard.css'

interface props {
  front: any
  back: any
}

const FlipCard = ({ front, back }: props) => {
  return (
    <div className='flip-card'>
      <div className='flip-card-inner'>
        {front}
        {back}
      </div>
    </div>
  )
}

export default FlipCard
