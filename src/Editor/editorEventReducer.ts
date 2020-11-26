import EditorAction from './EditorAction'
import EditorActionType from './EditorActionType'
import EditorEvent from './EditorEvent'
import EditorEventType from './EditorEventType'
import EditorState from './EditorState'

const editorEventReducer = (state: EditorState, action: EditorAction): EditorEvent | undefined => {
  if (!state.isDrawing) return

  switch (action.type) {
    case EditorActionType.MouseMove: {
      const { x, y, dx, dy } = action
      const path = `M ${x} ${y} L ${x + dx} ${y + dy}`
      return {
        type: EditorEventType.Draw,
        stroke: state.stroke,
        path,
      }
    }

    default:
      return
  }

}

export default editorEventReducer
