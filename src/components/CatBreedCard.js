import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
}

// base component
// this component should render cat breed card for use in a vertical list
class CatBreedCard extends Component {
  static propTypes = {
    // properties relevant to this component
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,

    // properties to help manage a sortable list
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    // declare intent to adopt the drag source protocol
    connectDragSource: PropTypes.func.isRequired,
    // decalare intent to adopt the drop target protocol
    connectDropTarget: PropTypes.func.isRequired,
    // parent collection component will handle reordering
    moveCard: PropTypes.func.isRequired
  }

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props
    const opacity = isDragging ? 0 : 1

    // render the component with the adopted protocols
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
      {text}
      </div>
    ))
  }
}

// adopt the protocol to make this component draggable
let DragSourceCard = DragSource(ItemTypes.CAT, {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(CatBreedCard)

// adopt the protocol to make this component a drop target
let DropTargetCard = DropTarget(ItemTypes.CAT, {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSourceCard)

// export the component with all adopted protocols
export default DropTargetCard
