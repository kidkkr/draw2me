import React, { createRef } from 'react'
import { Subscription } from 'rxjs'
import { map, pairwise } from 'rxjs/operators'
import CanvasState from './CanvasState'
import { pointsToLinePath } from './mappers'
import CanvasEventObservable from './CanvasEventObservable'

interface Props extends React.HTMLProps<HTMLCanvasElement> {
}

export default class Canvas extends React.Component<Props> {
  /** Canvas Properties */
  private canvasRef = createRef<HTMLCanvasElement>()
  private ctx: CanvasRenderingContext2D | null = null
  private get canvas(): HTMLCanvasElement | null {
    return this.canvasRef.current
  }
  /** Event Properties */
  private event$: CanvasEventObservable | null = null
  private state$ = new CanvasState()
  private subscriptions: Subscription[] = []

  componentDidMount() {
    if (!this.canvas) return

    this.ctx = this.canvas.getContext('2d')
    this.event$ = new CanvasEventObservable(this.canvas)

    const stateSubscription = this.event$.subscribe(this.state$)
    const drawSubscription = this.event$.pipe(
      pairwise(),
      map(pointsToLinePath),
    ).subscribe(this.draw)

    this.subscriptions = [
      stateSubscription,
      drawSubscription,
    ]
  }

  componentWillUnmount() {
    this.event$ = null
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe())
      this.subscriptions = []
    }
  }

  draw = (path: Path2D) => {
    if (!this.ctx) return
    if (!this.state$.isDrawing) return
    this.ctx.beginPath()
    this.ctx.stroke(path)
  }

  render() {
    const { ...props } = this.props

    return (
      <canvas
        {...props}
        ref={this.canvasRef}
      />
    )
  }
}
