import { Subject } from 'rxjs'
import EaselAction from './EaselAction'
import EaselEvent from './EaselEvent'
import EaselState from './EaselState'
import easelEventReducer from './easelEventReducer'
import easelReducer from './easelStateReducer'
import EaselTool from './EaselTool'

const initialState: EaselState = {
    isDrawing: false,
    stroke: '#000',
    tool: EaselTool.Pen,
  }

class EaselController {
  private state: EaselState = initialState

  public state$: Subject<EaselState>
  public easelEvent$: Subject<EaselEvent>

  constructor() {
    this.state$ = new Subject<EaselState>()
    this.easelEvent$ = new Subject<EaselEvent>()
    this.initialize()
  }

  public initialize() {
    this.state$.next(initialState)
  }

  public dispatch = (action: EaselAction) => {
    const nextState = easelReducer(this.state, action)
    // Can It combine multiple CanvasData? (i. e. Continuos line drawing action)
    const nextEaselEvent = easelEventReducer(this.state, action)

    if (nextState !== this.state) {
      this.state$.next(nextState)
      this.state = nextState
    }

    if (nextEaselEvent) {
      this.easelEvent$.next(nextEaselEvent)
    }
  }
}

export default EaselController
