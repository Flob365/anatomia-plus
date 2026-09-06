import { Incision, Vessel } from './Tissue'

export type DetailProps = { id: string; section: boolean; networks: boolean }

export function Heart({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--heart">
    <Vessel d="M165 220 C151 173 156 112 164 83" width={43} vein/>
    <Vessel d="M147 376 Q151 435 159 491" width={34} vein/>
    <Vessel d="M261 225 C251 175 242 129 259 104 C286 63 340 74 347 118 L354 183" width={48}/>
    <Vessel d="M277 87 L271 47 M307 84 L311 42 M333 96 L346 60" width={15}/>
    <Vessel d="M287 229 C302 194 313 162 334 155 L401 144 M332 156 Q292 128 222 147" width={30} vein/>
    <ellipse cx="164" cy="82" rx="21" ry="9" fill="#263b4b" stroke="#a4b3b3" strokeWidth="3"/>
    <path d="M119 202 Q148 174 182 203 L223 243 Q190 269 159 251 Q119 252 119 202Z" fill={`url(#${id}-lobe)`} stroke="#a66059" strokeWidth="2"/>
    <path d="M332 194 Q360 167 384 192 Q400 215 382 234 L327 246Z" fill={`url(#${id}-lobe)`} stroke="#ba7667" strokeWidth="2"/>
    <path d="M122 278 C173 270 224 261 270 275 C285 344 287 427 320 525" fill="none" stroke="#653238" strokeWidth="15" opacity=".6"/>
    <path d="M120 272 C169 269 217 255 272 273 C285 337 280 428 320 530" fill="none" stroke="#d6ac79" strokeWidth="8" opacity=".85"/>
    <g clipPath={`url(#${id}-clip)`} fill="none" stroke="#ecaa91" strokeWidth="1" opacity=".28">
      {Array.from({ length: 23 }, (_, i) => <path key={i} d={`M${93 + i * 4} ${278 + i * 7} Q${190 + i * 4} ${326 + i * 6} ${335 + i * 3} ${255 + i * 11}`}/>)}
    </g>
    <g className="network-layer" opacity={networks ? 1 : .88}>
      <Vessel d="M269 247 Q270 274 294 299 C302 357 292 432 328 515 M273 273 Q214 272 177 291 L133 314 M302 345 Q349 315 398 300 M305 393 Q354 385 390 347 M315 453 Q346 441 366 412" width={networks ? 8 : 5}/>
      <Vessel d="M283 277 C290 337 281 424 315 510 M287 335 Q247 319 210 328 M299 421 Q264 408 245 380" width={4} vein/>
      <Vessel d="M180 291 L162 343 L151 359 M162 343 L179 383 M357 321 L370 284 M350 389 L364 365 M341 443 L345 470 M245 380 L211 362 M309 474 L284 468" width={1.9}/>
    </g>
    {section && <Incision id={id} d="M153 302 C143 351 177 415 248 473 C252 400 234 332 216 302Z M297 291 C348 267 396 300 386 358 C379 416 349 465 327 489 C306 436 297 355 297 291Z">
      <path d="M265 286 Q271 399 301 497" stroke="#dc957e" strokeWidth="23" fill="none"/>
      <path d="M151 304 Q179 319 215 303 L199 328 L172 320Z M297 290 Q339 311 380 299 L355 323 L321 314Z" fill="#e6d6b9" stroke="#fff0cf" strokeWidth="2"/>
      {Array.from({ length: 9 }, (_, i) => <g key={i} stroke="#efdab7" strokeWidth="1.2"><path d={`M${298 + i * 9} ${300 + Math.sin(i) * 5} L${326 + i % 3 * 11} ${393 + i % 2 * 19}`}/><path d={`M${157 + i * 7} 311 L${197 + i % 3 * 9} ${389 + i % 2 * 15}`}/></g>)}
      <Vessel d="M329 411 L334 374 M352 394 L357 369 M206 413 L201 382" width={10} color="#b96f60"/>
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${340 + i * 4} ${440 - i * 17} q22 -8 21 -26 M${188 - i * 3} ${385 - i * 9} q2 20 17 25`} fill="none" stroke="#b97165" strokeWidth="3"/>)}
    </Incision>}
  </g>
}

// Each branch splits into progressively finer airways, with deterministic geometry.
function airway(x: number, y: number, length: number, angle: number, depth: number): string[] {
  const endX = x + Math.sin(angle) * length
  const endY = y + Math.cos(angle) * length
  const path = `M${x} ${y} Q${x} ${(y + endY) / 2} ${endX} ${endY}`
  return depth === 0 ? [path] : [path, ...airway(endX, endY, length * .68, angle - .48, depth - 1), ...airway(endX, endY, length * .69, angle + .42, depth - 1)]
}

export function Lungs({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--lungs">
    <Vessel d="M256 70 L255 216 M255 213 Q226 236 204 268 M255 213 Q284 231 308 260" width={23} color="#cfb6a2"/>
    {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M246 ${82 + i * 11} q10 5 20 0`} fill="none" stroke="#f1d5be" strokeWidth="4"/>)}
    <g clipPath={`url(#${id}-clip)`}>
      <g fill="none" stroke="#733d48" strokeWidth="3"><path d="M81 299 Q148 326 223 289 M88 371 Q159 385 219 449 M290 285 Q342 341 435 387"/></g>
      <g fill="none" stroke="#f0b9a6" strokeWidth="2" opacity=".75"><path d="M81 303 Q148 330 223 293 M88 375 Q159 389 219 453 M290 289 Q342 345 435 391"/></g>
      {Array.from({ length: 165 }, (_, i) => {
        const x = 65 + (i * 73.31) % 381, y = 118 + (i * 47.71) % 389
        return <path key={i} d={`M${x} ${y} l6 -3 6 4 -1 7 -7 3 -5 -4Z`} fill="none" stroke="#744651" strokeWidth=".7" opacity=".22"/>
      })}
      {(section || networks) && <g className="cutaway-layer" aria-label="Plan de coupe">
        <path className="cut-rim" d="M304 171 Q382 243 417 452 Q354 478 321 458 Q337 406 296 348Z" fill="#77434b" fillOpacity=".6" stroke="#e8b5a0" strokeWidth="3"/>
        {[...airway(211, 244, 79, -.54, 4), ...airway(303, 243, 83, .51, 4)].map((d, i) => <Vessel key={i} d={d} width={i % 31 === 0 ? 12 : i % 7 === 0 ? 5 : 2.2} color="#e4c9a8"/>)}
      </g>}
      <g className="network-layer" opacity={networks ? .95 : .25}>
        {[...airway(213, 257, 70, -.49, 3), ...airway(299, 258, 76, .51, 3)].map((d, i) => <g key={i}><path d={d} fill="none" stroke="#ab5053" strokeWidth={i % 15 === 0 ? 6 : 1.7}/><path d={d} transform="translate(7 3)" fill="none" stroke="#557d97" strokeWidth={i % 15 === 0 ? 4 : 1.2}/></g>)}
      </g>
    </g>
  </g>
}

export function Trachea({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--trachea">
    <path d="M250 91 L250 390 M250 390 L151 523 M250 390 L388 503" fill="none" stroke={`url(#${id}-tube)`} strokeWidth="59" strokeLinejoin="round"/>
    {Array.from({ length: 18 }, (_, i) => <g key={i}><path d={`M212 ${91 + i * 16} Q250 ${104 + i * 16} 289 ${91 + i * 16}`} fill="none" stroke="#825c59" strokeWidth="10"/><path d={`M214 ${89 + i * 16} Q250 ${101 + i * 16} 287 ${89 + i * 16}`} fill="none" stroke="#dec5aa" strokeWidth="7"/></g>)}
    {[0, 1].map(side => <g key={side} transform={side ? 'translate(256 397) rotate(-54)' : 'translate(243 397) rotate(37)'}>{Array.from({ length: 8 }, (_, i) => <path key={i} d={`M-26 ${i * 16} q26 10 52 0`} fill="none" stroke="#dec5aa" strokeWidth="7"/>)}</g>)}
    <ellipse cx="251" cy="80" rx="43" ry="13" fill="#633c40" stroke="#e2c5ab" strokeWidth="5"/><ellipse cx="251" cy="80" rx="31" ry="7" fill="#362329"/>
    {section && <Incision id={id} d="M255 121 L272 121 L268 382 Q298 427 370 479 L362 491 Q287 446 255 403Z">
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${257 + i * 1.4} 133 L${258 + i} 380`} stroke="#d89a8a" strokeWidth=".8"/>)}
    </Incision>}
    <g className="network-layer" opacity={networks ? 1 : .35}><Vessel d="M207 98 C199 189 210 283 202 370 Q200 409 167 447 L132 503 M294 111 Q309 235 294 382 L381 476" width={3}/><Vessel d="M202 175 L220 184 M202 230 L220 240 M202 290 L220 300 M304 181 L285 195 M301 278 L283 294" width={1.3}/></g>
  </g>
}
