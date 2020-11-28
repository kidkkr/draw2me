import { asyncScheduler, scheduled, fromEvent, Observable } from 'rxjs';
import { map, mergeAll, pairwise } from 'rxjs/operators';
import CanvasEvent from './CanvasEvent';

const EVENTS_TO_COLLECT = [
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseup',
]

const createToCanvasEvent = (offsetX: number, offsetY: number) =>
  ([e1, e2]: [MouseEvent, MouseEvent]): CanvasEvent => ({
    type: e1.type,
    x: e1.clientX - offsetX,
    y: e1.clientY - offsetY,
    // NOTE:
    // MouseEvent.movementX (movementY) is too small for drawing purpose.
    // So it uses the difference between successive events instead.
    dx: e2.clientX - e1.clientX,
    dy: e2.clientY - e1.clientY,
  })

export default class CanvasEventObservable extends Observable<CanvasEvent> {
  constructor(canvas: HTMLCanvasElement) {
    const toCanvasEvent = createToCanvasEvent(canvas.offsetLeft, canvas.offsetTop)
    const eventObservables = EVENTS_TO_COLLECT
      .map(eventName => fromEvent<MouseEvent>(canvas, eventName))
    const event$ = scheduled(eventObservables, asyncScheduler)
      .pipe(
        mergeAll(),
        pairwise(),
        map(toCanvasEvent),
      )
    super((subscriber) => event$.subscribe(subscriber))
  }
}
