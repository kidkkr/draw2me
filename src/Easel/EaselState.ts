import EaselTool from './EaselTool'

interface EaselState {
  isDrawing: boolean
  tool: EaselTool
  stroke: string
  strokeWidth: number
}

export default EaselState
