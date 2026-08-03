import type { AnatomySystem, Organ, StructureTuple } from '../types/anatomy'

const makeOrgan = (
  systemId: string,
  id: string,
  name: string,
  latin: string,
  icon: string,
  summary: string,
  location: string,
  color: string,
  tuples: StructureTuple[],
): Organ => {
  const systemName: Record<string, string> = { cardiovascular: 'cardiovasculaire', respiratory: 'respiratoire', digestive: 'digestif', nervous: 'nerveux', urinary: 'urinaire' }
  return ({
  id, name, latin, systemId, icon, summary, location, color,
  structures: tuples.map(([structureId, structureName, structureLatin, role, x, y], index) => ({
    id: structureId,
    name: structureName,
    latin: structureLatin,
    role,
    anatomy: `${structureName} est une partie identifiable de ${name.toLowerCase()}. ${role} Sa position et sa forme contribuent à l’organisation fonctionnelle de l’organe.`,
    clinical: index % 3 === 0
      ? `Une altération de ${structureName.toLowerCase()} peut modifier le fonctionnement de ${name.toLowerCase()}. L’interprétation de symptômes relève d’un professionnel de santé.`
      : `Cette structure est observée lors des examens anatomiques et d’imagerie. Son aspect varie naturellement selon les personnes.`,
    relation: `En continuité avec les structures voisines de ${name.toLowerCase()} et reliée au système ${systemName[systemId]}.`,
    metric: index % 2 === 0 ? 'Dimensions variables selon la morphologie' : 'Repère anatomique majeur',
    x, y,
  })),
})}

const heart = makeOrgan('cardiovascular', 'heart', 'Cœur', 'Cor', 'heart',
  'Pompe musculaire à quatre cavités qui entretient la circulation du sang dans tout l’organisme.',
  'Médiastin, entre les deux poumons, légèrement décalé vers la gauche.', '#c9625d', [
    ['aorta', 'Aorte ascendante', 'Aorta ascendens', 'Distribue le sang oxygéné vers la circulation générale.', 54, 12],
    ['pulmonary-trunk', 'Tronc pulmonaire', 'Truncus pulmonalis', 'Conduit le sang du ventricule droit vers les poumons.', 66, 23],
    ['superior-vena-cava', 'Veine cave supérieure', 'Vena cava superior', 'Ramène le sang de la partie supérieure du corps.', 33, 18],
    ['inferior-vena-cava', 'Veine cave inférieure', 'Vena cava inferior', 'Ramène le sang de la partie inférieure du corps.', 31, 79],
    ['right-atrium', 'Oreillette droite', 'Atrium dextrum', 'Reçoit le sang veineux avant son passage dans le ventricule droit.', 35, 37],
    ['left-atrium', 'Oreillette gauche', 'Atrium sinistrum', 'Reçoit le sang oxygéné provenant des poumons.', 69, 35],
    ['right-ventricle', 'Ventricule droit', 'Ventriculus dexter', 'Propulse le sang vers la circulation pulmonaire.', 42, 65],
    ['left-ventricle', 'Ventricule gauche', 'Ventriculus sinister', 'Propulse le sang dans l’aorte sous forte pression.', 66, 67],
    ['septum', 'Septum interventriculaire', 'Septum interventriculare', 'Sépare les deux ventricules et participe à la conduction.', 54, 60],
    ['mitral-valve', 'Valve mitrale', 'Valva mitralis', 'Empêche le reflux vers l’oreillette gauche pendant la systole.', 64, 44],
    ['tricuspid-valve', 'Valve tricuspide', 'Valva tricuspidalis', 'Empêche le reflux vers l’oreillette droite.', 42, 46],
    ['aortic-valve', 'Valve aortique', 'Valva aortae', 'Contrôle la sortie du ventricule gauche vers l’aorte.', 58, 34],
    ['pulmonary-valve', 'Valve pulmonaire', 'Valva trunci pulmonalis', 'Contrôle la sortie du ventricule droit.', 52, 31],
    ['chordae', 'Cordages tendineux', 'Chordae tendineae', 'Stabilisent les valves atrio-ventriculaires.', 58, 53],
    ['papillary-muscle', 'Muscles papillaires', 'Musculi papillares', 'Tendent les cordages lors de la contraction.', 61, 62],
    ['myocardium', 'Myocarde', 'Myocardium', 'Couche musculaire responsable de la contraction.', 77, 57],
    ['pericardium', 'Péricarde', 'Pericardium', 'Enveloppe et protège le cœur tout en limitant les frottements.', 80, 43],
    ['coronary', 'Artères coronaires', 'Arteriae coronariae', 'Apportent oxygène et nutriments au muscle cardiaque.', 73, 49],
    ['sinus-node', 'Nœud sinusal', 'Nodus sinuatrialis', 'Déclenche spontanément l’impulsion électrique cardiaque.', 39, 30],
    ['av-node', 'Nœud atrio-ventriculaire', 'Nodus atrioventricularis', 'Ralentit et relaie l’influx vers les ventricules.', 49, 42],
  ])

const lungs = makeOrgan('respiratory', 'lungs', 'Poumons', 'Pulmones', 'lungs',
  'Deux organes spongieux où l’oxygène et le dioxyde de carbone s’échangent avec le sang.',
  'Cavité thoracique, de part et d’autre du médiastin.', '#c98b80', [
    ['right-upper-lobe', 'Lobe supérieur droit', 'Lobus superior dexter', 'Participe aux échanges gazeux du sommet pulmonaire.', 66, 24],
    ['right-middle-lobe', 'Lobe moyen droit', 'Lobus medius dexter', 'Zone ventilée propre au poumon droit.', 68, 48],
    ['right-lower-lobe', 'Lobe inférieur droit', 'Lobus inferior dexter', 'Assure une grande part des échanges à la base.', 68, 71],
    ['left-upper-lobe', 'Lobe supérieur gauche', 'Lobus superior sinister', 'Participe aux échanges gazeux près de l’apex.', 34, 28],
    ['left-lower-lobe', 'Lobe inférieur gauche', 'Lobus inferior sinister', 'Occupe la partie postéro-inférieure gauche.', 33, 69],
    ['bronchus', 'Bronches principales', 'Bronchi principales', 'Distribuent l’air vers chaque poumon.', 50, 33],
    ['bronchioles', 'Bronchioles', 'Bronchioli', 'Répartissent finement l’air dans le parenchyme.', 61, 50],
    ['alveoli', 'Alvéoles', 'Alveoli pulmonis', 'Lieu microscopique des échanges gazeux.', 76, 59],
    ['pleura', 'Plèvre', 'Pleura', 'Enveloppe glissante qui facilite les mouvements respiratoires.', 20, 48],
    ['hilum', 'Hile pulmonaire', 'Hilum pulmonis', 'Zone de passage des bronches, vaisseaux et nerfs.', 50, 44],
  ])

const trachea = makeOrgan('respiratory', 'trachea', 'Trachée', 'Trachea', 'wind',
  'Conduit respiratoire semi-rigide maintenant une voie ouverte entre le larynx et les bronches.',
  'Cou et thorax supérieur, devant l’œsophage.', '#b68a72', [
    ['larynx-junction', 'Jonction laryngée', 'Junctura laryngotrachealis', 'Relie le larynx au conduit trachéal.', 50, 13],
    ['cartilage', 'Anneaux cartilagineux', 'Cartilagines tracheales', 'Maintiennent la lumière ouverte.', 43, 33],
    ['membrane', 'Paroi membraneuse', 'Paries membranaceus', 'Permet une légère déformation postérieure.', 60, 38],
    ['mucosa', 'Muqueuse ciliée', 'Tunica mucosa', 'Piège et évacue les particules inspirées.', 52, 47],
    ['lumen', 'Lumière trachéale', 'Lumen tracheae', 'Permet le passage de l’air.', 48, 55],
    ['carina', 'Carène', 'Carina tracheae', 'Crête sensible séparant les bronches principales.', 50, 73],
    ['right-bronchus', 'Bronche principale droite', 'Bronchus principalis dexter', 'Conduit l’air vers le poumon droit.', 67, 84],
    ['left-bronchus', 'Bronche principale gauche', 'Bronchus principalis sinister', 'Conduit l’air vers le poumon gauche.', 33, 84],
  ])

const brain = makeOrgan('nervous', 'brain', 'Cerveau', 'Encephalon', 'brain',
  'Centre de contrôle du système nerveux, siège de la perception, du mouvement, du langage et de la mémoire.',
  'Boîte crânienne, protégé par les méninges et le liquide cérébrospinal.', '#d7a899', [
    ['frontal', 'Lobe frontal', 'Lobus frontalis', 'Planification, mouvement volontaire et fonctions exécutives.', 36, 35],
    ['parietal', 'Lobe pariétal', 'Lobus parietalis', 'Intègre les informations sensorielles et spatiales.', 57, 28],
    ['temporal', 'Lobe temporal', 'Lobus temporalis', 'Participe à l’audition, la mémoire et au langage.', 62, 55],
    ['occipital', 'Lobe occipital', 'Lobus occipitalis', 'Traite principalement l’information visuelle.', 78, 41],
    ['cerebellum', 'Cervelet', 'Cerebellum', 'Coordonne l’équilibre et la précision des gestes.', 70, 75],
    ['brainstem', 'Tronc cérébral', 'Truncus encephali', 'Régule des fonctions vitales automatiques.', 52, 79],
    ['corpus-callosum', 'Corps calleux', 'Corpus callosum', 'Relie les deux hémisphères cérébraux.', 52, 44],
    ['thalamus', 'Thalamus', 'Thalamus', 'Relais majeur des informations sensorielles.', 53, 51],
    ['hypothalamus', 'Hypothalamus', 'Hypothalamus', 'Régule température, faim et fonctions hormonales.', 49, 59],
    ['hippocampus', 'Hippocampe', 'Hippocampus', 'Intervient dans la formation des souvenirs.', 59, 63],
    ['pituitary', 'Hypophyse', 'Hypophysis', 'Sécrète des hormones régulant plusieurs glandes.', 48, 69],
    ['meninges', 'Méninges', 'Meninges', 'Enveloppent et protègent le système nerveux central.', 24, 25],
  ])

const liver = makeOrgan('digestive', 'liver', 'Foie', 'Hepar', 'liver',
  'Grande glande métabolique qui transforme les nutriments, produit la bile et détoxifie le sang.',
  'Partie supérieure droite de l’abdomen, sous le diaphragme.', '#9a493c', [
    ['right-lobe', 'Lobe droit', 'Lobus dexter', 'Constitue la plus grande partie du parenchyme hépatique.', 64, 43],
    ['left-lobe', 'Lobe gauche', 'Lobus sinister', 'S’étend vers la partie gauche de l’épigastre.', 35, 39],
    ['caudate', 'Lobe caudé', 'Lobus caudatus', 'Petit lobe de la face postérieure.', 52, 32],
    ['quadrate', 'Lobe carré', 'Lobus quadratus', 'Zone inférieure proche de la vésicule biliaire.', 48, 66],
    ['portal-vein', 'Veine porte', 'Vena portae hepatis', 'Apporte le sang riche en nutriments digestifs.', 51, 56],
    ['hepatic-artery', 'Artère hépatique', 'Arteria hepatica propria', 'Apporte du sang oxygéné au foie.', 57, 57],
    ['hepatic-veins', 'Veines hépatiques', 'Venae hepaticae', 'Drainent le sang vers la veine cave inférieure.', 58, 25],
    ['bile-duct', 'Canal hépatique', 'Ductus hepaticus', 'Collecte et conduit la bile.', 48, 73],
    ['gallbladder', 'Vésicule biliaire', 'Vesica biliaris', 'Stocke et concentre la bile.', 61, 72],
  ])

const stomach = makeOrgan('digestive', 'stomach', 'Estomac', 'Gaster', 'stomach',
  'Réservoir musculaire qui mélange les aliments et commence leur digestion chimique.',
  'Épigastre et hypochondre gauche, entre œsophage et duodénum.', '#bd7468', [
    ['cardia', 'Cardia', 'Cardia', 'Zone d’entrée depuis l’œsophage.', 47, 20],
    ['fundus', 'Fundus', 'Fundus gastricus', 'Dôme supérieur pouvant contenir des gaz.', 63, 28],
    ['body', 'Corps gastrique', 'Corpus gastricum', 'Principale région de brassage et de sécrétion.', 52, 49],
    ['antrum', 'Antre pylorique', 'Antrum pyloricum', 'Broie et dirige le contenu vers le pylore.', 42, 70],
    ['pylorus', 'Pylore', 'Pylorus', 'Contrôle la vidange vers le duodénum.', 30, 78],
    ['lesser-curvature', 'Petite courbure', 'Curvatura minor', 'Bord médial concave de l’estomac.', 40, 43],
    ['greater-curvature', 'Grande courbure', 'Curvatura major', 'Long bord latéral convexe.', 72, 58],
    ['rugae', 'Plis gastriques', 'Plicae gastricae', 'Permettent la distension et augmentent la surface.', 54, 57],
  ])

const pancreas = makeOrgan('digestive', 'pancreas', 'Pancréas', 'Pancreas', 'pancreas',
  'Glande mixte qui produit des enzymes digestives et des hormones régulant la glycémie.',
  'Derrière l’estomac, transversalement entre duodénum et rate.', '#d5a26e', [
    ['head', 'Tête', 'Caput pancreatis', 'S’inscrit dans la courbure du duodénum.', 28, 57],
    ['uncinate', 'Processus unciné', 'Processus uncinatus', 'Prolongement inférieur de la tête.', 33, 72],
    ['neck', 'Col', 'Collum pancreatis', 'Relie la tête au corps.', 42, 50],
    ['body', 'Corps', 'Corpus pancreatis', 'Partie centrale riche en tissu glandulaire.', 58, 45],
    ['tail', 'Queue', 'Cauda pancreatis', 'Extrémité fine dirigée vers la rate.', 79, 38],
    ['main-duct', 'Canal pancréatique', 'Ductus pancreaticus', 'Conduit les enzymes vers le duodénum.', 55, 53],
    ['islets', 'Îlots de Langerhans', 'Insulae pancreaticae', 'Sécrètent notamment insuline et glucagon.', 63, 42],
    ['acini', 'Acini pancréatiques', 'Acini pancreatici', 'Produisent les enzymes digestives.', 51, 63],
  ])

const smallIntestine = makeOrgan('digestive', 'small-intestine', 'Intestin grêle', 'Intestinum tenue', 'waves',
  'Long conduit où s’effectue l’essentiel de la digestion et de l’absorption des nutriments.',
  'Centre de l’abdomen, entre l’estomac et le côlon.', '#c8866f', [
    ['duodenum', 'Duodénum', 'Duodenum', 'Reçoit le chyme, la bile et les enzymes pancréatiques.', 42, 26],
    ['jejunum', 'Jéjunum', 'Jejunum', 'Absorbe une grande partie des nutriments.', 42, 48],
    ['ileum', 'Iléon', 'Ileum', 'Absorbe notamment les sels biliaires et la vitamine B12.', 60, 68],
    ['villi', 'Villosités', 'Villi intestinales', 'Augmentent fortement la surface d’absorption.', 58, 42],
    ['mesentery', 'Mésentère', 'Mesenterium', 'Suspend l’intestin et conduit ses vaisseaux.', 50, 55],
    ['plicae', 'Plis circulaires', 'Plicae circulares', 'Ralentissent le contenu et accroissent la surface.', 66, 49],
    ['peyer', 'Plaques de Peyer', 'Noduli lymphoidei aggregati', 'Participent à la surveillance immunitaire.', 64, 74],
    ['ileocecal', 'Jonction iléo-cæcale', 'Junctio ileocaecalis', 'Relie l’iléon au début du côlon.', 73, 82],
  ])

const colon = makeOrgan('digestive', 'colon', 'Côlon', 'Intestinum crassum', 'colon',
  'Réabsorbe l’eau et compacte les résidus avant leur évacuation.',
  'Encadre l’intestin grêle dans la cavité abdominale.', '#a96e59', [
    ['cecum', 'Cæcum', 'Caecum', 'Première poche recevant le contenu de l’iléon.', 72, 77],
    ['appendix', 'Appendice', 'Appendix vermiformis', 'Petit prolongement riche en tissu lymphoïde.', 76, 87],
    ['ascending', 'Côlon ascendant', 'Colon ascendens', 'Fait remonter le contenu du côté droit.', 74, 52],
    ['transverse', 'Côlon transverse', 'Colon transversum', 'Traverse l’abdomen sous l’estomac.', 50, 28],
    ['descending', 'Côlon descendant', 'Colon descendens', 'Conduit le contenu vers le bassin gauche.', 27, 52],
    ['sigmoid', 'Côlon sigmoïde', 'Colon sigmoideum', 'Segment mobile en S avant le rectum.', 35, 78],
    ['rectum', 'Rectum', 'Rectum', 'Stocke temporairement les selles.', 50, 87],
    ['haustra', 'Haustrations', 'Haustra coli', 'Compartiments favorisant le brassage.', 60, 31],
    ['taeniae', 'Bandelettes longitudinales', 'Taeniae coli', 'Bandes musculaires raccourcissant le côlon.', 32, 40],
  ])

const kidneys = makeOrgan('urinary', 'kidneys', 'Reins', 'Renes', 'kidney',
  'Filtrent le sang, règlent l’équilibre hydrique et produisent l’urine.',
  'Rétropéritoine, de part et d’autre de la colonne lombaire.', '#a85b55', [
    ['capsule', 'Capsule rénale', 'Capsula renalis', 'Enveloppe fibreuse protectrice.', 24, 42],
    ['cortex', 'Cortex rénal', 'Cortex renalis', 'Contient de nombreux corpuscules rénaux.', 35, 47],
    ['medulla', 'Médulla rénale', 'Medulla renalis', 'Concentre l’urine dans les pyramides.', 51, 50],
    ['pyramids', 'Pyramides rénales', 'Pyramides renales', 'Conduisent l’urine vers les papilles.', 57, 43],
    ['papilla', 'Papilles rénales', 'Papillae renales', 'Déversent l’urine dans les petits calices.', 61, 55],
    ['minor-calyx', 'Petits calices', 'Calices renales minores', 'Recueillent l’urine des papilles.', 63, 48],
    ['major-calyx', 'Grands calices', 'Calices renales majores', 'Réunissent plusieurs petits calices.', 68, 54],
    ['pelvis', 'Bassinet', 'Pelvis renalis', 'Entonnoir conduisant l’urine vers l’uretère.', 70, 62],
    ['hilum', 'Hile rénal', 'Hilum renale', 'Passage des vaisseaux, nerfs et de l’uretère.', 76, 50],
    ['ureter', 'Uretère', 'Ureter', 'Transporte l’urine vers la vessie.', 70, 82],
  ])

const bladder = makeOrgan('urinary', 'bladder', 'Vessie', 'Vesica urinaria', 'droplet',
  'Réservoir musculaire extensible qui stocke l’urine entre les mictions.',
  'Petit bassin, derrière la symphyse pubienne.', '#c68872', [
    ['apex', 'Apex', 'Apex vesicae', 'Sommet antérieur de la vessie.', 50, 22],
    ['body', 'Corps', 'Corpus vesicae', 'Partie principale extensible.', 50, 48],
    ['fundus', 'Fond', 'Fundus vesicae', 'Face postérieure tournée vers le rectum.', 56, 67],
    ['neck', 'Col', 'Cervix vesicae', 'Zone inférieure se poursuivant par l’urètre.', 50, 78],
    ['trigone', 'Trigone vésical', 'Trigonum vesicae', 'Zone lisse entre uretères et urètre.', 50, 64],
    ['detrusor', 'Muscle détrusor', 'Musculus detrusor vesicae', 'Se contracte pour expulser l’urine.', 68, 48],
    ['ureteric-orifices', 'Orifices urétéraux', 'Ostia ureterum', 'Reçoivent l’urine des deux uretères.', 50, 57],
    ['urethra', 'Urètre', 'Urethra', 'Conduit l’urine vers l’extérieur.', 50, 91],
  ])

export const anatomySystems: AnatomySystem[] = [
  { id: 'cardiovascular', name: 'Cardiovasculaire', icon: 'activity', description: 'Transport du sang, des gaz et des nutriments.', organs: [heart] },
  { id: 'respiratory', name: 'Respiratoire', icon: 'lungs', description: 'Ventilation et échanges gazeux.', organs: [lungs, trachea] },
  { id: 'digestive', name: 'Digestif', icon: 'stomach', description: 'Digestion et absorption des nutriments.', organs: [liver, stomach, pancreas, smallIntestine, colon] },
  { id: 'nervous', name: 'Nerveux', icon: 'brain', description: 'Perception, commande et coordination.', organs: [brain] },
  { id: 'urinary', name: 'Urinaire', icon: 'kidney', description: 'Filtration du sang et équilibre interne.', organs: [kidneys, bladder] },
]

export const allOrgans = anatomySystems.flatMap((system) => system.organs)
