import React, { Component } from 'react'
import update from 'react/lib/update'

// include a component that adopts the DragSource and DropTarget protocols
import DogMemeCard from './DogMemeCard'

// create some data for testing
let demoCardData = [{
  id: 1,
  image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/45-funny-dog-memes/cute-funny-dog-meme-30.jpg',
}, {
  id: 2,
  image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/45-funny-dog-memes/cute-funny-dog-meme-8.jpg',
}, {
  id: 3,
  image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/45-funny-dog-memes/cute-funny-dog-meme-14.jpg',
}, {
  id: 4,
  image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/45-funny-dog-memes/cute-funny-dog-meme-31.jpg',
}, {
  id: 5,
  image: 'http://cdn1-www.dogtime.com/assets/uploads/gallery/45-funny-dog-memes/cute-funny-dog-meme-32.jpg',
}, {
  id: 6,
  image: 'http://cdn3-www.dogtime.com/assets/uploads/gallery/45-funny-dog-memes/cute-funny-dog-meme-34.jpg',
}, {
  id: 7,
  image: 'http://cdn2-www.dogtime.com/assets/uploads/gallery/45-funny-dog-memes/cute-funny-dog-meme-35.jpg'
}]

const style = {
  height: 200
}

class DogContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: demoCardData
    }
  }

  // implement drag and drop event handlers
  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      }
    }))

    // demonstrate new cards order is persisted in state
    console.log(this.state.cards)

    // TODO: persist new cards order to data store
  }

  render() {
    const { cards } = this.state

    return (
      <div style={style}>
        {cards.map((card, i) => (
          // render components that adopts the DragSource and DropTarget protcols
          <DogMemeCard
            key={card.id}
            index={i}
            id={card.id}
            image={card.image}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    )
  }
}

export default DogContainer
