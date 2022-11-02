import { action } from 'mobx'

import { Frame } from './models'
import State, { InitialState } from './state'

/** Add a new frame to the game */
export const addFrame = action(() => {
  const frame: Frame = {
    rolls: []
  }

  State.frames.push(frame)
})

/** Add a new roll to current frame */
export const addRoll = action((knockedPins: number) => {
  const frame = State.frames[State.frames.length - 1]
  frame.rolls.push(knockedPins)
})

/** Return the previous frame, if possible */
export const getPreviousFrame = action(() => {
  return State.frames[State.frames.length - 2]
})

/** Get game score */
export const getGameScore = action(() => {
  let score = 0

  for (const frame of State.frames) {
    score += frame.score || 0
  }

  return score
})

/** Reset store to initial state. Useful when starting a new game session. */
export const resetGame = action(() => {
  Object.assign(State, InitialState)
})
