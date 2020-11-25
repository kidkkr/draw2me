import { asyncScheduler, scheduled, fromEvent, Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import CanvasEvent from './CanvasEvent';
import CanvasEventType from './CanvasEventType';

const createToCanvasEvent = (offsetX: number, offsetY: number) =>
  (e: MouseEvent): CanvasEvent => ({
    type: e.type,
    x: e.pageX - offsetX,
    y: e.pageY - offsetY,
    dx: e.movementX,
    dy: e.movementY,
  })

export default class CanvasEventObservable extends Observable<CanvasEvent> {
  constructor(canvas: HTMLCanvasElement) {
    const toCanvasEvent = createToCanvasEvent(canvas.offsetLeft, canvas.offsetTop)
    const eventObservables = Object.values(CanvasEventType)
      .map(eventName => fromEvent<MouseEvent>(canvas, eventName))
    const event$ = scheduled(eventObservables, asyncScheduler)
      .pipe(
        mergeAll(),
        map(toCanvasEvent),
      )
    super((subscriber) => event$.subscribe(subscriber))
  }
}
