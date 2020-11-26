import { Subject } from 'rxjs'
import EditorAction from './EditorAction'
import EditorEvent from './EditorEvent'
import EditorState from './EditorState'
import editorEventReducer from './editorEventReducer'
import editorReducer from './editorStateReducer'

const initialState: EditorState = {
    isDrawing: false,
    stroke: '#000',
  }

class EditorController {
  private state: EditorState = initialState

  public state$: Subject<EditorState>
  public editorEvent$: Subject<EditorEvent>

  constructor() {
    this.state$ = new Subject<EditorState>()
    this.editorEvent$ = new Subject<EditorEvent>()
    this.initialize()
  }

  public initialize() {
    this.state$.next(initialState)
  }

  public dispatch = (action: EditorAction) => {
    const nextState = editorReducer(this.state, action)
    // Can It combine multiple CanvasData? (i. e. Continuos line drawing action)
    const nextEditorEvent = editorEventReducer(this.state, action)

    if (nextState !== this.state) {
      this.state$.next(nextState)
      this.state = nextState
    }

    if (nextEditorEvent) {
      this.editorEvent$.next(nextEditorEvent)
    }
  }
}

export default EditorController
