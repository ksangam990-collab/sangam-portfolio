import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  X,
  Sparkles,
  Code2,
  Database,
  Cpu,
  Layers,
  Award,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Download,
  Copy,
  Check,
  Server,
  Cloud,
} from "lucide-react";

// =========================================================================
// 0. REAL-TIME 3D CANVAS ROTATING FAVICON ENGINE (DESKTOP ONLY)
// =========================================================================
const use3DCanvasFavicon = () => {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let faviconLink = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      document.head.appendChild(faviconLink);
    }

    const nodes: [number, number, number][] = [
      [-0.7, 0.8, -0.3], [0.7, 0.8, 0.3],
      [-0.7, 0.1, 0.3],  [0.7, 0.1, -0.3],
      [-0.7, -0.8, -0.3], [0.7, -0.8, 0.3],
    ];

    const edges = [
      [0, 1], [0, 2], [2, 3], [3, 5], [4, 5]
    ];

    let angle = 0;
    let intervalId: number;

    const render3DFavicon = () => {
      ctx.clearRect(0, 0, 32, 32);

      ctx.fillStyle = "#05070D";
      ctx.beginPath();
      ctx.roundRect(0, 0, 32, 32, 8);
      ctx.fill();

      ctx.strokeStyle = "#00F5D4";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      angle += 0.06;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const projected = nodes.map(([x, y, z]) => {
        const x1 = x * cosA - z * sinA;
        const z1 = x * sinA + z * cosA;
        const scale = 11 / (2.2 + z1);
        return {
          px: 16 + x1 * scale * 1.5,
          py: 16 - y * scale * 1.5,
          z: z1,
        };
      });

      edges.forEach(([start, end]) => {
        const p1 = projected[start];
        const p2 = projected[end];
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        grad.addColorStop(0, "#00F5D4");
        grad.addColorStop(1, "#A855F7");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      });

      faviconLink!.href = canvas.toDataURL("image/png");
    };

    intervalId = window.setInterval(render3DFavicon, 60);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);
};

// =========================================================================
// 1. HARDWARE-ACCELERATED CUSTOM CYBER CURSOR (DESKTOP ONLY)
// =========================================================================
const CustomCyberCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        "button, a, input, [role='button'], .hover-interactive"
      );
      setIsHovered(isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        animate={{
          x: mousePos.x - 3.5,
          y: mousePos.y - 3.5,
          scale: isClicked ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 50 }}
        className="w-2 h-2 rounded-full bg-[#00F5D4] shadow-[0_0_12px_#00F5D4]"
      />

      <motion.div
        animate={{
          x: mousePos.x - (isHovered ? 24 : 16),
          y: mousePos.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderColor: isHovered ? "#00F5D4" : "rgba(123, 44, 191, 0.65)",
          backgroundColor: isHovered ? "rgba(0, 245, 212, 0.08)" : "transparent",
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="rounded-full border-2 fixed pointer-events-none backdrop-blur-[1px]"
      />
    </div>
  );
};

// =========================================================================
// 2. 3D MATRIX TERRAIN CANVAS (ULTRA-OPTIMIZED FOR BOTH MOBILE & DESKTOP)
// =========================================================================
const Interactive3DMatrixTerrain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      const curIsMobile = window.innerWidth < 768;
      const curDpr = curIsMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.width = window.innerWidth * curDpr;
      height = canvas.height = window.innerHeight * curDpr;
      ctx.scale(curDpr, curDpr);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const ripples: { x: number; y: number; r: number; maxR: number; alpha: number }[] = [];
    const onClick = (e: MouseEvent) => {
      if (isMobile) return;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 6,
        maxR: 180,
        alpha: 0.9,
      });
    };

    if (!isMobile) {
      window.addEventListener("click", onClick, { passive: true });
    }

    const starCount = isMobile ? 22 : 60;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: (Math.random() - 0.5) * window.innerHeight * 1.5,
      z: Math.random() * 1000 + 100,
      size: Math.random() * 1.4 + 0.8,
      color: Math.random() > 0.4 ? "#00F5D4" : "#7B2CBF",
    }));

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const cols = isMobile ? 12 : 24;
    const rows = isMobile ? 10 : 18;
    const spacing = isMobile ? 85 : 62;
    let time = 0;

    const render = () => {
      const renderW = window.innerWidth;
      const renderH = window.innerHeight;
      ctx.clearRect(0, 0, renderW, renderH);
      time += 0.014;

      // 1. Background Stars
      stars.forEach((star) => {
        star.z -= 1.0;
        if (star.z <= 10) star.z = 1000;

        const k = 380 / star.z;
        const px = (star.x - mouseX * 2) * k + renderW / 2;
        const py = (star.y - mouseY * 2) * k + renderH / 2;

        if (px >= 0 && px <= renderW && py >= 0 && py <= renderH) {
          const alpha = Math.min(1, Math.max(0.1, (1000 - star.z) / 800));
          ctx.beginPath();
          ctx.arc(px, py, star.size * k, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // 2. Desktop Click Waves
      if (!isMobile) {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.r += 3.6;
          rip.alpha -= 0.018;

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 245, 212, ${Math.max(0, rip.alpha)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (rip.alpha <= 0 || rip.r >= rip.maxR) {
            ripples.splice(i, 1);
          }
        }
      }

      // 3. 3D Perspective Grid
      const fov = 380;
      const cameraY = -140 - mouseY;
      const cameraZ = 440;
      const rotY = (mouseX / renderW) * 0.4;

      const grid: { sx: number; sy: number; z: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const wx = (c - cols / 2) * spacing;
          const wz = (r - rows / 2) * spacing;

          const dist = Math.sqrt(wx * wx + wz * wz);
          const wy = Math.sin(dist * 0.025 - time) * 26 + Math.cos(wx * 0.04 + time) * 12;

          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          const rx = wx * cosY - wz * sinY;
          const rz = wx * sinY + wz * cosY;

          const y2 = wy - cameraY;
          const z2 = rz + cameraZ;

          if (z2 > 10) {
            const scale = fov / z2;
            const sx = renderW / 2 + rx * scale;
            const sy = renderH / 2 + y2 * scale;
            grid[r][c] = { sx, sy, z: z2 };
          } else {
            grid[r][c] = { sx: -9999, sy: -9999, z: 0 };
          }
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p1 = grid[r][c];
          if (p1.sx === -9999) continue;

          const alpha = Math.max(0.06, Math.min(0.45, (850 - p1.z) / 750));

          if (c < cols - 1) {
            const p2 = grid[r][c + 1];
            if (p2.sx !== -9999) {
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.strokeStyle = `rgba(0, 245, 212, ${alpha * 0.65})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          if (r < rows - 1) {
            const p3 = grid[r + 1][c];
            if (p3.sx !== -9999) {
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p3.sx, p3.sy);
              ctx.strokeStyle = `rgba(123, 44, 191, ${alpha * 0.7})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("click", onClick);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 w-full h-full"
    />
  );
};

// =========================================================================
// 3. 3D WIREFRAME ICOSAHEDRON
// =========================================================================
const InteractivePolyhedron3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    const size = isMobile ? 120 : 160;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const phi = (1 + Math.sqrt(5)) / 2;
    const a = 1;
    const b = 1 / phi;

    const vertices = [
      [-b, a, 0], [b, a, 0], [-b, -a, 0], [b, -a, 0],
      [0, -b, a], [0, b, a], [0, -b, -a], [0, b, -a],
      [a, 0, -b], [a, 0, b], [-a, 0, -b], [-a, 0, b],
    ];

    const edges = [
      [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
      [3, 4], [3, 6], [3, 8], [3, 9],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9],
      [10, 11],
    ];

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      rotX += 0.01;
      rotY += 0.015;

      const scale = isMobile ? 28 : 38;
      const center = size / 2;

      const projected = vertices.map(([x, y, z]) => {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const distance = 3.5;
        const pScale = distance / (distance + z2);

        return {
          x: center + x1 * scale * pScale,
          y: center + y2 * scale * pScale,
          z: z2,
        };
      });

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.2, (avgZ + 2) / 4);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0, 245, 212, ${alpha * 0.85})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#7B2CBF";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative group shrink-0 pointer-events-none">
      <div className="absolute -inset-2 bg-cyan-500/15 rounded-full blur-xl opacity-40 pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="relative w-24 h-24 sm:w-36 sm:h-36 pointer-events-none"
      />
    </div>
  );
};

// =========================================================================
// 4. VERTICAL SCROLL DEPTH HUD
// =========================================================================
const SECTIONS = [
  { id: "hero", label: "01. Introduction" },
  { id: "about", label: "02. Core Stack" },
  { id: "services", label: "03. Solutions" },
  { id: "projects", label: "04. Case Studies" },
  { id: "experience", label: "05. Track Record" },
];

const ScrollHUD: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const { scrollYProgress } = useScroll();
  const heightPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6 pointer-events-auto">
      <div className="relative w-[2px] h-36 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          style={{ height: heightPercent }}
          className="w-full bg-gradient-to-b from-[#00F5D4] via-[#4361EE] to-[#7B2CBF] rounded-full shadow-[0_0_10px_#00F5D4]"
        />
      </div>

      <div className="flex flex-col gap-3">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => {
                document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative flex items-center justify-end cursor-pointer"
            >
              <span className="absolute right-6 text-[10px] font-mono text-[#00F5D4] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap bg-[#0A0E17]/90 px-2 py-0.5 rounded border border-white/10">
                {sec.label}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#00F5D4] scale-150 shadow-[0_0_8px_#00F5D4]"
                    : "bg-white/20 group-hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

// =========================================================================
// 5. TOAST NOTIFICATION
// =========================================================================
const Toast: React.FC<{ message: string | null; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 2400);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#090E1A] border border-[#00F5D4]/60 text-white font-mono text-xs shadow-[0_0_30px_rgba(0,245,212,0.4)] backdrop-blur-md"
    >
      <Check className="w-4 h-4 text-[#00F5D4]" />
      <span>{message}</span>
    </motion.div>
  );
};

// =========================================================================
// 6. 3D GYRO PERSPECTIVE TILT (DESKTOP ONLY)
// =========================================================================
const TiltCard3D: React.FC<{ children: React.ReactNode; className?: string; intensity?: number }> = ({
  children,
  className = "",
  intensity = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// =========================================================================
// 7. MOTION HELPERS & ANIMATED BIO
// =========================================================================
const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}> = ({ children, delay = 0, duration = 0.5, x = 0, y = 20, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "20px", amount: 0.1 }}
    transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const GlowingPillButton: React.FC<{
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}> = ({ label, onClick, icon, className = "" }) => (
  <button
    onClick={onClick}
    className={`relative group inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden font-semibold uppercase tracking-widest text-xs sm:text-sm cursor-pointer shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:shadow-[0_0_35px_rgba(123,44,191,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-[#00F5D4] via-[#4361EE] to-[#7B2CBF] animate-pulse" />
    <span className="relative w-full px-6 py-3.5 sm:px-9 sm:py-4 bg-[#05070D] rounded-full text-white flex items-center justify-center gap-2.5 group-hover:bg-[#05070D]/70 transition-colors">
      {icon || <Sparkles className="w-4 h-4 text-[#00F5D4]" />}
      <span>{label}</span>
    </span>
  </button>
);

const AnimatedBioText: React.FC<{ text: string }> = ({ text }) => {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.88", "end 0.5"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={targetRef}
      style={{ fontSize: "clamp(1.05rem, 2vw, 1.45rem)" }}
      className="text-[#D7E2EA] font-normal text-center leading-relaxed max-w-[780px] flex flex-wrap justify-center"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return <AnimatedWord key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
};

const AnimatedWord: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block mr-[0.28em] my-[0.05em]">
      <span className="opacity-20 text-gray-500">{word}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D7E2EA] to-[#00F5D4]"
      >
        {word}
      </motion.span>
    </span>
  );
};

// =========================================================================
// 8. HERO SECTION
// =========================================================================
const HeroSection: React.FC<{
  onContactClick: () => void;
}> = ({ onContactClick }) => (
  <section
    id="hero"
    className="relative min-h-[95vh] w-full flex flex-col justify-between bg-transparent select-none z-10 px-4 sm:px-10 lg:px-16 pt-3 sm:pt-5 pb-8"
  >
    <FadeIn delay={0} y={-10} className="w-full max-w-6xl mx-auto">
      <header className="flex items-center justify-between w-full backdrop-blur-xl py-2.5 px-4 sm:py-3 sm:px-6 rounded-full border border-white/15 bg-[#05070D]/80 shadow-2xl">
        <a href="#" className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[#00F5D4] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
          <span>SANGAM.DEV</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider font-medium text-[#D7E2EA]/80">
          <a href="#about" className="hover:text-[#00F5D4] transition-colors">About</a>
          <a href="#services" className="hover:text-[#00F5D4] transition-colors">Services</a>
          <a href="#projects" className="hover:text-[#00F5D4] transition-colors">Projects</a>
          <a href="#experience" className="hover:text-[#00F5D4] transition-colors">Experience</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/resume.pdf"
            download="Sangam_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium px-4 py-2 rounded-full border border-white/20 text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#00F5D4]" />
            <span>Resume</span>
          </a>
          <button
            onClick={onContactClick}
            className="text-[11px] sm:text-sm uppercase tracking-wider font-semibold px-4 sm:px-5 py-2 rounded-full border border-[#00F5D4]/50 bg-[#00F5D4]/15 text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.25)]"
          >
            Let&apos;s Talk
          </button>
        </div>
      </header>
    </FadeIn>

    <div className="flex flex-col items-center justify-center text-center my-auto py-6 sm:py-4 z-10 w-full max-w-5xl mx-auto">
      <FadeIn delay={0.1} y={15} className="w-full flex justify-center">
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00F5D4]/40 bg-[#00F5D4]/10 mb-4 text-[11px] sm:text-xs md:text-sm font-mono text-[#00F5D4] shadow-[0_0_20px_rgba(0,245,212,0.2)] max-w-[92vw] text-center leading-snug">
          <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span>Full Stack MERN Developer • AI Integrator</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} y={20} className="w-full">
        <h1 className="font-black uppercase tracking-tight leading-none text-[12.5vw] sm:text-[11vw] md:text-[8.5rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#E2E8F0] to-[#00F5D4]/40 drop-shadow-[0_15px_30px_rgba(0,245,212,0.25)] text-center">
          Hi, i&apos;m sangam
        </h1>
      </FadeIn>

      <FadeIn delay={0.2} y={15}>
        <p className="max-w-2xl text-[#D7E2EA]/90 font-light text-xs sm:text-base md:text-lg mt-3 leading-relaxed mx-auto px-3">
          Architecting scalable production web applications, high-throughput REST APIs, and dynamic 3D user experiences.
        </p>
      </FadeIn>

      <FadeIn delay={0.25} y={15} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
        <GlowingPillButton
          label="Explore Projects"
          className="w-full sm:w-auto"
          onClick={() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <a
          href="/resume.pdf"
          download="Sangam_Kumar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-[#00F5D4] uppercase tracking-widest text-xs sm:text-sm font-semibold hover:bg-cyan-400 hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.2)]"
        >
          <Download className="w-4 h-4" />
          <span>Download Resume</span>
        </a>
      </FadeIn>
    </div>

    <FadeIn delay={0.3} y={15} className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/15 backdrop-blur-sm text-center">
        <div className="flex flex-col items-center p-2">
          <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-[#4361EE]">15+</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium mt-0.5">RESTful APIs Built</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-[#4361EE]">~40%</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium mt-0.5">Efficiency Boost</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-[#4361EE]">3 Roles</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium mt-0.5">RBAC Security</span>
        </div>
        <div className="flex flex-col items-center p-2">
          <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-[#4361EE]">IIT-K</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA]/60 font-medium mt-0.5">MeitY Certified</span>
        </div>
      </div>
    </FadeIn>
  </section>
);

// =========================================================================
// 9. ABOUT SECTION
// =========================================================================
const SKILL_CATEGORIES = [
  {
    category: "Languages",
    icon: Code2,
    skills: ["JavaScript (ES6+)", "C", "C++", "Java", "Python"],
  },
  {
    category: "Frontend Stack",
    icon: Layers,
    skills: ["React.js", "Redux (basics)", "HTML5", "CSS3", "Framer Motion", "Tailwind CSS"],
  },
  {
    category: "Backend & Systems",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Role-Based Access Control (RBAC)"],
  },
  {
    category: "Database & Cloud DevOps",
    icon: Database,
    skills: ["MongoDB", "Mongoose", "Vercel", "Render", "Cloudinary"],
  },
  {
    category: "Tools & Platforms",
    icon: Cloud,
    skills: ["Git", "GitHub", "VS Code", "Postman", "GitHub Pages"],
  },
  {
    category: "Integrations & Workflows",
    icon: Sparkles,
    skills: ["AI Integration", "QR Code Generation", "CSV Export", "Recharts Analytics", "Agile Workflow"],
  },
];

const AboutSection: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const bioSummary =
    "Full Stack MERN Developer with proven experience building and deploying production-grade web applications. Proficient in React.js, Node.js, Express.js, MongoDB, JWT authentication, and REST API design. Active on GitHub with personal and internship projects, holding IIT Kanpur (MeitY) and industrial certifications. Seeking a Full Stack / Frontend Developer role to deliver scalable, user-focused digital solutions.";

  return (
    <section id="about" className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-4 sm:px-10 lg:px-16 py-16 sm:py-20 z-10 bg-transparent">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-xs font-mono text-purple-300 uppercase tracking-widest mb-4">
            <span>[ Architecture & Mindset ]</span>
          </div>
          <h2 className="font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D7E2EA] to-[#00F5D4]/40 mb-6 sm:mb-8">
            About Me
          </h2>
        </FadeIn>

        <AnimatedBioText text={bioSummary} />

        <div className="flex flex-col items-center w-full max-w-5xl mt-10 sm:mt-12 gap-6 sm:gap-8">
          <InteractivePolyhedron3D />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full text-left">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <FadeIn key={cat.category} delay={idx * 0.05} y={15}>
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#070B14]/85 border border-white/10 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-xl shadow-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                        <div className="p-2 rounded-xl bg-cyan-500/10 text-[#00F5D4]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-semibold text-white text-sm sm:text-base">{cat.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] sm:text-xs text-[#D7E2EA]/85 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <FadeIn delay={0.2} y={15} className="mt-8 sm:mt-10">
          <GlowingPillButton label="Get In Touch" onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

// =========================================================================
// 10. SERVICES SECTION
// =========================================================================
const SERVICES_DATA = [
  {
    num: "01",
    title: "Full Stack MERN Development",
    desc: "End-to-end production web applications engineered with React.js, Node.js, Express.js, and MongoDB Atlas. Clean component hierarchy, state management, and full CI/CD deployment.",
    icon: Code2,
    badge: "Production MERN",
  },
  {
    num: "02",
    title: "REST APIs & Auth Architecture",
    desc: "Designing and deploying 15+ secure RESTful APIs with JWT authentication, role-based access control (Admin, Staff, Customer), and Cloudinary file uploads.",
    icon: Database,
    badge: "15+ RESTful APIs",
  },
  {
    num: "03",
    title: "AI Integration & Automation",
    desc: "Integrating AI-driven smart scheduling algorithms for automated slot recommendations, booking conflict resolution, dynamic QR tokens, and CSV exports.",
    icon: Sparkles,
    badge: "~40% Manual Effort Reduction",
  },
  {
    num: "04",
    title: "Responsive Frontend & 3D UI",
    desc: "Crafting modern, fluid user interfaces with React, Tailwind CSS, Framer Motion, and mobile-first responsive Grid/Flexbox layouts.",
    icon: Layers,
    badge: "Mobile-First Design",
  },
  {
    num: "05",
    title: "Cloud Infrastructure & CI/CD",
    desc: "Deploying production applications across Vercel (frontend), Render (backend), MongoDB Atlas (database), and GitHub Pages with Git version control.",
    icon: Cpu,
    badge: "Render & Vercel",
  },
];

const ServicesSection: React.FC = () => (
  <section id="services" className="px-4 sm:px-10 lg:px-16 py-16 sm:py-20 relative z-10 bg-transparent">
    <div className="max-w-6xl mx-auto">
      <FadeIn delay={0} y={20}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-mono block mb-2">
            [ Engineered Solutions ]
          </span>
          <h2 className="font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-white">
            Services
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {SERVICES_DATA.map((srv, i) => {
          const Icon = srv.icon;
          return (
            <FadeIn key={srv.num} delay={i * 0.06} y={15} className="h-full">
              <TiltCard3D intensity={8} className="h-full">
                <div className="h-full p-5 sm:p-7 rounded-2xl bg-[#0A0F1D]/80 border border-white/15 hover:border-[#00F5D4]/70 transition-all duration-300 flex flex-col justify-between group shadow-xl backdrop-blur-xl">
                  <div>
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-white/30 group-hover:text-[#00F5D4] transition-colors">
                        {srv.num}
                      </span>
                      <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-[#00F5D4] group-hover:scale-105 group-hover:bg-[#00F5D4]/10 transition-all">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#00F5D4] block mb-1.5 sm:mb-2">
                      {srv.badge}
                    </span>
                    <h3 className="font-bold text-lg sm:text-xl uppercase tracking-tight text-white group-hover:text-[#00F5D4] transition-colors mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-light leading-relaxed text-[#D7E2EA]/80">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-3.5 mt-4 sm:pt-4 sm:mt-5 border-t border-white/10 flex items-center gap-1.5 text-xs font-mono text-[#00F5D4]">
                    <span>EXPLORE CAPABILITIES</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </TiltCard3D>
            </FadeIn>
          );
        })}
      </div>
    </div>
  </section>
);

// =========================================================================
// 11. PROJECTS SECTION
// =========================================================================
const PROJECTS_DATA = [
  {
    num: "01",
    tag: "Full Stack",
    category: "Production Full Stack • MERN & AI",
    name: "Smart Appointment & Queue Booking System (Slotly)",
    description:
      "Full-stack web application for real-time appointment scheduling and intelligent queue management. Implemented multi-role system (Admin, Staff, Customer) with JWT authentication, Cloudinary file uploads, QR code generation, Recharts analytics dashboards, and CSV export. Backend hosted on Render, frontend on Vercel, database on MongoDB Atlas. Integrated AI-assisted scheduling logic improving booking efficiency by ~35%.",
    liveUrl: "https://slotly.ksangam.dpdns.org",
    githubUrl: "https://github.com/ksangam990-collab",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tech: ["MERN Stack", "JWT", "Cloudinary", "Recharts", "AI Integration", "Vercel & Render", "QR Generation", "CSV Export"],
  },
  {
    num: "02",
    tag: "Frontend & 3D",
    category: "Personal Brand • Frontend UI",
    name: "Personal Portfolio Website & 3D Web",
    description:
      "Responsive portfolio web experience showcasing production projects, technical skills, and certifications using React.js with mobile-first CSS Flexbox/Grid layout and 3D visual engineering. Deployed on custom domain with Git version control.",
    liveUrl: "https://portfolio.ksangam.dpdns.org",
    githubUrl: "https://github.com/ksangam990-collab",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Cloudflare DNS"],
  },
  {
    num: "03",
    tag: "Backend & APIs",
    category: "Backend Microservices • REST Architecture",
    name: "Slotly API & Event Engine",
    description:
      "Engineered 15+ secure RESTful APIs powering real-time queue tracking, role-based access validation, automated notifications, and AI slot suggestions. Connected with MongoDB Atlas clustering and hosted on Render.",
    liveUrl: "https://slotly.ksangam.dpdns.org",
    githubUrl: "https://github.com/ksangam990-collab",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tech: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Postman", "Render", "MongoDB Atlas"],
  },
];

const FILTER_TABS = ["All", "Full Stack", "Frontend & 3D", "Backend & APIs"];

interface StackingCardProps {
  project: (typeof PROJECTS_DATA)[0];
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const StackingProjectCard: React.FC<StackingCardProps> = ({
  project,
  index,
  progress,
  range,
  targetScale,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 640);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="sticky flex items-center justify-center mb-8 sm:mb-12"
      style={{
        top: isMobile
          ? `calc(0.5rem + ${index * 12}px)`
          : `calc(4.5rem + ${index * 26}px)`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        className="w-full max-w-5xl lg:max-w-6xl bg-[#090E1A]/95 backdrop-blur-2xl border-2 border-cyan-500/40 rounded-2xl sm:rounded-[36px] p-4 sm:p-7 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-cyan-400 transition-colors"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <span className="font-mono font-black text-xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-[#7B2CBF]">
                  {project.num}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#00F5D4] font-mono px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30">
                  {project.category}
                </span>
              </div>

              <h3 className="font-bold text-base sm:text-2xl md:text-3xl uppercase tracking-tight text-white mb-2 sm:mb-3">
                {project.name}
              </h3>

              <p className="text-[11px] sm:text-sm md:text-base text-[#D7E2EA]/85 font-light leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-[#00F5D4]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1 sm:pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/15 text-[#00F5D4] font-medium uppercase tracking-widest px-4 py-1.5 sm:px-6 sm:py-2.5 text-[11px] sm:text-sm hover:bg-[#00F5D4] hover:text-black transition-all shadow-[0_0_15px_rgba(0,245,212,0.25)]"
              >
                <span>Live Deployment</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 h-[110px] sm:h-[220px] md:h-[280px] w-full rounded-xl sm:rounded-3xl overflow-hidden bg-[#151A27] border border-white/10 relative group">
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090E1A]/80 via-transparent to-transparent opacity-50" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const filteredProjects =
    activeTab === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.tag === activeTab);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-16 sm:py-24 px-3 sm:px-10 lg:px-16 relative z-10 bg-transparent min-h-[170vh]"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={25}>
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-mono block mb-2">
              [ Featured Case Studies ]
            </span>
            <h2 className="font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D7E2EA] to-[#7B2CBF]/40">
              Projects
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#00F5D4] text-black font-semibold shadow-[0_0_20px_rgba(0,245,212,0.4)]"
                  : "bg-[#0A0E17]/80 text-[#D7E2EA]/70 border border-white/10 hover:border-cyan-400/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative pb-16 sm:pb-24">
          {filteredProjects.map((proj, idx) => {
            const targetScale = 1 - (filteredProjects.length - idx) * 0.04;
            const startRange = idx * 0.25;
            return (
              <StackingProjectCard
                key={proj.num}
                project={proj}
                index={idx}
                progress={scrollYProgress}
                range={[startRange, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

// =========================================================================
// 12. EXPERIENCE & EDUCATION
// =========================================================================
const ExperienceSection: React.FC = () => (
  <section id="experience" className="py-16 sm:py-24 px-4 sm:px-10 lg:px-16 relative z-10 bg-transparent border-t border-white/10">
    <div className="max-w-6xl mx-auto">
      <FadeIn delay={0} y={25}>
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-mono block mb-2">
            [ Comprehensive Record ]
          </span>
          <h2 className="font-black uppercase tracking-tight text-3xl sm:text-5xl text-white">
            Experience & Education
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="flex flex-col gap-5 sm:gap-6">
          <FadeIn delay={0.1} y={20}>
            <div className="p-5 sm:p-8 rounded-2xl bg-[#0A0E17]/85 backdrop-blur-xl border border-white/15 shadow-2xl">
              <div className="flex items-center gap-2 text-[#00F5D4] font-mono text-[11px] sm:text-xs uppercase mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Internship Experience</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">
                MERN Stack Developer Intern
              </h3>
              <p className="text-xs sm:text-sm font-medium text-purple-400 mb-4">
                TechnoExponent / Euphoria GenX • May 2026 – Jun 2026
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#D7E2EA]/85 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4] shrink-0 mt-0.5" />
                  <span>Built and deployed full-stack Smart Appointment & Queue Booking System (Slotly) — MERN Stack, live at slotly.ksangam.dpdns.org, serving admin/staff/customer roles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4] shrink-0 mt-0.5" />
                  <span>Designed 15+ RESTful APIs for real-time scheduling and queue tracking, reducing manual booking effort by ~40%.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4] shrink-0 mt-0.5" />
                  <span>Implemented JWT authentication and role-based access control across 3 user roles; used Cloudinary, Recharts, and QR code generation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4] shrink-0 mt-0.5" />
                  <span>Integrated AI-driven scheduling logic to automate slot recommendations and reduce booking conflicts.</span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} y={20}>
            <div className="p-5 sm:p-8 rounded-2xl bg-[#0A0E17]/85 backdrop-blur-xl border border-white/15 shadow-2xl">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-[11px] sm:text-xs uppercase mb-2">
                <Award className="w-4 h-4" />
                <span>Government Certified Training</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">
                C Programming Trainee
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#00F5D4] mb-3">
                E & ICT Academy, IIT Kanpur (MeitY) • Jun 2022
              </p>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                Completed a government-certified 4-week training programme covering data types, control structures, functions, arrays, and pointers in C.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-6">
          <FadeIn delay={0.2} y={20}>
            <div className="p-5 sm:p-8 rounded-2xl bg-[#0A0E17]/85 backdrop-blur-xl border border-white/15 shadow-2xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-purple-400 font-mono text-[11px] sm:text-xs uppercase mb-3">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Qualifications</span>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <h4 className="text-white font-bold text-sm sm:text-base leading-snug">
                        B.Tech, Computer Science & Engineering
                      </h4>
                      <span className="text-xs font-mono text-[#00F5D4] shrink-0 whitespace-nowrap">
                        2025 – 2028
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/80 mt-1.5 leading-relaxed">
                      RVS College of Engineering & Technology, Jamshedpur — Jharkhand University of Technology
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#00F5D4]/10 text-[#00F5D4] text-[11px] sm:text-xs font-mono">
                      Currently in 2nd Year
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <h4 className="text-white font-bold text-sm sm:text-base leading-snug">
                        Diploma, Computer Science & Engineering
                      </h4>
                      <span className="text-xs font-mono text-purple-400 shrink-0 whitespace-nowrap">
                        2023 – 2025
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/80 mt-1.5 leading-relaxed">
                      Buddha Institute of Technology, Gaya (Bihar) — SBTE Board
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                      <h4 className="text-white font-bold text-sm sm:text-base leading-snug">
                        Class XII, PCM
                      </h4>
                      <span className="text-xs font-mono text-gray-400 shrink-0 whitespace-nowrap">
                        2019 – 2021
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/80 mt-1.5 leading-relaxed">
                      Shree Nehru Smarak +2 High School — BSEB Board
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#D7E2EA]/60">
                <span>Verified Education History</span>
                <span>India</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

// =========================================================================
// 13. CONTACT MODAL
// =========================================================================
const ContactModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCopy: (text: string, label: string) => void;
}> = ({ isOpen, onClose, onCopy }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="relative w-full max-w-xl bg-[#0D121D] border-2 border-[#00F5D4]/50 rounded-3xl p-5 sm:p-8 text-[#D7E2EA] shadow-[0_0_80px_rgba(0,245,212,0.3)] max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-[#00F5D4]/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-mono block mb-1">
              [ Direct Contact Line ]
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-1">
              Sangam Kumar
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/80 mb-5">
              Full Stack MERN Developer • Seeking Developer Roles
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151A27] border border-white/10 hover:border-[#00F5D4] transition-all group">
                <a href="mailto:ksangam990@gmail.com" className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[#00F5D4]/15 text-[#00F5D4]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase text-[#D7E2EA]/50 block">Email</span>
                    <span className="text-white text-xs sm:text-sm font-medium truncate block">ksangam990@gmail.com</span>
                  </div>
                </a>
                <button
                  onClick={() => onCopy("ksangam990@gmail.com", "Email address copied to clipboard")}
                  title="Copy Email"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#151A27] border border-white/10 hover:border-purple-400 transition-all group">
                <a href="tel:+919693041674" className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#D7E2EA]/50 block">Phone</span>
                    <span className="text-white text-xs sm:text-sm font-medium">+91 9693041674</span>
                  </div>
                </a>
                <button
                  onClick={() => onCopy("+919693041674", "Phone number copied to clipboard")}
                  title="Copy Phone"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href="https://linkedin.com/in/sangam-kumar07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#151A27] border border-white/10 hover:border-[#00F5D4] text-xs sm:text-sm transition-all group"
              >
                <div className="p-2 rounded-lg bg-[#00F5D4]/15 text-[#00F5D4] group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#D7E2EA]/50 block">LinkedIn</span>
                  <span className="text-white font-medium">sangam-kumar07</span>
                </div>
              </a>

              <a
                href="https://github.com/ksangam990-collab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#151A27] border border-white/10 hover:border-purple-400 text-xs sm:text-sm transition-all group"
              >
                <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#D7E2EA]/50 block">GitHub</span>
                  <span className="text-white font-medium">ksangam990-collab</span>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="/resume.pdf"
                download="Sangam_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#00F5D4] to-[#4361EE] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.25)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
              <span className="text-[11px] text-[#D7E2EA]/50 font-mono text-center sm:text-right">
                portfolio.ksangam.dpdns.org
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// =========================================================================
// 14. FOOTER
// =========================================================================
const Footer: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => (
  <footer className="border-t border-white/10 py-8 sm:py-10 px-4 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-5 text-[#D7E2EA]/70 text-xs sm:text-sm relative z-10 bg-transparent text-center md:text-left">
    <div>
      <p className="uppercase tracking-wider font-semibold text-white">
        Sangam Kumar — Full Stack MERN Developer
      </p>
      <p className="text-[11px] text-[#D7E2EA]/50 mt-1 font-mono">
        Engineered with React, TypeScript, Tailwind CSS & 3D Vector Math
      </p>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-mono text-xs uppercase">
      <a href="https://github.com/ksangam990-collab" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F5D4] transition-colors">GitHub</a>
      <a href="https://linkedin.com/in/sangam-kumar07" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F5D4] transition-colors">LinkedIn</a>
      <a href="https://slotly.ksangam.dpdns.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#00F5D4] transition-colors">Slotly Live</a>
      <button onClick={onContactClick} className="text-[#00F5D4] hover:underline cursor-pointer">Contact</button>
    </div>
  </footer>
);

// =========================================================================
// 15. MAIN APPLICATION ENTRY
// =========================================================================
export default function App() {
  use3DCanvasFavicon();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.title = "Sangam Kumar — Full Stack MERN Developer";

    const sectionIds = ["hero", "about", "services", "projects", "experience"];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 250;
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const top = rect.top + window.scrollY;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(label);
  };

  return (
    <div className="w-full bg-[#05070D] text-[#D7E2EA] selection:bg-[#00F5D4] selection:text-black font-sans relative">
      <CustomCyberCursor />
      <Interactive3DMatrixTerrain />
      <ScrollHUD activeSection={activeSection} />

      <div className="relative z-10 flex flex-col gap-6 w-full">
        <HeroSection onContactClick={() => setIsContactOpen(true)} />
        <AboutSection onContactClick={() => setIsContactOpen(true)} />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <Footer onContactClick={() => setIsContactOpen(true)} />
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onCopy={handleCopy}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}