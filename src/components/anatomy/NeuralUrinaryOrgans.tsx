import { Incision, Vessel } from './Tissue'
import type { DetailProps } from './ThoracicOrgans'

const gyri = [
  'M111 185 C92 155 146 133 160 147 S131 184 160 191 S200 160 211 137 S242 110 250 126',
  'M92 241 C105 214 142 221 137 246 S99 269 113 290 S148 293 159 272 S183 244 201 254',
  'M115 210 C144 187 164 231 187 212 S178 169 210 174 S248 162 246 145',
  'M150 126 C175 107 194 133 209 117 S242 94 257 105',
  'M151 316 C138 338 174 358 191 340 S178 303 204 294 S243 309 234 329 S212 359 239 371',
  'M178 238 C197 219 220 240 231 221 S216 188 243 186',
  'M256 114 C279 95 306 115 295 134 S273 158 288 174 S320 159 327 141 S354 127 367 141',
  'M323 105 C337 98 361 116 352 127',
  'M262 204 C280 182 301 207 317 189 S339 159 358 176 S345 204 367 215 S407 200 409 181',
  'M281 226 C294 248 327 222 344 243 S327 275 349 289 S393 280 401 259 S421 243 431 250',
  'M261 271 C279 245 307 261 299 285 S264 315 278 334 S312 312 331 327 S324 358 348 364',
  'M373 151 C392 149 412 165 398 183',
  'M375 239 C390 216 422 218 433 231',
  'M369 317 C388 297 417 310 407 334 S376 345 370 358',
  'M109 307 C125 300 133 320 127 336',
  'M257 347 C270 353 277 376 301 367',
]

export function Brain({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--brain">
    <path d="M246 364 Q256 397 244 442 L254 493 L280 491 Q276 450 292 422 L320 381Z" fill={`url(#${id}-tube)`} stroke="#9f7968" strokeWidth="2"/>
    <path d="M290 371 C318 340 394 350 414 392 C435 429 393 468 342 465 C303 465 277 434 290 404Z" fill={`url(#${id}-lobe)`} stroke="#b18773" strokeWidth="2"/>
    {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${297 - Math.sin(i / 3) * 5} ${384 + i * 4.7} Q353 ${351 + i * 7} ${401 + Math.sin(i / 4) * 8} ${386 + i * 3.6}`} fill="none" stroke={i % 2 ? '#885c53' : '#f1ccb2'} strokeWidth="2"/>)}
    <g clipPath={`url(#${id}-clip)`}>
      {gyri.map(d => <g key={d} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d={d} stroke="#754b49" strokeWidth="21"/><path d={d} stroke="#ad7e6d" strokeWidth="16"/><path d={d} stroke="#e6b69b" strokeWidth="11" transform="translate(-2 -3)"/><path d={d} stroke="#f6d0b4" strokeWidth="3" transform="translate(-3 -5)" opacity=".55"/></g>)}
      <path d="M252 85 C263 114 247 139 257 170 S246 222 257 250 S246 313 253 345 L249 380" fill="none" stroke="#754b49" strokeWidth="4"/>
    </g>
    {section && <Incision id={id} d="M269 176 C311 141 384 180 392 233 C401 283 363 331 307 327 L283 295 Q331 298 350 263 C369 231 323 191 282 218Z">
      <path d="M285 217 C325 193 366 222 354 256 Q343 282 305 277" fill="none" stroke="#eee0bd" strokeWidth="17"/>
      <ellipse cx="313" cy="274" rx="22" ry="16" fill="#be8c7b" stroke="#e3baa0" strokeWidth="2"/>
      <path d="M292 299 Q276 324 279 347" fill="none" stroke="#d8b89b" strokeWidth="6"/>
    </Incision>}
    <g className="network-layer" opacity={networks ? 1 : .35}>
      <Vessel d="M252 376 Q222 333 218 290 L183 250 L149 214 M218 290 L165 303 L126 288 M183 250 L183 199 L210 166 M265 378 Q299 345 330 293 L377 247 L406 233 M330 293 L326 239 L302 209 M377 247 L379 201" width={3.3}/>
      <Vessel d="M184 249 L153 258 M165 303 L149 334 M183 199 L155 176 M326 239 L350 220 M330 293 L365 309 M302 209 L297 182" width={1.3}/>
    </g>
  </g>
}

export function Kidneys({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--kidneys">
    <Vessel d="M187 269 Q214 290 211 342 L219 520 M327 281 Q296 301 299 346 L290 521" width={10} color="#ddc4a0"/>
    <path d="M89 148 Q103 106 154 110 L182 138 Q125 124 89 148 M331 144 Q373 109 421 158 Q376 141 331 144" fill="#cfb783" stroke="#9d825b" strokeWidth="2"/>
    {[false, true].map(right => <g key={String(right)} transform={right ? 'translate(510 9) scale(-1 1)' : undefined}>
      <path d="M150 151 C107 133 84 192 85 242 C86 312 111 356 145 359" fill="none" stroke="#efb4a0" strokeWidth="3" opacity=".38"/>
      {section && <Incision id={id} d="M145 164 C105 153 87 208 95 259 C97 318 115 350 150 348 Q175 344 176 325 C151 289 153 249 178 220 Q194 182 145 164Z">
        {[0, 1, 2, 3, 4, 5].map(i => {
          const y = 189 + i * 26, x = 125 - Math.sin(i / 5 * Math.PI) * 17
          return <g key={i}><path d={`M${x - 13} ${y - 12} Q${x - 22} ${y} ${x - 10} ${y + 14} L164 265Z`} fill="#b87e68" stroke="#e4b795" strokeWidth="2"/>
            {[0, 1, 2].map(j => <path key={j} d={`M${x - 11 + j * 3} ${y - 7 + j * 6} L159 264`} stroke="#dfaa86" strokeWidth=".7"/>)}</g>
        })}
        <Vessel d="M178 289 L159 266 M159 266 L144 206 M159 266 L129 244 M159 266 L135 285 M159 266 L151 321" width={5} color="#eddbb5"/>
      </Incision>}
    </g>)}
    <g className="network-layer">
      <Vessel d="M252 110 L252 396 M252 247 Q218 241 188 251 M252 266 Q289 255 323 263" width={networks ? 13 : 10}/>
      <Vessel d="M272 117 L272 400 M272 260 Q226 276 190 265 M272 280 Q298 282 322 277" width={networks ? 16 : 12} vein/>
      {(section || networks) && <Vessel d="M189 252 L158 228 L146 192 M158 228 L123 225 M189 252 L155 285 L144 324 M323 264 L354 240 L369 211 M354 240 L390 253 M323 264 L357 304 L371 346" width={3}/>}
    </g>
  </g>
}

export function Bladder({ id, section, networks }: DetailProps) {
  return <g className="organ-details organ-details--bladder">
    <Vessel d="M153 98 C151 150 166 191 196 237 M358 99 C357 149 344 193 315 236" width={13} color="#dec4a0"/>
    <g clipPath={`url(#${id}-clip)`} fill="none" stroke="#f1c2a6" strokeWidth="1.7" opacity=".34">
      {Array.from({ length: 19 }, (_, i) => <path key={i} d={`M${144 + i * 12} 181 C${96 + i * 17} 272 ${177 + i * 8} 391 259 463 M149 ${205 + i * 10} Q254 ${257 + i * 9} 361 ${203 + i * 10}`}/>)}
    </g>
    {section && <Incision id={id} d="M186 224 Q251 199 325 226 C340 282 319 349 275 389 L257 421 L239 390 C194 350 169 280 186 224Z">
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${190 + i * 15} 242 q-12 25 1 43 t-1 38`} stroke="#cc927c" strokeWidth="3" fill="none"/>)}
      <path d="M207 313 L308 313 L257 405Z" fill="#cc9b83" stroke="#e8c4a3" strokeWidth="2"/>
      <ellipse cx="208" cy="313" rx="7" ry="4" fill="#61353a"/><ellipse cx="307" cy="313" rx="7" ry="4" fill="#61353a"/>
      <Vessel d="M258 405 L258 499" width={8} color="#e5c39e"/>
    </Incision>}
    <g className="network-layer" opacity={networks ? 1 : .45}>
      <Vessel d="M240 448 C213 393 168 347 167 271 L181 223 M273 448 C300 397 341 350 346 273 L332 222 M172 303 L212 272 M184 351 L221 326 M340 307 L301 279 M324 362 L287 340" width={3.4}/>
      <Vessel d="M231 443 Q164 349 158 283 M282 443 Q348 346 353 285" width={3} vein/>
    </g>
  </g>
}
