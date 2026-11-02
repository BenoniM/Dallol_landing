import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gallery1 from "../../assets/img/Frame814.png";
import gallery2 from "../../assets/img/Frame15.png";
import gallery3 from "../../assets/img/Frame16.png";
import gallery4 from "../../assets/img/Frame7.png";

const galleries = [
  {
    id: 1,
    image: gallery1,
    title: "Ato. Berhan Assefa",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
    link: "https://www.keypano.com/v/fvfex566478jee-1728020920.html",
  },
  {
    id: 2,
    image: gallery2,
    title: "Dr. Abdi Ermolo",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
    link: "https://www.keypano.com/v/ul1b60et884l6c-1725884388.html",
  },
  {
    id: 3,
    image: gallery3,
    title: "Ato. Gizachew Terga",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
    link: "https://www.keypano.com/v/8o4fdbt74v_b46-1723125684.html",
  },
  {
    id: 4,
    image: gallery4,
    title: "Ato. Henok Teka",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
    link: "https://www.keypano.com/v/98apb_1c43ay06-1721661744.html",
  },
];

// The cards are drawn with WebGL along a concave curve, so the images bend
// around the viewer (taller at the edges, shorter in the middle). Each card is
// one mesh of this many columns, so the GPU does all the drawing.
const SEGMENTS = 64;
const FLOATS_PER_VERTEX = 6; // x, y, u, v, across, down
const VERTS_PER_CARD = (SEGMENTS + 1) * 2;
// Column width (CSS px) for the 2D canvas fallback when WebGL is unavailable.
const COLUMN_PX = 4;
// The galleries are repeated around the ring so it can loop endlessly while
// the wrap-around point stays far off-screen.
const COPIES = 3;
// A distinct soft tint per gallery so neighbouring images read apart.
const TINTS = ["255, 76, 29", "8, 45, 56", "0, 4, 13", "150, 112, 78"];
const TINTS_GL = TINTS.map((rgb) => rgb.split(",").map((n) => Number(n) / 255));

const SLOTS_COUNT = galleries.length * COPIES;
const SLOTS = Array.from({ length: SLOTS_COUNT }, (_, i) => ({
  slot: i,
  gallery: i % galleries.length,
}));
const VERTEX_SHADER = `
attribute vec2 aPos;
attribute vec2 aUv;
attribute vec2 aCard;
uniform vec2 uSize;
varying vec2 vUv;
varying vec2 vCard;
void main() {
  vUv = aUv;
  vCard = aCard;
  vec2 clip = aPos / uSize * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`;

// Same soft tint (top-light, bottom-deep) and side shade as the 2D fallback.
const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D uTex;
uniform vec3 uTint;
uniform float uStrength;
uniform float uLoaded;
varying vec2 vUv;
varying vec2 vCard;
void main() {
  vec3 col = mix(vec3(0.898), texture2D(uTex, vUv).rgb, uLoaded);
  float y = vCard.y;
  float tint = y < 0.38 ? mix(0.22, 0.05, y / 0.38)
    : y < 0.62 ? mix(0.05, 0.12, (y - 0.38) / 0.24)
    : mix(0.12, 0.6, (y - 0.62) / 0.38);
  col = mix(col, uTint, tint * uStrength);
  float x = vCard.x;
  float shade = 0.16 * (max(0.0, 1.0 - x / 0.22) + max(0.0, (x - 0.78) / 0.22));
  col = mix(col, vec3(0.0, 0.016, 0.051), shade * uStrength);
  gl_FragColor = vec4(col, 1.0);
}`;

// Set up the WebGL program and buffers; returns null if WebGL is unavailable.
const createGLRenderer = (canvas) => {
  const gl = canvas.getContext("webgl", {
    antialias: true,
    alpha: true,
    premultipliedAlpha: true,
  });
  if (!gl) return null;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  const stride = FLOATS_PER_VERTEX * 4;
  [
    ["aPos", 0],
    ["aUv", 2],
    ["aCard", 4],
  ].forEach(([name, offset]) => {
    const loc = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, stride, offset * 4);
  });

  return {
    kind: "gl",
    gl,
    uSize: gl.getUniformLocation(program, "uSize"),
    uTint: gl.getUniformLocation(program, "uTint"),
    uStrength: gl.getUniformLocation(program, "uStrength"),
    uLoaded: gl.getUniformLocation(program, "uLoaded"),
    textures: [],
    data: new Float32Array(SLOTS_COUNT * VERTS_PER_CARD * FLOATS_PER_VERTEX),
  };
};

// Scroll room (in viewport heights) for the section; the centre card zooms
// while the stage is pinned.
const SECTION_VH = 260;
const ZOOM_START = 0.04;
const ZOOM_END = 0.78;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const mod = (n, m) => ((n % m) + m) % m;
// Signed distance of slot i from the current offset, wrapped to the ring.
const ringDistance = (i, offset) => {
  const total = SLOTS.length;
  let d = mod(i - offset, total);
  if (d >= total / 2) d -= total;
  return d;
};

const CardGallery = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sizeRef = useRef({ W: 0, H: 0 });
  const imagesRef = useRef([]);
  const hitsRef = useRef([]);
  const titlesRef = useRef([]);
  const descsRef = useRef([]);
  const stateRef = useRef({
    offset: 0,
    target: 0,
    zoom: 0,
    spacing: 300,
    dragging: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    moved: false,
    pressedSlot: null,
    tickerOffset: null,
    dirty: true,
  });
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const handleReadMore = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank"); // Opens external links in a new tab
    } else {
      navigate(link); // Navigates to internal routes
    }
  };

  // Draw every visible card for the current offset and zoom.
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    const { W, H } = sizeRef.current;
    if (!canvas || !renderer || !W || !H) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.round(W * dpr);
    const ph = Math.round(H * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }

    const st = stateRef.current;
    const t = easeInOut(st.zoom);
    const isMobile = W < 640;
    const isTablet = W < 1024;

    const h = H * (isMobile ? 0.7 : 0.78);
    const w = Math.min(W * (isMobile ? 0.66 : isTablet ? 0.36 : 0.23), h * 0.7);
    const gap = w * (isMobile ? 0.08 : 0.11);
    const spacing = w + gap;
    st.spacing = spacing;

    // While zooming, the centre card grows towards the full stage, pushing
    // its neighbours outwards, and the curve flattens out.
    const zoomW = lerp(w, W * (isMobile ? 0.9 : 0.84), t);
    const zoomH = lerp(h, H * 0.98, t);
    const edge = W / 2;
    const cy = H / 2;
    const bend = isMobile ? 0.18 : 0.26; // extra height at the screen edges
    const k = ((1 - 1 / (1 + bend)) / (edge * edge)) * (1 - t);
    const scaleAt = (s) => 1 / Math.max(0.4, 1 - k * s * s);

    // Lay out the cards that are on screen.
    const cards = [];
    SLOTS.forEach(({ gallery }, i) => {
      const d = ringDistance(i, st.offset);
      const near = Math.max(0, 1 - Math.abs(d));
      const cw = w + (zoomW - w) * near;
      const ch = h + (zoomH - h) * near;
      const sc =
        d * spacing + Math.sign(d) * Math.min(Math.abs(d), 1) * ((zoomW - w) / 2);
      const sL = sc - cw / 2;
      const sR = sc + cw / 2;
      const xL = sL * scaleAt(sL) + edge;
      const xR = sR * scaleAt(sR) + edge;
      if (xR < 0 || xL > W) return;
      // Side cards keep the full tint; it lifts off the centre card as it
      // settles and zooms in.
      const strength = lerp(1, 0.45, near) * (1 - 0.55 * t * near);
      cards.push({ slot: i, gallery, sL, cw, ch, xL, xR, strength });
    });
    hitsRef.current = cards.map((c) => ({ slot: c.slot, x0: c.xL, x1: c.xR }));

    // Object-fit: cover crop of an image for a card of the given shape.
    const coverCrop = (img, cw, ch) => {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const cardAspect = cw / ch;
      const fx = Math.min(1, cardAspect / imgAspect);
      const fy = Math.min(1, imgAspect / cardAspect);
      return { u0: (1 - fx) / 2, v0: (1 - fy) / 2, fx, fy };
    };

    if (renderer.kind === "gl") {
      const { gl, data, textures } = renderer;
      gl.viewport(0, 0, pw, ph);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(renderer.uSize, W, H);

      let o = 0;
      cards.forEach(({ gallery, sL, cw, ch }) => {
        const img = imagesRef.current[gallery];
        const crop =
          img && img.naturalWidth
            ? coverCrop(img, cw, ch)
            : { u0: 0, v0: 0, fx: 1, fy: 1 };
        for (let c = 0; c <= SEGMENTS; c++) {
          const a = c / SEGMENTS;
          const s = sL + cw * a;
          const scale = scaleAt(s);
          const x = s * scale + edge;
          const hh = (ch * scale) / 2;
          const u = crop.u0 + crop.fx * a;
          data[o++] = x;
          data[o++] = cy - hh;
          data[o++] = u;
          data[o++] = crop.v0;
          data[o++] = a;
          data[o++] = 0;
          data[o++] = x;
          data[o++] = cy + hh;
          data[o++] = u;
          data[o++] = crop.v0 + crop.fy;
          data[o++] = a;
          data[o++] = 1;
        }
      });
      gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, o), gl.DYNAMIC_DRAW);

      cards.forEach(({ gallery, strength }, n) => {
        const texture = textures[gallery];
        gl.bindTexture(gl.TEXTURE_2D, texture || null);
        gl.uniform1f(renderer.uLoaded, texture ? 1 : 0);
        gl.uniform3fv(renderer.uTint, TINTS_GL[gallery % TINTS_GL.length]);
        gl.uniform1f(renderer.uStrength, strength);
        gl.drawArrays(gl.TRIANGLE_STRIP, n * VERTS_PER_CARD, VERTS_PER_CARD);
      });
    } else {
      const ctx = renderer.ctx;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;

      cards.forEach(({ gallery, sL, cw, ch, xL, xR, strength }) => {
        // Sample the curve; a flat card (fully zoomed) needs a single column.
        const cols = k === 0 ? 1 : Math.max(8, Math.ceil((xR - xL) / COLUMN_PX));
        const xs = [];
        const hs = [];
        let maxH = 0;
        for (let c = 0; c <= cols; c++) {
          const s = sL + (cw * c) / cols;
          const scale = scaleAt(s);
          xs.push(s * scale + edge);
          hs.push((ch * scale) / 2);
          maxH = Math.max(maxH, hs[c]);
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xs[0], cy - hs[0]);
        for (let c = 1; c <= cols; c++) ctx.lineTo(xs[c], cy - hs[c]);
        for (let c = cols; c >= 0; c--) ctx.lineTo(xs[c], cy + hs[c]);
        ctx.closePath();
        ctx.clip();

        const img = imagesRef.current[gallery];
        if (img && img.complete && img.naturalWidth) {
          const crop = coverCrop(img, cw, ch);
          const iw = img.naturalWidth;
          const ih = img.naturalHeight;
          const srcW = (crop.fx * iw) / cols;
          for (let c = 0; c < cols; c++) {
            const dw = xs[c + 1] - xs[c];
            const colH = Math.max(hs[c], hs[c + 1]);
            // Overlap into the next column (with matching source) so no seams.
            const over = c < cols - 1 ? 0.75 : 0;
            ctx.drawImage(
              img,
              crop.u0 * iw + srcW * c,
              crop.v0 * ih,
              srcW * ((dw + over) / dw),
              crop.fy * ih,
              xs[c],
              cy - colH,
              dw + over,
              colH * 2
            );
          }
        } else {
          ctx.fillStyle = "#e5e5e5";
          ctx.fillRect(xL, cy - maxH, xR - xL, maxH * 2);
        }

        const rgb = TINTS[gallery % TINTS.length];
        ctx.globalAlpha = strength;
        const vGrad = ctx.createLinearGradient(0, cy - maxH, 0, cy + maxH);
        vGrad.addColorStop(0, `rgba(${rgb}, 0.22)`);
        vGrad.addColorStop(0.38, `rgba(${rgb}, 0.05)`);
        vGrad.addColorStop(0.62, `rgba(${rgb}, 0.12)`);
        vGrad.addColorStop(1, `rgba(${rgb}, 0.6)`);
        ctx.fillStyle = vGrad;
        ctx.fillRect(xL, cy - maxH, xR - xL, maxH * 2);
        const hGrad = ctx.createLinearGradient(xL, 0, xR, 0);
        hGrad.addColorStop(0, "rgba(0, 4, 13, 0.16)");
        hGrad.addColorStop(0.22, "rgba(0, 4, 13, 0)");
        hGrad.addColorStop(0.78, "rgba(0, 4, 13, 0)");
        hGrad.addColorStop(1, "rgba(0, 4, 13, 0.16)");
        ctx.fillStyle = hGrad;
        ctx.fillRect(xL, cy - maxH, xR - xL, maxH * 2);
        ctx.restore();
      });
    }

    // Caption ticker (as in Our Happy Clients): the next gallery's text rises
    // from below while the current one leaves upwards, following the drag.
    if (st.tickerOffset === st.offset) return;
    st.tickerOffset = st.offset;
    const tickerPos = mod(st.offset, galleries.length);
    galleries.forEach((_, idx) => {
      let d = mod(idx - tickerPos, galleries.length);
      if (d >= galleries.length / 2) d -= galleries.length;
      [titlesRef.current[idx], descsRef.current[idx]].forEach((el) => {
        if (!el) return;
        el.style.transform = `translate3d(0, ${(d * 100).toFixed(2)}%, 0)`;
        el.style.opacity = Math.max(0, 1 - Math.abs(d) * 1.3).toFixed(3);
        el.style.visibility = Math.abs(d) < 1.1 ? "visible" : "hidden";
      });
    });

    const current = mod(Math.round(st.offset), SLOTS.length) % galleries.length;
    if (current !== activeRef.current) {
      activeRef.current = current;
      setActive(current);
    }
  }, []);

  // Animation loop: ease the offset towards its snap target and redraw only
  // when something changed.
  useEffect(() => {
    let raf;
    const tick = () => {
      const st = stateRef.current;
      if (!st.dragging) {
        const diff = st.target - st.offset;
        if (Math.abs(diff) > 0.0005) {
          st.offset += diff * 0.12;
          st.dirty = true;
        } else if (diff !== 0) {
          st.offset = st.target;
          st.dirty = true;
        }
      }
      if (st.dirty) {
        st.dirty = false;
        render();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [render]);

  // Scroll drives the zoom of the centre card while the stage is pinned.
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = clamp01(-rect.top / scrollable);
      const zoom = clamp01((progress - ZOOM_START) / (ZOOM_END - ZOOM_START));
      const st = stateRef.current;
      if (zoom !== st.zoom) {
        st.zoom = zoom;
        st.dirty = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Pick a renderer, keep the stage size cached (so drawing never forces a
  // layout), and load the gallery images; redraw as each one arrives.
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const renderer = createGLRenderer(canvas) || {
      kind: "2d",
      ctx: canvas.getContext("2d"),
    };
    rendererRef.current = renderer;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      sizeRef.current = { W: width, H: height };
      stateRef.current.dirty = true;
    });
    observer.observe(stage);

    imagesRef.current = galleries.map((g, idx) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (renderer.kind === "gl") {
          const { gl } = renderer;
          const texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          renderer.textures[idx] = texture;
        }
        stateRef.current.dirty = true;
      };
      img.src = g.image;
      return img;
    });

    return () => observer.disconnect();
  }, []);

  // Horizontal trackpad swipes move the ring and settle on the nearest card.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let settle;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const st = stateRef.current;
      st.offset += e.deltaX / st.spacing;
      st.target = st.offset;
      st.dirty = true;
      clearTimeout(settle);
      settle = setTimeout(() => {
        st.target = Math.round(st.offset);
      }, 120);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      clearTimeout(settle);
    };
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    const st = stateRef.current;
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const hit = hitsRef.current.find((c) => x >= c.x0 && x <= c.x1);
    st.dragging = true;
    st.pointerId = e.pointerId;
    st.startX = e.clientX;
    st.startOffset = st.offset;
    st.lastX = e.clientX;
    st.lastT = performance.now();
    st.velocity = 0;
    st.moved = false;
    st.pressedSlot = hit ? hit.slot : null;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const st = stateRef.current;
    if (!st.dragging || e.pointerId !== st.pointerId) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 6) st.moved = true;
    const now = performance.now();
    const dt = Math.max(1, now - st.lastT);
    st.velocity = lerp(st.velocity, (e.clientX - st.lastX) / dt, 0.4);
    st.lastX = e.clientX;
    st.lastT = now;
    st.offset = st.startOffset - dx / st.spacing;
    st.target = st.offset;
    st.dirty = true;
  };

  const handlePointerUp = (e) => {
    const st = stateRef.current;
    if (!st.dragging || e.pointerId !== st.pointerId) return;
    st.dragging = false;
    st.pointerId = null;

    if (st.moved) {
      // Fling: carry the release velocity a little further, then snap.
      st.target = Math.round(st.offset - (st.velocity * 220) / st.spacing);
      return;
    }

    st.target = Math.round(st.offset);
    if (st.pressedSlot === null || e.type === "pointercancel") return;
    const d = Math.round(ringDistance(st.pressedSlot, st.offset));
    if (d === 0) {
      handleReadMore(galleries[SLOTS[st.pressedSlot].gallery].link);
    } else {
      st.target = Math.round(st.offset) + d;
    }
  };

  const handleKeyDown = (e) => {
    const st = stateRef.current;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      st.target = Math.round(st.target) + 1;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      st.target = Math.round(st.target) - 1;
    } else if (e.key === "Enter") {
      handleReadMore(galleries[activeRef.current].link);
    }
  };

  return (
    <article
      ref={containerRef}
      className="relative w-full bg-white font-montserrat"
      style={{ height: `${SECTION_VH}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col pt-3 sm:pt-4 pb-5 sm:pb-6 overflow-hidden">
        {/* Curved, draggable ring of gallery images */}
        <div
          ref={stageRef}
          role="region"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="360 Gallery"
          className="relative flex-1 min-h-0 w-full select-none cursor-grab active:cursor-grabbing outline-none"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          onDragStart={(e) => e.preventDefault()}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          />
        </div>

        {/* Details of the card currently in the centre: title and
            description on opposite edges, Explore 360 in the middle */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center gap-3 md:gap-8 px-4 sm:px-8 lg:px-[60px] pt-4 sm:pt-5">
          <div className="grid overflow-hidden md:justify-self-start" aria-live="polite">
            {galleries.map((gallery, idx) => (
              <h2
                key={gallery.id}
                ref={(el) => (titlesRef.current[idx] = el)}
                aria-hidden={idx !== active}
                className="col-start-1 row-start-1 text-2xl sm:text-3xl xl:text-[2.4rem] font-bold leading-tight tracking-tight text-[#00040D] will-change-transform"
                style={{
                  transform: `translate3d(0, ${idx * 100}%, 0)`,
                  opacity: idx === 0 ? 1 : 0,
                  visibility: idx === 0 ? "visible" : "hidden",
                }}
              >
                {gallery.title}
              </h2>
            ))}
          </div>

          <button
            onClick={() => handleReadMore(galleries[active].link)}
            className="order-last md:order-none justify-self-center h-12 sm:h-14 px-8 sm:px-10 bg-[#FF4C1D] text-white font-mono uppercase tracking-wide text-base sm:text-lg hover:bg-[#00040D] transition-colors"
          >
            Explore 360
          </button>

          <div className="grid overflow-hidden md:justify-self-end md:max-w-md lg:max-w-lg">
            {galleries.map((gallery, idx) => (
              <p
                key={gallery.id}
                ref={(el) => (descsRef.current[idx] = el)}
                aria-hidden={idx !== active}
                className="col-start-1 row-start-1 text-sm sm:text-[0.95rem] leading-snug text-neutral-600 md:text-right will-change-transform"
                style={{
                  transform: `translate3d(0, ${idx * 100}%, 0)`,
                  opacity: idx === 0 ? 1 : 0,
                  visibility: idx === 0 ? "visible" : "hidden",
                }}
              >
                {gallery.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardGallery;
