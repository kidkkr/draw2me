import produce from 'immer'
import EaselAction from './EaselAction'
import EaselActionType from './EaselActionType'
import EaselState from './EaselState'

const easelStateReducer = produce((draft: EaselState, action: EaselAction) => {
  switch (action.type) {
    case EaselActionType.MouseDown:
      draft.isDrawing = true
      return

    case EaselActionType.Undo:
    case EaselActionType.Redo:
    case EaselActionType.MouseUp:
      draft.isDrawing = false
      return

    case EaselActionType.SetStroke:
      draft.stroke = action.stroke
      return

    default:
      return
  }
})

export default easelStateReducer
