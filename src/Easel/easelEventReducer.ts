import EaselAction from './EaselAction'
import EaselActionType from './EaselActionType'
import EaselEvent from './EaselEvent'
import EaselEventType from './EaselEventType'
import EaselState from './EaselState'
import EaselTool from './EaselTool'

const easelEventReducer = (state: EaselState, action: EaselAction): EaselEvent | undefined => {
  switch (action.type) {
    case EaselActionType.MouseMove: {
      if (!state.isDrawing) return

      const { x, y, dx, dy } = action
      const path = `M ${x} ${y} L ${x + dx} ${y + dy}`

      if (state.tool === EaselTool.Pen) {
        return {
          type: EaselEventType.Draw,
          stroke: state.stroke,
          strokeWidth: state.strokeWidth,
          path,
        }
      }
      if (state.tool === EaselTool.Eraser) {
        return {
          type: EaselEventType.Erase,
          path,
          strokeWidth: state.strokeWidth,
        }
      }

      return
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
