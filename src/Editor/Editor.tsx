import React, { useCallback, useEffect, useMemo } from 'react'
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

const COLORS = ['black', 'red', 'green', 'blue']

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

  const createHandleColorButtonClick = useCallback((color: string) => () => {
    controller.dispatch({
      type: EditorActionType.SetStroke,
      stroke: color,
    })
  }, [controller])

  const colorButtons = useMemo(() => 
    COLORS.map((color) =>
      <button
        key={color}
        style={{
          backgroundColor: color,
          width: 50,
          height: 50,
          borderRadius: '50%',
        }}
        onClick={createHandleColorButtonClick(color)}
      />
    ), [createHandleColorButtonClick])

  return (
    <div>
      <div>
        {colorButtons}
      </div>
      <div>
        <button onClick={() => controller.dispatch({ type: EditorActionType.Undo })}>Undo</button>
        <button onClick={() => controller.dispatch({ type: EditorActionType.Redo })}>Redo</button>
      </div>
      <Canvas
        width={canvasWidth}
        height={canvasHeight}
        canvasEventObserver={canvasEventObserver}
        editorEvent$={controller.editorEvent$}
      />
    </div>
  )
}

export default Editor
