import type { ReactNode } from 'react'

export const contours: Record<string, string> = {
  heart: 'M174 184 C146 157 106 177 101 221 C69 289 103 384 149 425 C199 473 259 513 318 556 C356 559 409 457 426 372 C453 273 410 201 355 185 C304 153 235 173 174 184Z',
  lungs: 'M215 108 C180 81 146 145 119 193 C79 267 54 377 70 462 C75 510 161 528 211 485 C227 457 212 405 225 361 C236 314 233 248 229 192Z M291 110 C326 78 365 146 393 201 C432 275 454 394 440 463 C432 505 365 522 305 488 C298 470 322 451 326 426 C330 403 287 389 281 356 C272 308 278 242 281 194Z',
  trachea: 'M208 78 Q250 61 296 79 L287 386 Q304 409 323 424 L400 481 Q407 504 375 527 L298 471 Q268 448 254 431 Q241 449 222 473 L172 539 Q148 546 121 518 L185 432 Q211 405 211 382Z',
  brain: 'M83 239 C67 204 88 169 110 161 C102 126 140 99 167 104 C190 75 219 89 235 80 C268 67 293 83 310 91 C344 78 375 106 378 122 C416 120 436 159 427 183 C457 207 451 239 440 257 C454 290 433 323 410 326 C412 361 376 379 350 380 C319 410 271 391 246 386 C213 402 177 385 158 368 C117 372 91 342 95 315 C65 303 63 262 83 239Z',
  liver: 'M59 226 C84 151 159 131 234 142 C300 142 352 179 439 185 Q476 187 458 218 C425 274 363 288 295 307 C265 322 262 375 226 397 C172 422 103 393 70 354 C48 326 47 262 59 226Z',
  stomach: 'M219 74 L259 74 C253 117 267 148 279 167 C302 120 351 137 377 174 C424 242 414 340 370 405 C328 468 273 478 224 450 C186 429 165 388 139 382 L100 384 L97 348 C149 320 187 340 220 358 C250 373 264 328 256 284 C248 237 224 213 216 176 C208 140 215 102 219 74Z',
  pancreas: 'M73 299 C57 272 75 236 95 226 C124 211 147 223 170 230 C209 218 229 231 251 217 C274 203 295 216 316 203 C340 188 359 202 378 188 C399 174 425 178 445 169 C463 181 447 210 430 219 C409 232 394 250 370 251 C352 269 331 259 311 272 C289 285 267 273 247 289 C224 302 195 290 181 317 C163 358 116 356 97 338Z',
  'small-intestine': 'M107 156 C164 123 350 121 408 164 C441 220 432 443 396 488 C325 523 176 520 107 481 C77 394 74 232 107 156Z',
  colon: 'M103 465 C63 456 63 413 75 376 L65 212 C43 174 69 128 111 139 C148 103 181 129 212 130 C243 124 268 140 295 134 C326 111 360 141 385 138 C427 123 452 151 442 192 L430 356 C442 396 415 419 383 422 C365 431 340 433 337 455 C341 473 365 480 350 514 C337 543 302 548 279 546 L277 514 C309 513 312 500 294 482 C266 448 293 401 329 388 L369 368 L376 202 C300 212 214 176 133 201 L141 398 C154 429 145 458 120 465Z',
  kidneys: 'M162 135 C101 112 61 174 68 247 C68 329 99 389 151 382 C193 378 216 344 198 315 C172 288 171 259 195 239 C226 210 207 151 162 135Z M349 146 C407 123 449 185 441 256 C444 331 412 395 362 389 C321 386 296 352 313 324 C340 295 341 269 317 247 C287 216 305 162 349 146Z',
  bladder: 'M166 188 C207 163 299 164 340 188 C386 216 367 304 343 352 C320 396 281 417 275 450 L276 510 L237 510 L237 451 C231 415 191 396 168 352 C140 301 120 217 166 188Z',
}

export function TissueDefs({ id, color }: { id: string; color: string }) {
  return <defs>
    <radialGradient id={`${id}-flesh`} cx="34%" cy="24%" r="79%"><stop stopColor="#f4c6af"/><stop offset=".25" stopColor={color}/><stop offset=".66" stopColor={color}/><stop offset="1" stopColor="#49212a"/></radialGradient>
    <linearGradient id={`${id}-tube`} x1="0" x2="1"><stop stopColor="#62323b"/><stop offset=".28" stopColor="#cf927e"/><stop offset=".47" stopColor="#f0baa0"/><stop offset=".72" stopColor="#bc756a"/><stop offset="1" stopColor="#572a36"/></linearGradient>
    <radialGradient id={`${id}-lobe`} cx="32%" cy="27%" r="80%"><stop stopColor="#eebea5"/><stop offset=".48" stopColor={color}/><stop offset="1" stopColor="#79464b"/></radialGradient>
    <radialGradient id={`${id}-cavity`}><stop stopColor="#29131c"/><stop offset=".75" stopColor="#642633"/><stop offset="1" stopColor="#b66b61"/></radialGradient>
    <linearGradient id={`${id}-sheen`} x2=".7" y2="1"><stop stopColor="#ffe5cf" stopOpacity=".5"/><stop offset=".44" stopColor="#ffe5cf" stopOpacity="0"/><stop offset="1" stopColor="#251621" stopOpacity=".38"/></linearGradient>
    <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".19" numOctaves="3" seed="17"/><feColorMatrix type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
    <filter id={`${id}-shadow`} x="-25%" y="-20%" width="150%" height="155%"><feDropShadow dx="3" dy="16" stdDeviation="14" floodColor="#020707" floodOpacity=".6"/></filter>
    <clipPath id={`${id}-clip`}><path d={contours[id.split('--')[0]]}/></clipPath>
  </defs>
}

export function Shell({ id, path, children }: { id: string; path: string; children?: ReactNode }) {
  return <g className="tissue-shell">
    <path d={path} fill={`url(#${id}-flesh)`} stroke="#e7ac95" strokeWidth="1.3"/>
    <path className="tissue-depth" d={path} fill={`url(#${id}-sheen)`}/>
    <path className="tissue-highlight tissue-grain" d={path} fill={`url(#${id}-flesh)`} filter={`url(#${id}-grain)`} opacity=".17"/>
    {children}
  </g>
}

export function Vessel({ d, width = 6, vein = false, color }: { d: string; width?: number; vein?: boolean; color?: string }) {
  return <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} stroke="#341c28" strokeOpacity=".42" strokeWidth={width + 2.6} transform="translate(1 2)"/>
    <path d={d} stroke={color ?? (vein ? '#537c91' : '#a84342')} strokeWidth={width}/>
    <path d={d} stroke={vein ? '#bdd5d3' : '#efafa0'} strokeOpacity=".62" strokeWidth={Math.max(.65, width * .2)} transform="translate(-.6 -.8)"/>
  </g>
}

export function Incision({ id, d, children }: { id: string; d: string; children?: ReactNode }) {
  return <g className="cutaway-layer" aria-label="Plan de coupe">
    <path className="cut-rim" d={d} fill={`url(#${id}-cavity)`} stroke="#e9b096" strokeWidth="12" strokeLinejoin="round"/>
    <path d={d} fill="none" stroke="#aa5a56" strokeWidth="3"/>
    {children}
  </g>
}
