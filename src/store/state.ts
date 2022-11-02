import { observable } from 'mobx'

import { AppState } from './models'

export const InitialState = {
  frames: [],
  maxPins: 10,
  scoreStrikeAtRoll: 2,
  scoreSpareAtRoll: 1,
  strikeIndicatorIndex: 0,
  lastFrameIndicator: 10
}

export default observable<AppState>(InitialState)
