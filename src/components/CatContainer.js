import React, { Component } from 'react'
import update from 'react/lib/update'

// include a component that adopts the DragSource and DropTarget protocols
import CatBreedCard from './CatBreedCard'

// create some data for testing
let demoCardData = [{
  id: 1,
  text: 'British Shorthair',
}, {
  id: 2,
  text: 'Siamese cat',
}, {
  id: 3,
  text: 'Persian cat',
}, {
  id: 4,
  text: 'Maine Coon',
}, {
  id: 5,
  text: 'Ragdoll',
}, {
  id: 6,
  text: 'American Shorthair',
}, {
  id: 7,
  text: 'Abyssinian cat'
}]

const style = {
  width: 400
}

class Container extends Component {
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
          <CatBreedCard
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    )
  }
}

export default Container
