import atlas from '../../assets/organ-atlas.png'
import heartCutaway from '../../assets/heart-cutaway.png'
import { atlasFrame } from './atlasLayout'

/** Display an atlas cell without resampling or duplicating its shared image. */
export function RealisticOrgan({ organId, cutaway = false }: { organId: string; cutaway?: boolean }) {
  if (organId === 'heart' && cutaway) return <image className="realistic-organ" href={heartCutaway} x="22" y="0" width="466" height="620" preserveAspectRatio="xMidYMid meet"/>
  const frame = atlasFrame(organId)
  return <svg className="realistic-organ" x={frame.x} y={frame.y} width={frame.width * frame.scale} height={frame.height * frame.scale} viewBox={`${frame.left} ${frame.top} ${frame.width} ${frame.height}`} preserveAspectRatio="xMidYMid meet" overflow="hidden">
    <image href={atlas} width="1086" height="1448"/>
  </svg>
}
