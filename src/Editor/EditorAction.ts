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

type EditorAction =
  MouseMoveEditorAction |
  MouseDownEditorAction |
  MouseUpEditorAction

export default EditorAction
