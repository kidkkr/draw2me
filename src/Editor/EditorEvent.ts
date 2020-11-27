import EditorEventType from './EditorEventType'

interface BaseEvent<T extends EditorEventType> { type: T }

interface DrawEditorEvent extends BaseEvent<EditorEventType.Draw> {
  type: EditorEventType.Draw,
  path: string,
  stroke: string,
}
interface DrawEndEditorEvent extends BaseEvent<EditorEventType.DrawEnd> {}

interface RedoEditorEvent extends BaseEvent<EditorEventType.Redo> {}

interface UndoEditorEvent extends BaseEvent<EditorEventType.Undo> {}

/**
 * EditorEvent emitted from EditorController to handle canvas component.
 * These canvases can be either local or not (via network).
 * So the values of EditorEvent should be primative.
 */
type EditorEvent =
  DrawEditorEvent |
  DrawEndEditorEvent |
  RedoEditorEvent |
  UndoEditorEvent

export default EditorEvent