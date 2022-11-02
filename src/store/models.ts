export interface Frame {
  /** Total score for this frame, initially none */
  score?: number
  /** Rolls on this frame */
  rolls: number[]
}

export interface AppState {
  /** Game frames */
  frames: Frame[]
  /** Maximum number of pins per frame */
  maxPins: number
  /** Calculate a strike score for previous frame on this roll */
  scoreStrikeAtRoll: number
  /** Calculate a spare score for previous frame on this roll */
  scoreSpareAtRoll: number
  /** Index of roll to check for "strike" */
  strikeIndicatorIndex: number
  /** A number to indicate last frame in a game */
  lastFrameIndicator: number
}
