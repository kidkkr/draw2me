import CanvasData from './CanvasData'
import EditorAction from './EditorAction'
import EditorActionType from './EditorActionType'
import EditorState from './EditorState'

const drawCanvasData = (state: EditorState, action: EditorAction): CanvasData | null => {
  if (!state.isDrawing) return null

  switch (action.type) {
    case EditorActionType.MouseMove: {
      const { x, y } = action.payload
      return {
        data: state.color,
        width: 1,
        height: 1,
        dx: x,
        dy: y,
      }
    }

    default:
      return null
  }

}

export default drawCanvasData
