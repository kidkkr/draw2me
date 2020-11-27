import EditorActionType from './EditorActionType'

interface BaseAction<T extends EditorActionType> { type: T }

interface BaseMouseAction<T extends EditorActionType> extends BaseAction<T> {
  x: number,
  y: number,
  /** derivative x */
  dx: number,
  /** derivative y */
  dy: number,
}

interface MouseMoveEditorAction extends BaseMouseAction<EditorActionType.MouseMove> {}

interface MouseDownEditorAction extends BaseMouseAction<EditorActionType.MouseDown> {}

interface MouseUpEditorAction extends BaseMouseAction<EditorActionType.MouseUp> {}

interface SetColorEditorAction extends BaseAction<EditorActionType.SetStroke> {
  stroke: string
}

interface UndoEditorAction extends BaseAction<EditorActionType.Undo> {}
interface RedoEditorAction extends BaseAction<EditorActionType.Redo> {}

type EditorAction =
  MouseMoveEditorAction |
  MouseDownEditorAction |
  MouseUpEditorAction |
  SetColorEditorAction |
  UndoEditorAction |
  RedoEditorAction

export default EditorAction
