import React, { useEffect, useRef } from 'react'
import { Observer } from 'rxjs'
import Canvas from './Canvas'
import CanvasEvent from './CanvasEvent'
import EditorActionType from './EditorActionType'
import EditorController from './EditorController'

interface EditorProps {
  canvasWidth?: number
  canvasHeight?: number
}

const Editor = ({
  canvasWidth = 350,
  canvasHeight = 250,
}: EditorProps) => {
  const controllerRef = useRef(new EditorController())

  // This observer should references controllerRef
  const canvasObserver: Observer<CanvasEvent> = {
    next: (e: CanvasEvent) => {
      if (!controllerRef.current) return
      const dispatch = controllerRef.current.dispatch
      
      const type =
        e.type === 'mousemove' ? EditorActionType.MouseMove :
          e.type === 'mouseup' ? EditorActionType.MouseUp :
            e.type === 'mousedown' ? EditorActionType.MouseDown :
              null
      if (type !== null) {
        dispatch({
          type,
          payload: {
            x: e.x,
            y: e.y,
          },
        })
      }
    },
    error: () => {},
    complete: () => {},
  }

  useEffect(() => {
    controllerRef.current?.initialize()
  }, [EditorController])

  return (
    <Canvas
      width={canvasWidth}
      height={canvasHeight}
      observer={canvasObserver}
      data$={controllerRef.current?.canvasData$}
    />
  )
}

export default Editor
