import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { fetchPostsIfNeeded } from '../redux/actions'
import RobotCountBox from 'components/RobotCountBox'

type Props = {
  dispatch: Function,
  selectedSubreddit: String
}
export class RobotCountBoxContainer extends React.Component {
  componentDidMount () {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  props: Props;

  render () {
    return (
      <RobotCountBox />
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RobotCountBoxContainer)
