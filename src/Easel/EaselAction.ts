import EaselActionType from './EaselActionType'
import EaselTool from './EaselTool'

interface BaseAction<T extends EaselActionType> { type: T }

interface BaseMouseAction<T extends EaselActionType> extends BaseAction<T> {
  x: number,
  y: number,
  /** derivative x */
  dx: number,
  /** derivative y */
  dy: number,
}

interface MouseMoveEaselAction extends BaseMouseAction<EaselActionType.MouseMove> {}

interface MouseDownEaselAction extends BaseMouseAction<EaselActionType.MouseDown> {}

interface MouseUpEaselAction extends BaseMouseAction<EaselActionType.MouseUp> {}

interface SetStrokeEaselAction extends BaseAction<EaselActionType.SetStroke> {
  stroke: string
}

interface SetToolEaselAction extends BaseAction<EaselActionType.SetTool> {
  tool: EaselTool
}

interface UndoEaselAction extends BaseAction<EaselActionType.Undo> {}
interface RedoEaselAction extends BaseAction<EaselActionType.Redo> {}

type EaselAction =
  MouseMoveEaselAction |
  MouseDownEaselAction |
  MouseUpEaselAction |
  SetStrokeEaselAction |
  SetToolEaselAction |
  UndoEaselAction |
  RedoEaselAction

export default EaselAction
