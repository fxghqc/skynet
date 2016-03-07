import React from 'react'

type Props = {
  count: number
}

export class CategoryCount extends React.Component {
  props: Props;

  render () {
    return (
      <div>
        <div>categories: </div><div>this.props.count</div>
      </div>
    )
  }
}

export default CategoryCount
