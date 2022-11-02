import { addRoll, addFrame, getGameScore, resetGame } from './index'

describe('index.ts tests', () => {
  it('calculates score for spares correctly', () => {
    resetGame()

    const frames = [
      { knocked: [4, 3] }, // score is 7
      { knocked: [7, 3] }, // score is 15
      { knocked: [5, 2] }, // score is 7
      { knocked: [8, 1] }, // score is 9
      { knocked: [4, 6] }, // score is 12
      { knocked: [2, 4] }, // score is 6
      { knocked: [8, 0] }, // score is 8
      { knocked: [8, 0] }, // score is 8
      { knocked: [8, 2] }, // score is 20
      { knocked: [10, 1, 7] } // score is 18
    ]

    for (const frame of frames) {
      addFrame()

      for (const knocked of frame.knocked) {
        addRoll(knocked)
      }
    }

    expect(getGameScore()).toBe(110)
  })

  it('calculates score for strikes correctly', () => {
    resetGame()
    
    const frames = [
      { knocked: [4, 3] }, // score is 7
      { knocked: [7, 3] }, // score is 15
      { knocked: [5, 2] }, // score is 7
      { knocked: [8, 1] }, // score is 9
      { knocked: [10, 0] }, // score is 16
      { knocked: [2, 4] }, // score is 6
      { knocked: [10, 0] }, // score is 18
      { knocked: [8, 0] }, // score is 8
      { knocked: [8, 2] }, // score is 20
      { knocked: [10, 1, 8] } // score is 19
    ]

    for (const frame of frames) {
      addFrame()

      for (const knocked of frame.knocked) {
        addRoll(knocked)
      }
    }

    expect(getGameScore()).toBe(125)
  })
})
