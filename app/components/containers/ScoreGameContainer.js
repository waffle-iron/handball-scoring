import { connect } from 'react-redux'

import { submitGame } from '../../redux/gamesActions'
import ScoreGame from '../ScoreGame'

const mapStateToProps = (state) => {
  return {
    game: state.games.get('game').toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const ScoreGameContainer = connect(mapStateToProps, mapDispatchToProps)(ScoreGame)

export default ScoreGameContainer
