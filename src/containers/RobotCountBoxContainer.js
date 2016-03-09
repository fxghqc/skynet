import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { fetchCountIfNeeded } from 'redux/actions/actions'
import RobotCountBox from 'components/RobotCountBox/RobotCountBox'

type Props = {
  dispatch: Function,
  robots: Object,
  category: Object
}
export class RobotCountBoxContainer extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchCountIfNeeded('robots'))
    dispatch(fetchCountIfNeeded('category'))
  }

  props: Props;

  render () {
    return (
      <RobotCountBox robots={this.props.robots} category={this.props.category} />
    )
  }
}

const mapStateToProps = (state) => {
  const { postsApi } = state
  const {
    isFetching: isFetchingRobotsCount,
    lastUpdated: robotsLastUpdated,
    count: robotsCount
  } = postsApi['robots'] || {
    isFetching: true,
    count: null
  }

  const {
    isFetching: isFetchingCateCount,
    lastUpdated: cateLastUpdated,
    count: cateCount
  } = postsApi['category'] || {
    isFetching: true,
    count: null
  }

  return {
    robots: {
      isFetching: isFetchingRobotsCount,
      lastUpdated: robotsLastUpdated,
      count: robotsCount
    },
    category: {
      isFetching: isFetchingCateCount,
      lastUpdated: cateLastUpdated,
      count: cateCount
    }
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return { }
// }

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(RobotCountBoxContainer)
