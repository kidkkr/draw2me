import EditorAction from './EditorAction'
import EditorActionType from './EditorActionType'
import EditorEvent from './EditorEvent'
import EditorEventType from './EditorEventType'
import EditorState from './EditorState'

const editorEventReducer = (state: EditorState, action: EditorAction): EditorEvent | undefined => {
  switch (action.type) {
    case EditorActionType.MouseMove: {
      if (!state.isDrawing) return
      const { x, y, dx, dy } = action
      const path = `M ${x} ${y} L ${x + dx} ${y + dy}`
      return {
        type: EditorEventType.Draw,
        stroke: state.stroke,
        path,
      }
    }

    case EditorActionType.MouseUp:
      if (!state.isDrawing) return
      return { type: EditorEventType.DrawEnd }
    
    case EditorActionType.Undo:
      return { type: EditorEventType.Undo }

    case EditorActionType.Redo:
      return { type: EditorEventType.Redo }

    default:
      return
  }

}

export default editorEventReducer
