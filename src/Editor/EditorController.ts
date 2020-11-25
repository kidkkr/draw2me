import { Subject } from 'rxjs'
import CanvasData from './CanvasData'
import drawCanvasData from './drawCanvasData'
import EditorAction from './EditorAction'
import editorReducer from './editorStateReducer'
import EditorState from './EditorState'

const BLACK = new Uint8ClampedArray([0, 0, 0, 255])

const initialState: EditorState = {
    isDrawing: false,
    color: BLACK,
  }

class EditorController {
  private state: EditorState = initialState

  public state$: Subject<EditorState>
  public canvasData$: Subject<CanvasData>

  constructor() {
    this.state$ = new Subject<EditorState>()
    this.canvasData$ = new Subject<CanvasData>()
    this.initialize()
  }

  public initialize() {
    this.state$.next(initialState)
  }

  public dispatch = (action: EditorAction) => {
    const nextState = editorReducer(this.state, action)
    // Can It combine multiple CanvasData? (i. e. Continuos line drawing action)
    const canvasData = drawCanvasData(this.state, action)

    if (nextState !== this.state) {
      this.state$.next(nextState)
      this.state = nextState
    }

    if (canvasData) {
      this.canvasData$.next(canvasData)
    }
  }
}

export default EditorController
