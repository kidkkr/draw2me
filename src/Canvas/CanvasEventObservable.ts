import { asyncScheduler, scheduled, fromEvent, Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import CanvasEvent from './CanvasEvent';
import { getEventToCanvasEvent } from './mappers';

const EVENT_NAMES = ['mousemove', 'mouseup', 'mousedown', 'mouseout']

export default class CanvasEventObservable extends Observable<CanvasEvent> {
  constructor(canvas: HTMLCanvasElement) {
    const eventToCanvasEvent = getEventToCanvasEvent(canvas.offsetLeft, canvas.offsetTop)

    const event$ = scheduled(
      EVENT_NAMES.map(eventName => fromEvent<MouseEvent>(canvas, eventName)),
      asyncScheduler,
    ).pipe(mergeAll())

    const canvasEvent$ = event$.pipe(
      map(eventToCanvasEvent),
    )

    super((subscriber) => canvasEvent$.subscribe(subscriber))
  }
}
