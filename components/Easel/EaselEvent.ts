import EaselEventType from './EaselEventType'

interface BaseEvent<T extends EaselEventType> { type: T }


/** DrawEvents */
interface DrawStartEaselEvent extends BaseEvent<EaselEventType.DrawStart> {
  subPath: string,
}
interface DrawEaselEvent extends BaseEvent<EaselEventType.Draw> {
  subPath: string,
  stroke: string,
  strokeWidth: number,
}
interface DrawEndEaselEvent extends BaseEvent<EaselEventType.DrawEnd> {
  subPath: string,
  stroke: string,
  strokeWidth: number,
}
interface EraseEaselEvent extends BaseEvent<EaselEventType.Erase> {
  subPath: string,
  strokeWidth: number,
}

/** History Events */
interface RedoEaselEvent extends BaseEvent<EaselEventType.Redo> {}
interface UndoEaselEvent extends BaseEvent<EaselEventType.Undo> {}

interface ClearEaselEvent extends BaseEvent<EaselEventType.Clear> {}

/**
 * EaselEvent emitted from EaselController to handle canvas component.
 * These canvases can be either local or not (via network).
 * So the values of EaselEvent should be primative.
 */
type EaselEvent =
  DrawStartEaselEvent |
  DrawEaselEvent |
  DrawEndEaselEvent |
  EraseEaselEvent |
  RedoEaselEvent |
  UndoEaselEvent |
  ClearEaselEvent

export default EaselEvent