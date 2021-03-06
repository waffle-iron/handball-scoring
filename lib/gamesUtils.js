
import firebase from './firebaseConfig'

export const EVENT_GOAL = 'goal'
export const EVENT_7_METER = '7m'
export const EVENT_YELLOW_CARD = 'yc'
export const EVENT_2_MINUTE = '2m'
export const EVENT_RED_CARD = 'rc'

export function saveGame (gameObj) {
  const gameKey = firebase.database().ref('games').push().key
  let updates = {}
  updates['/games/' + gameKey] = gameObj
  firebase.database().ref().update(updates)
  return gameKey
}

export function getGames (reciveGames) {
  firebase.database().ref('games').on('value', games => {
    reciveGames(games.val())
  })
}

export function getGame (gameKey) {
  return firebase.database().ref('games/' + gameKey).once('value')
    .then(game => {
      return game.val()
    })
}

export function getTeam (teamKey) {
  return firebase.database().ref('teams/' + teamKey).once('value')
    .then(team => {
      return team.val()
    })
}

export function updateGameChild (gameKey, key, value) {
  let updates = {}
  updates['games/' + gameKey + '/' + key] = value
  firebase.database().ref().update(updates)
}

export function appendPlayersToGame (gameKey) {
  let gameObj = {}
  getGame(gameKey)
    .then(game => {
      gameObj = game
      gameObj.gameKey = gameKey
      return getTeam(game.home_team)
    })
    .then(homeTeam => {
      const teamKey = gameObj.home_team
      gameObj.home_team = homeTeam
      gameObj.home_team.key = teamKey
      return getTeam(gameObj.away_team)
    })
    .then(awayTeam => {
      const teamKey = gameObj.away_team
      gameObj.away_team = awayTeam
      gameObj.away_team.key = teamKey
      gameObj.status_initialized = true
      updateGame(gameKey, gameObj)
    })
    .catch(err => {
      console.error(err)
    })
}

function updateGame (gameKey, gameObj) {
  let updates = {}
  updates['games/' + gameKey] = gameObj
  firebase.database().ref().update(updates)
}

export function removeGame (gameKey) {
  firebase.database().ref('games/' + gameKey).remove()
}

export function pushEvent (gameKey, eventObj) {
  const eventKey = firebase.database().ref('games/' + gameKey + '/events').push().key
  let updates = {}
  updates['/games/' + gameKey + '/events/' + eventKey] = eventObj
  firebase.database().ref().update(updates)
}
