import type { Organ, ViewMode } from '../types/anatomy'
import heartCutaway from '../assets/heart-cutaway.png'

const silhouettes: Record<string, string> = {
  heart: 'M235 84 C263 37 350 39 361 104 C426 80 475 124 453 193 C489 264 444 347 382 430 C337 490 290 542 252 582 C216 539 155 485 118 423 C70 343 62 257 107 200 C79 124 145 75 201 110 C210 101 222 92 235 84Z',
  lungs: 'M236 92 C178 97 111 146 84 232 C55 324 64 453 119 520 C164 575 220 527 226 464 L236 92Z M274 92 L284 463 C290 528 346 575 391 520 C446 453 455 324 426 232 C399 146 332 97 274 92Z',
  trachea: 'M205 52 L305 52 L295 377 L394 485 L337 544 L256 451 L173 544 L116 485 L215 377Z',
  brain: 'M122 186 C86 134 140 74 204 94 C233 43 321 50 337 106 C406 92 446 157 418 208 C469 253 440 332 387 346 C383 415 310 444 259 407 C213 450 132 422 129 361 C65 342 62 251 122 222Z',
  liver: 'M67 206 C155 92 372 88 461 172 C477 241 442 341 351 380 C250 424 136 385 82 321 C54 288 46 244 67 206Z',
  stomach: 'M214 86 C295 99 376 151 365 241 C355 316 293 328 287 401 C280 492 196 531 129 482 C60 432 90 339 152 318 C210 298 226 248 187 193 C153 146 169 100 214 86Z',
  pancreas: 'M72 291 C123 222 194 239 248 213 C315 181 391 181 450 219 C422 289 356 313 297 306 C211 296 135 351 72 291Z',
  'small-intestine': 'M110 111 C177 72 331 69 399 119 C456 160 457 469 393 510 C326 554 175 550 108 504 C51 464 52 155 110 111Z',
  colon: 'M97 96 C192 58 327 61 418 102 L454 158 L430 436 C418 491 360 522 314 508 L323 445 C346 440 365 424 368 398 L387 170 C324 148 183 147 122 173 L143 398 C147 423 165 439 189 445 L197 508 C148 521 91 487 81 436 L57 158Z',
  kidneys: 'M170 109 C96 81 63 168 76 257 C87 329 137 370 194 330 C223 309 229 248 213 191 C205 152 192 117 170 109Z M340 109 C414 81 447 168 434 257 C423 329 373 370 316 330 C287 309 281 248 297 191 C305 152 318 117 340 109Z',
  bladder: 'M164 153 C189 101 321 101 346 153 C367 197 371 300 341 355 C320 396 286 419 277 493 L233 493 C224 419 190 396 169 355 C139 300 143 197 164 153Z',
}

type LayerProps = { mode: ViewMode }

const modeOpacity = (mode: ViewMode, external: number, section: number, networks = section) => mode === 'external' ? external : mode === 'section' ? section : networks

function HeartDetails({ mode }: LayerProps) {
  const detailOpacity = modeOpacity(mode, .22, .9, 1)
  return <g className="organ-details organ-details--heart" opacity={detailOpacity}>
    <path d="M241 120 C211 154 206 218 231 257 C255 291 263 359 253 464" fill="none" stroke="#f0c2a3" strokeWidth="12"/>
    <path d="M139 237 C116 320 146 431 224 500 C230 396 223 298 188 244Z" fill="#56202a" stroke="#ef9a86" strokeWidth="8"/>
    <path d="M275 221 C351 205 413 265 391 361 C374 433 319 492 267 529 C281 411 273 313 275 221Z" fill="#3f1720" stroke="#e98778" strokeWidth="12"/>
    <path d="M255 203 L263 508" stroke="#f3ac92" strokeWidth="22" opacity=".82"/>
    <path d="M285 252 Q328 285 372 244 M302 265 L320 390 M337 264 L352 380 M172 204 Q208 233 236 201" fill="none" stroke="#eadac4" strokeWidth="8" opacity={mode === 'external' ? 0 : 1}/>
    {mode === 'networks' && <g fill="none" strokeLinecap="round"><path d="M155 365 C192 337 203 293 222 260 M222 260 C253 286 298 291 341 258 M191 424 C212 379 224 348 238 305 M322 424 C303 379 292 343 278 306" stroke="#df4e45" strokeWidth="7"/><path d="M157 365 C183 389 194 421 221 466 M341 258 C369 303 371 346 354 389" stroke="#416a9a" strokeWidth="5"/></g>}
  </g>
}

function LungDetails({ mode }: LayerProps) {
  const detailOpacity = modeOpacity(mode, .7, 1, 1)
  return <g className="organ-details organ-details--lungs" opacity={detailOpacity}>
    <path d="M255 88 L255 455 M255 188 L154 273 M255 188 L356 273 M154 273 L109 343 M154 273 L184 382 M356 273 L401 343 M356 273 L326 382" fill="none" stroke="#f2ded0" strokeLinecap="round" strokeWidth="12"/>
    <path d="M109 343 L93 437 M184 382 L158 482 M401 343 L417 437 M326 382 L352 482" fill="none" stroke="#dfb3a5" strokeLinecap="round" strokeWidth="5"/>
    <path d="M91 229 C126 248 163 258 220 259 M289 259 C347 258 383 248 419 229 M77 357 C121 370 162 384 208 390 M302 390 C348 384 390 370 433 357" fill="none" stroke="#773e4a" strokeWidth="3" opacity=".72"/>
    {mode === 'networks' && <g fill="#e8e5ad" opacity=".9"><circle cx="123" cy="330" r="6"/><circle cx="145" cy="355" r="4"/><circle cx="176" cy="426" r="5"/><circle cx="386" cy="330" r="6"/><circle cx="365" cy="357" r="4"/><circle cx="334" cy="426" r="5"/></g>}
  </g>
}

function TracheaDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .62, 1, 1)
  return <g className="organ-details organ-details--trachea" opacity={opacity}>
    <path d="M255 53 L255 380 M215 380 L174 492 M295 380 L336 492" fill="none" stroke="#e8cab3" strokeWidth="16" strokeLinecap="round"/>
    <g fill="none" stroke="#76484a" strokeWidth="5" opacity=".9">{[92,126,160,194,228,262,296,330].map((y) => <path key={y} d={`M207 ${y} Q255 ${y + 15} 303 ${y}`} />)}</g>
    <path d="M214 382 Q255 405 296 382" fill="none" stroke="#f0b2a1" strokeWidth="8"/>
  </g>
}

function BrainDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .82, 1, 1)
  return <g className="organ-details organ-details--brain" opacity={opacity}>
    <path d="M252 92 C238 146 242 212 255 275 C266 339 258 390 250 416" fill="none" stroke="#642f46" strokeWidth="7" opacity=".9"/>
    <g fill="none" stroke="#7c4054" strokeLinecap="round" strokeWidth="7"><path d="M119 170 Q169 129 218 163 T246 205"/><path d="M102 229 Q161 184 214 218 T245 260"/><path d="M94 293 Q160 257 214 286 T243 330"/><path d="M112 354 Q166 321 215 350 T242 382"/><path d="M293 154 Q348 124 386 172 T414 216"/><path d="M291 215 Q347 184 400 230 T420 277"/><path d="M288 277 Q345 243 403 294 T404 335"/><path d="M285 340 Q335 310 382 351"/></g>
    <path d="M246 386 C238 415 243 441 255 461 C270 437 278 415 267 386Z" fill="#64364d"/>
    {mode !== 'external' && <g fill="none" stroke="#f0b6a8" strokeWidth="4"><path d="M205 246 Q255 220 305 246"/><path d="M216 292 Q255 270 294 292"/><path d="M235 343 Q255 326 275 343"/></g>}
  </g>
}

function LiverDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .76, 1, 1)
  return <g className="organ-details organ-details--liver" opacity={opacity}>
    <path d="M245 112 C229 166 229 242 246 311 C258 339 275 363 304 381" fill="none" stroke="#6d2e35" strokeWidth="6"/>
    <path d="M115 254 C192 224 300 225 415 245 M160 322 C230 286 321 292 384 313" fill="none" stroke="#e18d74" strokeWidth="4" opacity=".76"/>
    <path d="M254 306 L254 385 M254 328 L202 375 M254 334 L304 374" fill="none" stroke="#447b76" strokeWidth="8" strokeLinecap="round"/>
    {mode === 'networks' && <g fill="none" strokeLinecap="round"><path d="M254 305 C221 268 199 239 180 198 M254 305 C298 274 333 243 356 198 M254 327 C289 329 328 344 374 362" stroke="#dfe7a7" strokeWidth="5"/><path d="M254 305 C224 344 206 368 177 392" stroke="#4d7ca1" strokeWidth="5"/></g>}
  </g>
}

function StomachDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .72, 1, 1)
  return <g className="organ-details organ-details--stomach" opacity={opacity}>
    <path d="M197 118 C253 158 292 207 270 271 C248 333 185 329 158 389 C143 422 168 458 205 474" fill="none" stroke="#f1c3a8" strokeWidth="15" strokeLinecap="round"/>
    <path d="M207 124 C259 164 292 207 274 255 C259 295 203 306 176 342 C146 383 143 425 187 471" fill="none" stroke="#6d303a" strokeWidth="6"/>
    <g fill="none" stroke="#df9c86" strokeWidth="4" opacity=".86"><path d="M190 165 Q239 195 264 178"/><path d="M175 197 Q227 226 268 207"/><path d="M166 232 Q218 254 270 234"/><path d="M161 269 Q213 280 256 261"/><path d="M150 372 Q188 394 218 384"/><path d="M143 407 Q177 427 208 418"/></g>
    {mode === 'networks' && <path d="M182 325 C220 302 250 301 274 280 M182 325 C205 349 213 387 194 425" fill="none" stroke="#dd5c54" strokeWidth="5" strokeLinecap="round"/>}
  </g>
}

function PancreasDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .82, 1, 1)
  return <g className="organ-details organ-details--pancreas" opacity={opacity}>
    <path d="M93 281 C186 267 285 237 420 234" fill="none" stroke="#f2c28a" strokeWidth="14" strokeLinecap="round" opacity=".72"/>
    <path d="M94 281 C191 286 287 257 420 234" fill="none" stroke="#87504a" strokeWidth="5"/>
    <path d="M154 264 Q167 292 154 321 M220 239 Q231 267 218 295 M292 220 Q304 244 291 272 M357 208 Q371 229 359 251" fill="none" stroke="#fff0cf" strokeWidth="4" opacity=".76"/>
    {mode === 'networks' && <g fill="#e7d98f"><circle cx="154" cy="294" r="7"/><circle cx="215" cy="263" r="6"/><circle cx="288" cy="244" r="6"/><circle cx="358" cy="227" r="5"/></g>}
  </g>
}

function IntestineDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .68, 1, 1)
  return <g className="organ-details organ-details--intestine" opacity={opacity} fill="none" strokeLinecap="round">
    <path d="M129 162 C225 122 379 150 379 208 C379 256 126 241 126 302 C126 356 378 330 378 389 C378 437 130 414 129 469" stroke="#f1b19a" strokeWidth="22"/>
    <path d="M129 162 C225 122 379 150 379 208 C379 256 126 241 126 302 C126 356 378 330 378 389 C378 437 130 414 129 469" stroke="#733d43" strokeWidth="5"/>
    <g stroke="#e9d6a1" strokeWidth="3" opacity=".78"><path d="M163 143 l-14 34 M202 130 l-8 36 M242 128 l-2 35 M281 130 l7 35 M320 139 l15 33 M350 160 l24 26 M157 246 l-25 29 M206 247 l-16 28 M258 248 l-4 30 M310 247 l11 27 M355 239 l21 23 M161 353 l-22 26 M211 354 l-11 26 M264 353 l0 27 M314 348 l12 25 M358 339 l19 23 M165 434 l-17 29 M211 430 l-9 30 M263 428 l1 29 M310 423 l10 29 M352 414 l19 25"/></g>
    {mode === 'networks' && <path d="M125 179 C184 199 212 211 245 223 M124 302 C178 294 228 294 288 301 M129 465 C188 451 252 447 330 456" stroke="#4b7892" strokeWidth="5"/>}
  </g>
}

function ColonDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .78, 1, 1)
  return <g className="organ-details organ-details--colon" opacity={opacity} fill="none" strokeLinecap="round">
    <path d="M114 142 C189 111 325 115 402 143 L416 173 L402 397 C398 438 367 463 327 466 M186 466 C146 462 113 438 107 397 L94 173" stroke="#e6a185" strokeWidth="26"/>
    <path d="M114 142 C189 111 325 115 402 143 L416 173 L402 397 C398 438 367 463 327 466 M186 466 C146 462 113 438 107 397 L94 173" stroke="#733d43" strokeWidth="6"/>
    <path d="M122 165 Q169 188 215 166 T310 166 T394 166 M112 390 Q164 370 196 394 M315 394 Q361 370 397 390" stroke="#f0c293" strokeWidth="5" opacity=".78"/>
    {mode === 'networks' && <path d="M255 144 L255 466 M147 150 L146 392 M363 151 L366 391" stroke="#497c8b" strokeWidth="5"/>}
  </g>
}

function KidneyDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .8, 1, 1)
  return <g className="organ-details organ-details--kidneys" opacity={opacity}>
    <path d="M174 129 Q119 205 154 286 Q177 328 201 298 L215 207" fill="#7e333b" stroke="#edaa8d" strokeWidth="5"/>
    <path d="M336 129 Q391 205 356 286 Q333 328 309 298 L295 207" fill="#7e333b" stroke="#edaa8d" strokeWidth="5"/>
    <path d="M185 180 L202 282 L218 236 L234 289 L251 226 M325 180 L308 282 L292 236 L276 289 L259 226" fill="#d49779" opacity=".78"/>
    <path d="M198 221 L255 274 L312 221 M255 274 L255 505" fill="none" stroke="#ead8a7" strokeWidth="9" strokeLinecap="round"/>
    {mode === 'networks' && <g fill="none" stroke="#4b7699" strokeWidth="6"><path d="M53 180 C108 184 143 202 183 222 M457 180 C402 184 367 202 327 222"/><path d="M55 299 C105 295 139 286 162 275 M455 299 C405 295 371 286 348 275"/></g>}
  </g>
}

function BladderDetails({ mode }: LayerProps) {
  const opacity = modeOpacity(mode, .72, 1, 1)
  return <g className="organ-details organ-details--bladder" opacity={opacity}>
    <path d="M187 153 Q255 197 323 153" fill="none" stroke="#f0b19a" strokeWidth="10"/>
    <path d="M205 182 C187 254 194 335 231 372 C249 389 261 389 279 372 C316 335 323 254 305 182" fill="none" stroke="#743b47" strokeWidth="7"/>
    <path d="M219 202 Q255 224 291 202 M210 247 Q255 268 300 247 M208 293 Q255 311 302 293" fill="none" stroke="#e0a185" strokeWidth="4"/>
    <path d="M231 372 L224 493 M279 372 L286 493" fill="none" stroke="#e6d0a1" strokeWidth="8"/>
    {mode === 'networks' && <path d="M224 493 L207 531 M286 493 L303 531" stroke="#4d7ea0" strokeWidth="6" strokeLinecap="round"/>}
  </g>
}

function OrganDetails({ id, mode }: { id: string; mode: ViewMode }) {
  if (id === 'heart') return <HeartDetails mode={mode}/>
  if (id === 'lungs') return <LungDetails mode={mode}/>
  if (id === 'trachea') return <TracheaDetails mode={mode}/>
  if (id === 'brain') return <BrainDetails mode={mode}/>
  if (id === 'liver') return <LiverDetails mode={mode}/>
  if (id === 'stomach') return <StomachDetails mode={mode}/>
  if (id === 'pancreas') return <PancreasDetails mode={mode}/>
  if (id === 'small-intestine') return <IntestineDetails mode={mode}/>
  if (id === 'colon') return <ColonDetails mode={mode}/>
  if (id === 'kidneys') return <KidneyDetails mode={mode}/>
  if (id === 'bladder') return <BladderDetails mode={mode}/>
  return null
}

function GenericNetwork() {
  return <g className="generic-network" fill="none" strokeLinecap="round" pointerEvents="none"><path d="M110 430 C181 341 204 235 258 98 C300 226 326 340 410 438" stroke="#bd534d" strokeWidth="9"/><path d="M119 443 C192 361 218 266 256 138 C287 270 321 365 399 452" stroke="#6285a7" strokeWidth="8"/><path d="M258 135 L190 285 M258 135 L329 285 M190 285 L155 409 M329 285 L363 410" stroke="#d8e94c" strokeWidth="2"/></g>
}

export function OrganVisual({ organ, mode, selectedId, onSelect }: { organ: Organ; mode: ViewMode; selectedId: string | null; onSelect: (id: string) => void }) {
  const path = silhouettes[organ.id] ?? silhouettes.heart
  const tissueId = `${organ.id}-tissue`
  const deepId = `${organ.id}-deep`
  const textureId = `${organ.id}-texture`
  return <svg className={`organ-visual organ-visual--${organ.id} mode-${mode}`} viewBox="0 0 510 620" role="img" aria-label={`${organ.name}, vue ${mode}`}>
    <defs>
      <radialGradient id={tissueId} cx="32%" cy="18%" r="92%">
        <stop offset="0" stopColor="#f7c2ad"/>
        <stop offset=".28" stopColor={organ.color}/>
        <stop offset=".72" stopColor={organ.color}/>
        <stop offset="1" stopColor="#3a1823"/>
      </radialGradient>
      <linearGradient id={deepId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8a3c49"/><stop offset=".55" stopColor="#461d2b"/><stop offset="1" stopColor="#24121d"/></linearGradient>
      <linearGradient id={`${organ.id}-rim`} x1="0" x2="1"><stop stopColor="#f7c0a6"/><stop offset=".5" stopColor="#d67a6e"/><stop offset="1" stopColor="#6e2a39"/></linearGradient>
      <pattern id={textureId} width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 11 Q5 4 10 11 T20 11" fill="none" stroke="#ffd9c7" strokeWidth="1.4" opacity=".22"/><circle cx="4" cy="4" r="1.2" fill="#6d2b39" opacity=".28"/><circle cx="14" cy="15" r=".9" fill="#ffe1ce" opacity=".2"/></pattern>
      <filter id={`${organ.id}-shadow`} x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="24" stdDeviation="18" floodColor="#000" floodOpacity=".72"/></filter>
      <radialGradient id={`${organ.id}-asset-fade`}><stop offset="0" stopColor="white"/><stop offset=".79" stopColor="white"/><stop offset="1" stopColor="black"/></radialGradient>
      <mask id={`${organ.id}-heart-mask`}><rect width="510" height="620" fill={`url(#${organ.id}-asset-fade)`}/></mask>
    </defs>
    <g className="organ-illustration" filter={`url(#${organ.id}-shadow)`} pointerEvents="none">
      {organ.id === 'heart' ? <>
        <path d={path} fill={`url(#${tissueId})`} stroke={`url(#${organ.id}-rim)`} strokeWidth="4"/>
        <path d={path} fill={`url(#${textureId})`} opacity=".42"/>
        <image href={heartCutaway} x="22" y="-2" width="466" height="620" preserveAspectRatio="xMidYMid meet" mask={`url(#${organ.id}-heart-mask)`}/>
      </> : <>
        <path d={path} fill={`url(#${tissueId})`} stroke={`url(#${organ.id}-rim)`} strokeWidth="4"/>
        <path d={path} fill={`url(#${textureId})`} opacity={mode === 'networks' ? .24 : .58}/>
        {(mode === 'section' || mode === 'isolate') && <path d={path} transform="translate(25 16) scale(.9)" fill={`url(#${deepId})`} stroke="#efb29e" strokeWidth="6" opacity=".84"/>}
      </>}
      <OrganDetails id={organ.id} mode={mode}/>
      {mode === 'networks' && !['lungs', 'trachea', 'brain', 'liver', 'stomach', 'pancreas', 'small-intestine', 'colon', 'kidneys', 'bladder'].includes(organ.id) && organ.id !== 'heart' && <GenericNetwork/>}
    </g>
    {organ.structures.map((structure, index) => <g key={structure.id} className={`svg-hotspot ${selectedId === structure.id ? 'selected' : ''} ${index > 9 ? 'fine-detail' : ''}`} onClick={() => onSelect(structure.id)} role="button" tabIndex={0} aria-label={structure.name} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(structure.id) }}>
      <circle cx={structure.x * 5.1} cy={structure.y * 6.2} r="11" fill="#061512" stroke="#d8e94c" strokeWidth={selectedId === structure.id ? 4 : 2}/>
      <circle cx={structure.x * 5.1} cy={structure.y * 6.2} r="3" fill="#d8e94c"/>
    </g>)}
  </svg>
}
