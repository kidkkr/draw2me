import EaselAction from './EaselAction'
import EaselActionType from './EaselActionType'
import EaselEvent from './EaselEvent'
import EaselEventType from './EaselEventType'
import EaselState from './EaselState'
import EaselTool from './EaselTool'

const easelEventReducer = (state: EaselState, action: EaselAction): EaselEvent | undefined => {
  switch (action.type) {
    case EaselActionType.MouseDown: {
      const { x, y } = action
      const subPath = `M ${x} ${y}`
      return {
        type: EaselEventType.DrawStart,
        subPath,
      }
    }

    case EaselActionType.MouseMove: {
      if (!state.isDrawing) return

      const { x, y } = action
      const subPath = `L ${x} ${y}`

      if (state.tool === EaselTool.Pen) {
        return {
          type: EaselEventType.Draw,
          stroke: state.stroke,
          strokeWidth: state.strokeWidth,
          subPath,
        }
      }
      if (state.tool === EaselTool.Eraser) {
        return {
          type: EaselEventType.Erase,
          subPath,
          strokeWidth: state.strokeWidth,
        }
      }

      return
    }

    case EaselActionType.MouseUp:
      if (!state.isDrawing) return
      const { x, y } = action
      const subPath = `L ${x} ${y}`
      return {
        type: EaselEventType.DrawEnd,
        subPath,
        stroke: state.stroke,
        strokeWidth: state.strokeWidth,
      }
    
    case EaselActionType.Undo:
      return { type: EaselEventType.Undo }

    case EaselActionType.Redo:
      return { type: EaselEventType.Redo }

    default:
      return
  }

}

export default easelEventReducer
