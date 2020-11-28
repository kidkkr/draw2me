import EaselAction from './EaselAction'
import EaselActionType from './EaselActionType'
import EaselEvent from './EaselEvent'
import EaselEventType from './EaselEventType'
import EaselState from './EaselState'

const easelEventReducer = (state: EaselState, action: EaselAction): EaselEvent | undefined => {
  switch (action.type) {
    case EaselActionType.MouseMove: {
      if (!state.isDrawing) return
      const { x, y, dx, dy } = action
      const path = `M ${x} ${y} L ${x + dx} ${y + dy}`
      return {
        type: EaselEventType.Draw,
        stroke: state.stroke,
        path,
      }
    }

    case EaselActionType.MouseUp:
      if (!state.isDrawing) return
      return { type: EaselEventType.DrawEnd }
    
    case EaselActionType.Undo:
      return { type: EaselEventType.Undo }

    case EaselActionType.Redo:
      return { type: EaselEventType.Redo }

    default:
      return
  }

}

export default easelEventReducer
