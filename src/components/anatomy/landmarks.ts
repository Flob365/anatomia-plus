import type { AnatomyStructure, ViewMode } from '../../types/anatomy'
import { atlasPoint } from './atlasLayout'

type Point = readonly [number, number]
type Landmarks = Record<string, Record<string, Point>>

// Atlas landmarks use pixels within each 362px tile. Internal landmarks in an
// external illustration indicate their projected region, not an exposed surface.
const atlasLandmarks: Landmarks = {
  heart: { aorta: [166, 100], 'pulmonary-trunk': [223, 116], 'superior-vena-cava': [111, 78], 'inferior-vena-cava': [116, 319], 'right-atrium': [107, 174], 'left-atrium': [263, 161], 'right-ventricle': [159, 249], 'left-ventricle': [244, 282], septum: [206, 253], 'mitral-valve': [233, 206], 'tricuspid-valve': [158, 206], 'aortic-valve': [175, 148], 'pulmonary-valve': [204, 157], chordae: [225, 236], 'papillary-muscle': [238, 264], myocardium: [270, 258], pericardium: [287, 236], coronary: [221, 232], 'sinus-node': [119, 148], 'av-node': [166, 184] },
  lungs: { 'right-upper-lobe': [102, 125], 'right-middle-lobe': [106, 217], 'right-lower-lobe': [75, 282], 'left-upper-lobe': [257, 131], 'left-lower-lobe': [306, 279], bronchus: [184, 155], bronchioles: [248, 191], alveoli: [310, 223], pleura: [35, 213], hilum: [223, 191] },
  trachea: { 'larynx-junction': [178, 31], cartilage: [177, 99], membrane: [192, 135], mucosa: [181, 166], lumen: [181, 65], carina: [172, 218], 'right-bronchus': [129, 250], 'left-bronchus': [227, 250] },
  brain: { frontal: [89, 117], parietal: [195, 84], temporal: [182, 201], occipital: [298, 143], cerebellum: [270, 270], brainstem: [212, 306], 'corpus-callosum': [165, 140], thalamus: [192, 169], hypothalamus: [179, 194], hippocampus: [211, 210], pituitary: [178, 233], meninges: [40, 154] },
  liver: { 'right-lobe': [104, 145], 'left-lobe': [275, 124], caudate: [203, 162], quadrate: [190, 224], 'portal-vein': [211, 227], 'hepatic-artery': [224, 224], 'hepatic-veins': [216, 99], 'bile-duct': [218, 254], gallbladder: [168, 268] },
  stomach: { cardia: [196, 80], fundus: [280, 92], body: [250, 195], antrum: [155, 259], pylorus: [76, 251], 'lesser-curvature': [164, 173], 'greater-curvature': [312, 240], rugae: [236, 235] },
  pancreas: { head: [100, 161], uncinate: [124, 248], neck: [148, 149], body: [224, 117], tail: [313, 69], 'main-duct': [209, 143], islets: [241, 104], acini: [166, 168] },
  'small-intestine': { duodenum: [231, 47], jejunum: [92, 120], ileum: [240, 243], villi: [139, 171], mesentery: [183, 175], plicae: [244, 145], peyer: [246, 271], ileocecal: [288, 289] },
  colon: { cecum: [66, 199], appendix: [98, 242], ascending: [58, 130], transverse: [180, 38], descending: [305, 159], sigmoid: [219, 257], rectum: [175, 298], haustra: [248, 39], taeniae: [52, 99] },
  kidneys: { capsule: [54, 159], cortex: [94, 126], medulla: [283, 157], pyramids: [292, 182], papilla: [266, 181], 'minor-calyx': [252, 171], 'major-calyx': [247, 194], pelvis: [243, 211], hilum: [250, 151], ureter: [235, 299] },
  bladder: { apex: [182, 64], body: [180, 168], fundus: [209, 202], neck: [180, 258], trigone: [177, 223], detrusor: [264, 157], 'ureteric-orifices': [251, 120], urethra: [182, 312] },
}

// Schematic landmarks are expressed directly in the 510 × 620 SVG viewBox.
const diagramLandmarks: Landmarks = {
  trachea: { 'larynx-junction': [251, 81], cartilage: [227, 187], membrane: [282, 236], mucosa: [262, 277], lumen: [260, 315], carina: [254, 402], 'right-bronchus': [174, 497], 'left-bronchus': [350, 478] },
  liver: { 'right-lobe': [150, 245], 'left-lobe': [361, 219], caudate: [264, 265], quadrate: [216, 340], 'portal-vein': [260, 287], 'hepatic-artery': [286, 305], 'hepatic-veins': [291, 183], 'bile-duct': [276, 288], gallbladder: [253, 343] },
  stomach: { cardia: [249, 165], fundus: [336, 175], body: [339, 279], antrum: [242, 416], pylorus: [129, 365], 'lesser-curvature': [270, 306], 'greater-curvature': [384, 361], rugae: [325, 341] },
  pancreas: { head: [113, 289], uncinate: [146, 330], neck: [175, 268], body: [277, 244], tail: [418, 204], 'main-duct': [226, 259], islets: [334, 219], acini: [203, 248] },
  colon: { cecum: [109, 432], appendix: [103, 481], ascending: [104, 297], transverse: [257, 175], descending: [399, 306], sigmoid: [322, 464], rectum: [283, 529], haustra: [332, 168], taeniae: [102, 238] },
  kidneys: { capsule: [75, 242], cortex: [96, 223], medulla: [122, 262], pyramids: [117, 239], papilla: [153, 252], 'minor-calyx': [143, 285], 'major-calyx': [159, 266], pelvis: [183, 283], hilum: [188, 251], ureter: [294, 487] },
  bladder: { apex: [254, 179], body: [254, 269], fundus: [289, 355], neck: [257, 438], trigone: [255, 348], detrusor: [340, 276], 'ureteric-orifices': [307, 313], urethra: [257, 493] },
}

export function landmarkFor(organId: string, structure: AnatomyStructure, mode: ViewMode): Point {
  if (mode === 'external') {
    const point = atlasLandmarks[organId]?.[structure.id]
    if (point) return atlasPoint(organId, point)
  }
  return diagramLandmarks[organId]?.[structure.id] ?? [structure.x * 5.1, structure.y * 6.2]
}
