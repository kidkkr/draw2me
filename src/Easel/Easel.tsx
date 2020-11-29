import React, { useCallback, useEffect, useMemo } from 'react'
import { Observer } from 'rxjs'
import Canvas from './Canvas'
import CanvasEvent from './CanvasEvent'
import CanvasEventObserver from './CanvasEventObserver'
import EaselActionType from './EaselActionType'
import EaselController from './EaselController'
import EaselTool from './EaselTool'

interface EaselProps {
  canvasWidth?: number
  canvasHeight?: number
}

const COLORS = ['black', 'red', 'green', 'blue']
const TOOLS = Object.values(EaselTool)

const Easel = ({
  canvasWidth = 350,
  canvasHeight = 250,
}: EaselProps) => {
  const controller = useMemo(() => new EaselController(), [
    // /***** FOR DEBUG ONLY *****/ EaselController 
  ])

  // Disptach EaselActions from CanvasEvent
  const canvasEventObserver = useMemo<Observer<CanvasEvent>>(() =>
    new CanvasEventObserver(controller), [controller])

  const createHandleColorButtonClick = useCallback((color: string) => () => {
    controller.dispatch({
      type: EaselActionType.SetStroke,
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
  
  const createHandleToolButtonClick = useCallback((tool: EaselTool) => () => {
    controller.dispatch({
      type: EaselActionType.SetTool,
      tool,
    })
  }, [controller])

  const toolButtons = useMemo(() =>
    TOOLS.map((tool) => 
      <button
        key={tool}
        onClick={createHandleToolButtonClick(tool)}
      >
        {tool}
      </button>
    ), [createHandleToolButtonClick])

  return (
    <div>
      <div>
        {colorButtons}
        {toolButtons}
      </div>
      <div>
        <button onClick={() => controller.dispatch({ type: EaselActionType.Undo })}>Undo</button>
        <button onClick={() => controller.dispatch({ type: EaselActionType.Redo })}>Redo</button>
      </div>
      <Canvas
        width={canvasWidth}
        height={canvasHeight}
        canvasEventObserver={canvasEventObserver}
        easelEvent$={controller.easelEvent$}
      />
    </div>
  )
}

export default Easel
