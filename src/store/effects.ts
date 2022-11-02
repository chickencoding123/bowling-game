import { autorun } from 'mobx'

import { getPreviousFrame } from './actions'
import State from './state'

autorun(() => {
  if (State.frames.length < 2 || State.frames.length > State.lastFrameIndicator) {
    // Do not run scoring until we have a frame to score
    return
  }

  const frame = State.frames[State.frames.length - 1]
  const prevFrame = getPreviousFrame()
  const isLastFrame = State.frames.length === State.lastFrameIndicator

  // Try to score the previous frame
  const prevFrameSum = prevFrame.rolls.reduce((a, b) => a + b, 0)
  const wasStrike = prevFrame.rolls[State.strikeIndicatorIndex] === State.maxPins
  const wasSpare = prevFrameSum === State.maxPins
  const canScoreStrike = frame.rolls.length === State.scoreStrikeAtRoll
  const canScoreSpare = frame.rolls.length === State.scoreSpareAtRoll

  if (wasStrike && canScoreStrike) {
    // Score as a strike

    let score = 10

    for (let i = 0; i < State.scoreStrikeAtRoll; i++) {
      score += frame.rolls[i]
    }

    prevFrame.score = score
  } else if (!wasStrike && wasSpare && canScoreSpare) {
    // Score as a spare

    let score = 10

    for (let i = 0; i < State.scoreSpareAtRoll; i++) {
      score += frame.rolls[i]
    }

    prevFrame.score = score
  } else if (!wasStrike && !wasSpare) {
    // Score as a simple sum

    prevFrame.score = prevFrameSum
  }

  if (isLastFrame && frame.rolls.length > 1) {
    // Rules of the last frame. First roll must be a strike or game is over. Second roll must be hit or game is over.

    const canContinue = frame.rolls.length === 2 ? frame.rolls[1] > 0 : frame.rolls[0] === State.maxPins

    if (!canContinue) {
      // Game is over
      State.lastFrameIndicator = 0
    }

    frame.score = frame.rolls.reduce((a, b) => a + b, 0)
  }
})