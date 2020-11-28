import EaselAction from './EaselAction'
import EaselActionType from './EaselActionType'
import EaselEventType from './EaselEventType'
import EaselState from './EaselState'
import easelStateReducer from './easelStateReducer'

describe('easelStateReducer', () => {
  const initialState: EaselState = {
    isDrawing: false,
    stroke: '#000',
  }

  test('should return strictly equal state for invalid action', () => {
    const state = Object.assign({}, initialState)
    const action = {} as any
    expect(easelStateReducer(state, action)).toBe(state)
  })

  describe('MouseDown Action', () => {
    test('should set isDrawing true', () => {
      const state = Object.assign({}, initialState)
      const action: EaselAction = {
        type: EaselActionType.MouseDown,
        x: 13,
        y: 31,
        dx: 1,
        dy: 2,
      }
      const expected: EaselState = {
        isDrawing: true,
        stroke: '#000',
      }
      expect(easelStateReducer(state, action)).toEqual(expected)
    })
  })

  describe('MouseUp Action', () => {
    test('should set isDrawing false', () => {
      const state = Object.assign({}, initialState, { isDrawing: true })
      const action: EaselAction = {
        type: EaselActionType.MouseUp,
        x: 13,
        y: 31,
        dx: 1,
        dy: 2,
      }
      const expected: EaselState = {
        isDrawing: false,
        stroke: '#000',
      }
      expect(easelStateReducer(state, action)).toEqual(expected)
    })
  })

  describe('SetStroke Action', () => {
    test('should set stroke', () => {
      const state = Object.assign({}, initialState, { stroke: '#bbb' })
      const action: EaselAction = {
        type: EaselActionType.SetStroke,
        stroke: '#eee',
      }
      const expected: EaselState = {
        isDrawing: false,
        stroke: '#eee',
      }
      expect(easelStateReducer(state, action)).toEqual(expected)
    })
  })
})
