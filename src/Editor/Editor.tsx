import React, { useEffect, useMemo } from 'react'
import { Observer } from 'rxjs'
import Canvas from './Canvas'
import CanvasEvent from './CanvasEvent'
import CanvasEventObserver from './CanvasEventObserver'
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
  const controller = useMemo(() => new EditorController(), [
    // /***** FOR DEBUG ONLY *****/ EditorController 
  ])

  // Disptach EditorActions from CanvasEvent
  const canvasEventObserver = useMemo<Observer<CanvasEvent>>(() =>
    new CanvasEventObserver(controller), [controller])


  return (
    <Canvas
      width={canvasWidth}
      height={canvasHeight}
      canvasEventObserver={canvasEventObserver}
      editorEvent$={controller.editorEvent$}
    />
  )
}

export default Editor
