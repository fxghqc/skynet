import React from 'react'

type Props = {
  count: number
}

export class RobotsCount extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <div>{this.props.count}</div>
        <div>robots</div>
      </div>
    )
  }
}

export default RobotsCount
