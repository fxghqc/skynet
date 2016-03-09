import React from 'react'
import RobotsCount from '../RobotsCount/RobotsCount'
import CategoryCount from '../CategoryCount/CategoryCount'

type Props = {
  robots: Object,
  category: Object
}

export class RobotCountBox extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <RobotsCount count={this.props.robots.count} />
        <div className='separator' />
        <CategoryCount count={this.props.category.count} />
      </div>
    )
  }
}

export default RobotCountBox
