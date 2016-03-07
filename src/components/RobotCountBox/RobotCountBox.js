import React from 'react'
import RobotsCount from './RobotsCount'
import CategoryCount from './CategoryCount'

type Props = {
  robots: number,
  categories: number
}

export class RobotCountBox extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <RobotsCount count={this.props.robots} />
        <div className='separator' />
        <CategoryCount count={this.props.categories} />
      </div>
    )
  }
}

export default RobotCountBox
