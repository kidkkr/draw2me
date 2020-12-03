import EaselEventType from './EaselEventType'

interface BaseEvent<T extends EaselEventType> { type: T }

interface DrawEaselEvent extends BaseEvent<EaselEventType.Draw> {
  path: string,
  stroke: string,
  strokeWidth: number,
}

interface DrawEndEaselEvent extends BaseEvent<EaselEventType.DrawEnd> {}

interface EraseEaselEvent extends BaseEvent<EaselEventType.Erase> {
  path: string,
  strokeWidth: number,
}

interface RedoEaselEvent extends BaseEvent<EaselEventType.Redo> {}

interface UndoEaselEvent extends BaseEvent<EaselEventType.Undo> {}

interface ClearEaselEvent extends BaseEvent<EaselEventType.Clear> {}

/**
 * EaselEvent emitted from EaselController to handle canvas component.
 * These canvases can be either local or not (via network).
 * So the values of EaselEvent should be primative.
 */
type EaselEvent =
  DrawEaselEvent |
  DrawEndEaselEvent |
  EraseEaselEvent |
  RedoEaselEvent |
  UndoEaselEvent |
  ClearEaselEvent

export default EaselEvent