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

function HeartDetails({ mode }: { mode: ViewMode }) {
  return <>
    <path d="M241 120 C211 154 206 218 231 257 C255 291 263 359 253 464" fill="none" stroke="#f0c2a3" strokeWidth="12" opacity={mode === 'external' ? .38 : .88}/>
    <path d="M139 237 C116 320 146 431 224 500 C230 396 223 298 188 244Z" fill="#56202a" stroke="#ef9a86" strokeWidth="8" opacity={mode === 'external' ? .2 : .95}/>
    <path d="M275 221 C351 205 413 265 391 361 C374 433 319 492 267 529 C281 411 273 313 275 221Z" fill="#3f1720" stroke="#e98778" strokeWidth="12" opacity={mode === 'external' ? .2 : .98}/>
    <path d="M255 203 L263 508" stroke="#f3ac92" strokeWidth="22" opacity={mode === 'external' ? .12 : .9}/>
    <path d="M285 252 Q328 285 372 244" fill="none" stroke="#e9e0ca" strokeWidth="9" opacity={mode === 'external' ? 0 : 1}/>
    <path d="M302 265 L320 390 M337 264 L352 380" stroke="#eadac4" strokeWidth="3" opacity={mode === 'external' ? 0 : .9}/>
    <path d="M172 204 Q208 233 236 201" fill="none" stroke="#e9e0ca" strokeWidth="8" opacity={mode === 'external' ? 0 : 1}/>
  </>
}

export function OrganVisual({ organ, mode, selectedId, onSelect }: { organ: Organ; mode: ViewMode; selectedId: string | null; onSelect: (id: string) => void }) {
  const path = silhouettes[organ.id] ?? silhouettes.heart
  return <svg className={`organ-visual organ-visual--${organ.id} mode-${mode}`} viewBox="0 0 510 620" role="img" aria-label={`${organ.name}, vue ${mode}`}>
    <defs>
      <radialGradient id={`tissue-${organ.id}`} cx="35%" cy="22%" r="80%"><stop offset="0" stopColor="#f0a08e"/><stop offset=".42" stopColor={organ.color}/><stop offset="1" stopColor="#4b1820"/></radialGradient>
      <linearGradient id="vein" x1="0" x2="1"><stop stopColor="#2b4964"/><stop offset=".5" stopColor="#7194b1"/><stop offset="1" stopColor="#25405a"/></linearGradient>
      <filter id="organShadow"><feDropShadow dx="0" dy="24" stdDeviation="18" floodOpacity=".72"/></filter>
      <pattern id="microTexture" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1" fill="#ffd4c2" opacity=".22"/><path d="M0 10 Q6 4 12 10" fill="none" stroke="#5f2028" opacity=".28"/></pattern>
      <radialGradient id="assetFade"><stop offset="0" stopColor="white"/><stop offset=".79" stopColor="white"/><stop offset="1" stopColor="black"/></radialGradient>
      <mask id="heartAssetMask"><rect width="510" height="620" fill="url(#assetFade)"/></mask>
    </defs>
    <g filter="url(#organShadow)">
      {organ.id === 'heart' ? <image href={heartCutaway} x="22" y="-2" width="466" height="620" preserveAspectRatio="xMidYMid meet" mask="url(#heartAssetMask)"/> : <>
        <path d={path} fill={`url(#tissue-${organ.id})`} stroke="#f2ab96" strokeWidth="3"/>
        <path d={path} fill="url(#microTexture)" opacity=".6"/>
      </>}
      {organ.id === 'heart' && mode === 'networks' && <HeartDetails mode={mode}/>} 
      {organ.id === 'lungs' && <><path d="M255 82 L255 448" stroke="#b7d6d0" strokeWidth="20"/><path d="M255 197 L141 285 M255 197 L369 285" stroke="#7ba59b" strokeWidth="12"/><g opacity={mode === 'networks' ? 1 : .48} stroke="#d8e94c" fill="none" strokeWidth="2"><path d="M144 285 L102 343 M144 285 L180 383 M369 285 L409 343 M369 285 L329 383"/><path d="M102 343 L91 429 M180 383 L156 478 M409 343 L418 429 M329 383 L354 478"/></g></>}
      {organ.id === 'brain' && <g fill="none" stroke="#6b2c37" strokeWidth="5" opacity=".7"><path d="M117 202 Q166 158 209 190 T303 175 T405 205"/><path d="M103 263 Q166 226 220 264 T327 239 T421 274"/><path d="M120 329 Q178 297 234 333 T345 315 T398 352"/></g>}
      {organ.id === 'kidneys' && <><path d="M185 129 Q135 213 185 321 Q222 266 213 191Z" fill="#542029"/><path d="M325 129 Q375 213 325 321 Q288 266 297 191Z" fill="#542029"/><path d="M194 217 L255 275 L316 217" fill="none" stroke="#d7bf8d" strokeWidth="10"/><path d="M255 275 L255 510" stroke="#d7bf8d" strokeWidth="9"/></>}
      {(mode === 'section' || mode === 'isolate') && organ.id !== 'heart' && <path d={path} transform="translate(25 16) scale(.9)" fill="#451820" stroke="#f0b29f" strokeWidth="6" opacity=".82"/>}
      {mode === 'networks' && <g fill="none" strokeLinecap="round"><path d="M110 430 C181 341 204 235 258 98 C300 226 326 340 410 438" stroke="#bd534d" strokeWidth="9"/><path d="M119 443 C192 361 218 266 256 138 C287 270 321 365 399 452" stroke="url(#vein)" strokeWidth="8"/><path d="M258 135 L190 285 M258 135 L329 285 M190 285 L155 409 M329 285 L363 410" stroke="#d8e94c" strokeWidth="2"/></g>}
    </g>
    {organ.structures.map((structure, index) => <g key={structure.id} className={`svg-hotspot ${selectedId === structure.id ? 'selected' : ''} ${index > 9 ? 'fine-detail' : ''}`} onClick={() => onSelect(structure.id)} role="button" tabIndex={0} aria-label={structure.name} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(structure.id) }}>
      <circle cx={structure.x * 5.1} cy={structure.y * 6.2} r="11" fill="#061512" stroke="#d8e94c" strokeWidth={selectedId === structure.id ? 4 : 2}/>
      <circle cx={structure.x * 5.1} cy={structure.y * 6.2} r="3" fill="#d8e94c"/>
    </g>)}
  </svg>
}
