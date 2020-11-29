import EaselAction from './EaselAction'
import EaselActionType from './EaselActionType'
import easelEventReducer from './easelEventReducer'
import EaselEventType from './EaselEventType'
import EaselState from './EaselState'
import EaselTool from './EaselTool'

describe('easelEventReducer', () => {
  const initialState: EaselState = {
    isDrawing: false,
    stroke: '#000',
    tool: EaselTool.Pen,
    strokeWidth: 1,
  }

  test('Should return undefined for invalid action', () => {
    const state = Object.assign({}, initialState)
    const action = {} as any
    expect(easelEventReducer(state, action)).toBeUndefined()
  })

  describe('MouseMove Action', () => {
    test('if it is not drawing, should return undefined', () => {
      const state = Object.assign({}, initialState, { isDrawing: false })
      const action: EaselAction = {
        type: EaselActionType.MouseMove,
        x: 13,
        y: 31,
        dx: 1,
        dy: 2,
      }
      expect(easelEventReducer(state, action)).toBeUndefined()
    })

    test('if it is drawing with pen, should return Draw event with path', () => {
      const state = Object.assign({}, initialState, {
        isDrawing: true,
        tool: EaselTool.Pen,
        stroke: '#eee',
        strokeWidth: 7,
      })
      const action: EaselAction = {
        type: EaselActionType.MouseMove,
        x: 13,
        y: 31,
        dx: 1,
        dy: 2,
      }
      const expected = {
        type: EaselEventType.Draw,
        stroke: '#eee',
        strokeWidth: 7,
        path: `M 13 31 L 14 33`,
      }
      expect(easelEventReducer(state, action)).toEqual(expected)
    })

    test('if it is drawing with eraser, should return Draw event with path', () => {
      const state = Object.assign({}, initialState, {
        isDrawing: true,
        tool: EaselTool.Eraser,
        strokeWidth: 7,
      })
      const action: EaselAction = {
        type: EaselActionType.MouseMove,
        x: 13,
        y: 31,
        dx: 1,
        dy: 2,
      }
      const expected = {
        type: EaselEventType.Erase,
        strokeWidth: 7,
        path: `M 13 31 L 14 33`,
      }
      expect(easelEventReducer(state, action)).toEqual(expected)
    })
  })

  describe('MouseUp Action', () => {
    test('if it is not drawing, should return undefined', () => {
      const state = Object.assign({}, initialState, { isDrawing: false })
      const action: EaselAction = {
        type: EaselActionType.MouseUp,
        x: 13,
        y: 31,
        dx: 1,
        dy: 2,
      }
      expect(easelEventReducer(state, action)).toBeUndefined()
    })

    test('if it is drawing, should return DrawEnd event', () => {
      const state = Object.assign({}, initialState, { isDrawing: true })
      const action: EaselAction = {
        type: EaselActionType.MouseUp,
        x: 13,
        y: 31,
        dx: 1,
        dy: 2,
      }
      const expected = {
        type: EaselEventType.DrawEnd,
      }
      expect(easelEventReducer(state, action)).toEqual(expected)
    })
  })

  describe('Undo Action', () => {
    test('should return an undo event', () => {
      const state = Object.assign({}, initialState)
      const action: EaselAction = {
        type: EaselActionType.Undo,
      }
      const expected = {
        type: EaselEventType.Undo,
      }
      expect(easelEventReducer(state, action)).toEqual(expected)
    })
  })

  describe('Redo Action', () => {
    test('should return a redo event', () => {
      const state = Object.assign({}, initialState)
      const action: EaselAction = {
        type: EaselActionType.Redo,
      }
      const expected = {
        type: EaselEventType.Redo,
      }
      expect(easelEventReducer(state, action)).toEqual(expected)
    })
  })
})
