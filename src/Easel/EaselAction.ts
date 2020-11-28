import EaselActionType from './EaselActionType'

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

interface SetColorEaselAction extends BaseAction<EaselActionType.SetStroke> {
  stroke: string
}

interface UndoEaselAction extends BaseAction<EaselActionType.Undo> {}
interface RedoEaselAction extends BaseAction<EaselActionType.Redo> {}

type EaselAction =
  MouseMoveEaselAction |
  MouseDownEaselAction |
  MouseUpEaselAction |
  SetColorEaselAction |
  UndoEaselAction |
  RedoEaselAction

export default EaselAction
