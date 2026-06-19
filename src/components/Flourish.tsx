/**
 * Decorative hero flourish: a stylized spider web anchored in the hero's
 * top-right corner — radial spokes with gently sagging (catenary) threads for a
 * delicate, hand-drawn feel — plus a small dangling spider, a loose curling
 * silk strand, and a few dewdrops for whimsy. A quiet nod to *web* development.
 * Geometric line-art in low-opacity teal. Purely decorative: `aria-hidden`, no
 * pointer events, sits behind the hero content. Static by design.
 *
 * Colors come from `currentColor` (set to the teal accent in CSS); per-group
 * opacity is set in App.css so the web and the spider/dew accents can be dialed
 * without touching the geometry. The hub sits at the SVG's top-right (240,0),
 * which is pinned to the hero corner.
 */
export function Flourish() {
  return (
    <div className="flourish" aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Web: spokes from the corner hub + sagging connecting threads. */}
        <g
          className="flourish-web"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* spokes from the hub (240,0) */}
          <g strokeWidth="1.3">
            <line x1="240" y1="0" x2="10" y2="0" />
            <line x1="240" y1="0" x2="27" y2="88" />
            <line x1="240" y1="0" x2="77" y2="163" />
            <line x1="240" y1="0" x2="152" y2="213" />
            <line x1="240" y1="0" x2="240" y2="230" />
          </g>
          {/* outer frame thread tying the spoke ends (slightly heavier, as a
           * real web's anchor/frame threads are) */}
          <path
            d="M10,0 Q45,39 27,88 Q75,110 77,163 Q130,165 152,213 Q201,195 240,230"
            strokeWidth="1.2"
          />
          {/* threads (rings) — concave arcs sagging toward the hub */}
          <g strokeWidth="1">
            <path d="M170,0 Q185,11 175,27 Q193,32 191,50 Q209,47 213,65 Q229,55 240,70" />
            <path d="M105,0 Q133,21 115,52 Q150,60 145,95 Q180,90 188,125 Q219,107 240,135" />
            <path d="M40,0 Q82,32 55,77 Q106,89 99,141 Q151,134 163,185 Q208,158 240,200" />
          </g>
          {/* a loose silk strand that has come adrift, curling down */}
          <path
            d="M188,125 C186,143 195,153 188,167 C182,179 190,189 185,201"
            strokeWidth="0.9"
          />
        </g>

        {/* Spider + dewdrop accents — a touch stronger so they reward a look.
         * The spider rappels: a long vertical dragline pays out from the
         * spinneret (rear tip of the abdomen), so it hangs abdomen-up with the
         * cephalothorax and legs below. */}
        <g
          className="flourish-spider"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* long vertical dragline from a thread to the spinneret */}
          <line x1="115" y1="52" x2="115" y2="151" strokeWidth="1.1" />
          {/* legs (four each side), splayed from the cephalothorax */}
          <g strokeWidth="1.4" fill="none">
            <path d="M113,170 Q102,164 95,167" />
            <path d="M113,172 Q100,171 94,175" />
            <path d="M113,174 Q101,178 96,183" />
            <path d="M114,176 Q104,183 99,189" />
            <path d="M117,170 Q128,164 135,167" />
            <path d="M117,172 Q130,171 136,175" />
            <path d="M117,174 Q129,178 134,183" />
            <path d="M116,176 Q126,183 131,189" />
          </g>
          {/* body: abdomen (top, spinneret toward the thread) + cephalothorax */}
          <g fill="currentColor" stroke="none">
            <ellipse cx="115" cy="160" rx="6.5" ry="9" />
            <circle cx="115" cy="172" r="4" />
            {/* dewdrops caught on the threads */}
            <circle cx="145" cy="95" r="1.7" />
            <circle cx="55" cy="77" r="1.5" />
            <circle cx="213" cy="65" r="1.4" />
          </g>
        </g>
      </svg>
    </div>
  );
}
