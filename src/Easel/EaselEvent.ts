import EaselEventType from './EaselEventType'

interface BaseEvent<T extends EaselEventType> { type: T }

interface DrawEaselEvent extends BaseEvent<EaselEventType.Draw> {
  type: EaselEventType.Draw,
  path: string,
  stroke: string,
}
interface DrawEndEaselEvent extends BaseEvent<EaselEventType.DrawEnd> {}

interface RedoEaselEvent extends BaseEvent<EaselEventType.Redo> {}

interface UndoEaselEvent extends BaseEvent<EaselEventType.Undo> {}

/**
 * EaselEvent emitted from EaselController to handle canvas component.
 * These canvases can be either local or not (via network).
 * So the values of EaselEvent should be primative.
 */
type EaselEvent =
  DrawEaselEvent |
  DrawEndEaselEvent |
  RedoEaselEvent |
  UndoEaselEvent

export default EaselEvent