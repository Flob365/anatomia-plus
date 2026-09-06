import { Incision, Vessel } from './Tissue'
import type { DetailProps } from './ThoracicOrgans'

const intestinalLoops = [
  'M143 184 C184 145 218 186 190 219 C166 248 111 210 114 264 C118 303 189 271 211 291',
  'M205 168 C239 138 277 162 266 194 C254 227 207 209 209 241 C212 267 260 252 282 273',
  'M292 164 C330 149 387 174 381 205 C375 239 303 208 299 243 C293 272 361 250 383 277',
  'M126 302 C166 276 198 310 180 334 C158 359 104 331 119 374 C132 409 178 369 200 392',
  'M226 292 C272 266 290 303 263 326 C241 345 202 329 205 359 C209 391 267 362 283 389',
  'M308 293 C354 276 409 303 389 333 C371 357 300 326 303 363 C305 391 374 366 390 396',
  'M133 413 C171 392 214 420 195 445 C178 470 136 441 146 470 C156 496 211 473 237 478',
  'M232 407 C276 386 302 418 281 441 C259 463 221 437 222 457 C222 481 286 499 312 476',
  'M322 409 C356 388 397 422 374 446 C352 470 314 443 316 473 C317 493 355 488 374 474',
]

export function Liver({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--liver">
    <path d="M257 157 C261 204 241 255 235 288 C227 325 232 360 211 392" fill="none" stroke="#5e3035" strokeWidth="8"/>
    <path d="M251 152 C255 204 235 255 230 288" fill="none" stroke="#d9b6a0" strokeWidth="7"/>
    <path d="M72 309 C115 340 168 349 217 330 M277 257 Q365 230 426 209" fill="none" stroke="#f1b29a" strokeWidth="2" opacity=".3"/>
    <path d="M249 302 C237 317 226 337 239 359 C254 380 275 360 272 342 L260 300" fill="#71805a" stroke="#a7a16e" strokeWidth="2"/>
    <Vessel d="M255 305 L277 287 L313 301 M277 287 L277 273" width={7} color="#98a574"/>
    {section && <Incision id={id} d="M89 261 Q149 213 219 241 L204 355 Q134 389 86 331Z">
      {Array.from({ length: 55 }, (_, i) => {
        const x = 99 + i % 9 * 12, y = 261 + Math.floor(i / 9) * 15
        return <path key={i} d={`M${x} ${y} l6 -4 7 4 0 8 -7 4 -6 -4Z`} fill="#a86557" stroke="#d89c82" strokeWidth=".6"/>
      })}
    </Incision>}
    <g className="network-layer" opacity={networks ? 1 : .2}>
      <Vessel d="M273 304 C253 274 212 244 173 220 M244 277 L162 300 L111 324 M211 246 L170 177 M273 295 L341 230 L409 208 M341 230 L363 196" width={7} vein/>
      <Vessel d="M288 310 Q253 284 211 257 L157 241 M251 283 L195 326 L153 343 M288 288 L348 249 L399 234" width={4}/>
      <Vessel d="M173 220 L117 200 M173 220 L142 253 M162 300 L107 284 M341 230 L324 190 M211 257 L210 211 M195 326 L191 369" width={2} vein/>
    </g>
  </g>
}

export function Stomach({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--stomach">
    <path d="M222 84 Q230 136 232 167 M105 355 Q151 342 180 374" fill="none" stroke="#efb9a0" strokeWidth="5" opacity=".55"/>
    <g clipPath={`url(#${id}-clip)`} fill="none" stroke="#f4bda4" strokeWidth="1.2" opacity=".3">{Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${272 + i * 3} 156 Q${415 + i * 2} ${230 + i * 4} ${230 + i * 6} 453`}/>)}</g>
    {section && <Incision id={id} d="M306 183 C348 154 388 217 382 280 C380 357 331 429 278 433 C229 436 214 394 177 367 C220 386 272 392 282 332 C301 259 272 214 306 183Z">
      {Array.from({ length: 10 }, (_, i) => <g key={i} fill="none" strokeLinecap="round"><path d={`M${310 + i * 5} ${200 + i * 4} C${279 + i * 10} 262 ${363 - i * 2} 272 ${327 + i * 3} 324 S${324 - i * 7} 412 ${272 - i * 3} ${411 - i * 3}`} stroke="#6f333a" strokeWidth="9"/><path d={`M${309 + i * 5} ${198 + i * 4} C${278 + i * 10} 260 ${362 - i * 2} 270 ${326 + i * 3} 322 S${323 - i * 7} 410 ${271 - i * 3} ${409 - i * 3}`} stroke="#d58c79" strokeWidth="5"/></g>)}
    </Incision>}
    <g className="network-layer" opacity={networks ? 1 : .6}>
      <Vessel d="M264 161 C247 210 283 248 277 297 Q285 387 237 385 M286 160 C346 122 394 201 402 269 Q415 406 310 456 Q218 479 174 399" width={4}/>
      <Vessel d="M269 205 L300 229 L311 267 M280 291 L305 307 M273 352 L299 354 M397 262 L370 277 L349 263 M389 333 L362 332 L345 361 M355 411 L334 394 M257 452 L262 425" width={1.6}/>
      <Vessel d="M407 281 Q421 398 319 461 M408 306 L382 301 M395 366 L365 357 M361 423 L351 401" width={2.5} vein/>
    </g>
  </g>
}

export function Pancreas({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--pancreas">
    <g clipPath={`url(#${id}-clip)`}>{Array.from({ length: 95 }, (_, i) => {
      const x = 77 + (i * 43.7) % 379, y = 184 + (i * 31.3) % 158
      return <ellipse key={i} cx={x} cy={y} rx={10 + i % 6} ry={7 + i % 5} transform={`rotate(${i * 37} ${x} ${y})`} fill={`url(#${id}-lobe)`} stroke="#8d6250" strokeWidth=".7"/>
    })}</g>
    <g className={section ? 'cutaway-layer' : undefined} aria-label={section ? 'Plan de coupe' : undefined} opacity={section || networks ? 1 : .28}>
      <path className={section ? 'cut-rim' : undefined} d="M115 319 Q105 279 149 270 Q266 260 426 198" fill="none" stroke="#80523e" strokeWidth="10"/>
      <Vessel d="M115 319 Q105 279 149 270 Q266 260 426 198 M135 273 L130 239 M188 267 L181 242 M223 259 L236 277 M266 247 L258 224 M311 232 L331 243 M361 217 L359 201" width={4} color="#eee0a2"/>
    </g>
    <g className="network-layer" opacity={networks ? 1 : .65}><Vessel d="M97 235 C161 216 166 254 210 236 S272 238 298 217 S348 215 376 195 L433 182" width={4}/><Vessel d="M162 241 L157 279 M210 236 L216 258 M298 217 L303 239 M376 195 L387 211" width={1.5}/></g>
  </g>
}

export function Intestines({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--intestine">
    {intestinalLoops.map((d, i) => <g key={d} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d={d} stroke="#542d35" strokeWidth="34" transform="translate(2 4)"/><path d={d} stroke="#b47568" strokeWidth="31"/><path d={d} stroke="#dda58d" strokeWidth="24"/><path d={d} stroke="#eac0a2" strokeWidth="9" transform="translate(-2 -5)" opacity=".55"/>
      {Array.from({ length: 12 }, (_, j) => <path key={j} d={`M${120 + i % 3 * 93 + j * 5} ${186 + Math.floor(i / 3) * 114 + Math.sin(j * .7) * 10} q-5 9 0 17`} stroke="#975c56" strokeWidth="1" opacity=".35"/>)}
    </g>)}
    {section && <Incision id={id} d="M310 401 Q347 386 366 407 Q379 423 362 436 Q340 445 324 429Z">
      {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${317 + i * 6} 410 q-7 10 3 17`} fill="none" stroke="#e5ac8d" strokeWidth="2"/>)}
    </Incision>}
    <g className="network-layer" opacity={networks ? 1 : .18}>
      <Vessel d="M255 154 Q278 259 267 341 L275 465" width={7}/>
      {Array.from({ length: 8 }, (_, i) => <Vessel key={i} d={`M270 ${211 + i * 31} Q${i % 2 ? 320 : 210} ${197 + i * 31} ${i % 2 ? 360 : 146} ${215 + i * 31} m${i % 2 ? -30 : 30} -4 l-10 17 m10 -17 l15 18`} width={2.4}/>)}
    </g>
  </g>
}

const colonAxis = 'M109 435 Q101 397 106 365 L101 198 Q82 156 126 169 C196 134 261 188 324 166 Q404 148 408 177 L400 364 Q413 397 361 400 C308 402 292 441 320 471 Q358 514 283 529'

export function Colon({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--colon">
    <path d={colonAxis} fill="none" stroke="#7c4a48" strokeWidth="61" strokeLinecap="round"/>
    {Array.from({ length: 25 }, (_, i) => {
      const x = i < 8 ? 105 + Math.sin(i) * 3 : i < 17 ? 116 + (i - 8) * 34 : 407 - (i - 17) * 1.3
      const y = i < 8 ? 425 - i * 33 : i < 17 ? 170 + Math.sin(i * .7) * 10 : 204 + (i - 17) * 27
      return <ellipse key={i} cx={x} cy={y} rx={i >= 8 && i < 17 ? 23 : 30} ry={i >= 8 && i < 17 ? 30 : 22} fill={`url(#${id}-lobe)`} stroke="#a16a5c" strokeWidth="1.5"/>
    })}
    <Vessel d="M395 395 C349 403 304 412 311 445 S371 506 286 532" width={31} color="#c88d79"/>
    <path d={colonAxis} fill="none" stroke="#f0c19b" strokeWidth="3" opacity=".75"/>
    <Vessel d="M100 450 Q91 479 117 490" width={9} color="#c6937d"/>
    {Array.from({ length: 18 }, (_, i) => <ellipse key={i} cx={i < 9 ? 135 : 377} cy={212 + i % 9 * 23} rx="5" ry="8" fill="#d6b478" stroke="#9f8054" strokeWidth="1" transform={`rotate(${i % 2 ? 25 : -25} ${i < 9 ? 135 : 377} ${212 + i % 9 * 23})`}/>)}
    {section && <Incision id={id} d="M90 254 Q107 247 123 256 L125 342 Q106 352 90 340Z">
      {[267, 288, 309, 332].map(y => <path key={y} d={`M91 ${y} q17 11 33 0`} stroke="#e9b18f" strokeWidth="4" fill="none"/>)}
    </Incision>}
    <g className="network-layer" opacity={networks ? 1 : .22}><Vessel d="M255 278 L190 201 L132 214 M255 278 L317 209 L370 218 M255 278 L359 342 M190 201 L217 186 M317 209 L317 186 M132 214 L133 300 L144 375 M370 218 L372 299 L359 342" width={3.5}/></g>
  </g>
}
