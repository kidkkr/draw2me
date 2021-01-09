import produce from 'immer'
import EaselAction from './EaselAction'
import EaselActionType from './EaselActionType'
import EaselState from './EaselState'

const easelStateReducer = produce((draft: EaselState, action: EaselAction) => {
  switch (action.type) {
    case EaselActionType.MouseDown:
      draft.isDrawing = true
      return

    case EaselActionType.MouseUp:
      draft.isDrawing = false
      return

    case EaselActionType.SetStroke:
      if (action.stroke) {
        draft.stroke = action.stroke
      }
      if (action.strokeWidth) {
        draft.strokeWidth = action.strokeWidth
      }
      return

    case EaselActionType.SetTool:
      draft.tool = action.tool
      return

    default:
      return
  }
})

export default easelStateReducer
