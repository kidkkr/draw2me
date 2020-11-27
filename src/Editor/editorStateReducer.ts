import produce from 'immer'
import EditorAction from './EditorAction'
import EditorActionType from './EditorActionType'
import EditorState from './EditorState'

const editorStateReducer = produce((draft: EditorState, action: EditorAction) => {
  switch (action.type) {
    case EditorActionType.MouseDown:
      draft.isDrawing = true
      return

    case EditorActionType.MouseUp:
      draft.isDrawing = false
      return

    case EditorActionType.SetStroke:
      draft.stroke = action.stroke
      return

    default:
      return
  }
})

export default editorStateReducer
