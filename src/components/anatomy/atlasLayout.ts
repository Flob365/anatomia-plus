// Specimens have slightly irregular bounds in the shared atlas. Explicit crops
// prevent an adjacent organ from appearing during zoom or in a letterbox margin.
const crops: Record<string, readonly [number, number, number, number]> = {
  heart: [0, 0, 362, 360], lungs: [362, 0, 362, 360], trachea: [724, 0, 362, 360],
  brain: [0, 372, 362, 342], liver: [362, 380, 362, 331], stomach: [724, 363, 362, 345],
  pancreas: [0, 724, 362, 333], 'small-intestine': [362, 718, 362, 332], colon: [724, 711, 362, 342],
  kidneys: [0, 1060, 362, 369], bladder: [362, 1054, 362, 369],
}

const order = ['heart', 'lungs', 'trachea', 'brain', 'liver', 'stomach', 'pancreas', 'small-intestine', 'colon', 'kidneys', 'bladder']

export function atlasFrame(organId: string) {
  const [left, top, width, height] = crops[organId]
  const scale = Math.min(460 / width, 460 / height)
  return { left, top, width, height, scale, x: 255 - width * scale / 2, y: 305 - height * scale / 2 }
}

export function atlasPoint(organId: string, point: readonly [number, number]): readonly [number, number] {
  const frame = atlasFrame(organId), index = order.indexOf(organId)
  return [frame.x + (index % 3 * 362 + point[0] - frame.left) * frame.scale,
    frame.y + (Math.floor(index / 3) * 362 + point[1] - frame.top) * frame.scale]
}
