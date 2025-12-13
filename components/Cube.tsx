import React, { useEffect, useRef } from 'react';

const Cube: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rotation = useRef({ x: -20, y: 20 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const autoRotateEnabled = useRef(true);
  const autoRotateVelocity = useRef({ vx: 0.02, vy: 0.02 });
  // multiplier to increase/decrease auto-rotation speed (1.5 = 50% faster)
  const SPEED_MULTIPLIER = 1.5;
  const resumeTimeout = useRef<number | null>(null);
  const velocityChangeTimer = useRef<number | null>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setTransform = () => {
    if (!containerRef.current) return;
    const { x, y } = rotation.current;
    containerRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  };

  useEffect(() => {
    // Initialize transform
    setTransform();

    const tick = (time: number) => {
      if (lastTime.current == null) lastTime.current = time;
      const delta = time - lastTime.current;
      lastTime.current = time;

      if (autoRotateEnabled.current && !prefersReducedMotion && !isDragging.current) {
        // apply velocity (degrees per millisecond)
        rotation.current.x = Math.max(-90, Math.min(90, rotation.current.x + autoRotateVelocity.current.vx * delta));
        rotation.current.y = (rotation.current.y + autoRotateVelocity.current.vy * delta) % 360;
        setTransform();
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current);
      if (velocityChangeTimer.current) window.clearTimeout(velocityChangeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // randomize velocity periodically
  useEffect(() => {
    if (prefersReducedMotion) return;

    const randomVel = () => {
      // range before multiplier: -0.03 .. 0.03 deg/ms
      // apply SPEED_MULTIPLIER to make rotation faster/slower
      return (Math.random() * 0.06 - 0.03) * SPEED_MULTIPLIER;
    };

    const scheduleNext = () => {
      const timeout = 2000 + Math.random() * 4000; // 2s - 6s
      velocityChangeTimer.current = window.setTimeout(() => {
        autoRotateVelocity.current.vx = randomVel();
        autoRotateVelocity.current.vy = randomVel();
        scheduleNext();
      }, timeout);
    };

    // set initial random velocities (scaled by multiplier)
    autoRotateVelocity.current.vx = randomVel();
    autoRotateVelocity.current.vy = randomVel();
    scheduleNext();

    return () => {
      if (velocityChangeTimer.current) window.clearTimeout(velocityChangeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      (e.target as Element).setPointerCapture?.(e.pointerId);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        rotX: rotation.current.x,
        rotY: rotation.current.y,
      };
      // while dragging, disable auto-rotation
      autoRotateEnabled.current = false;
      if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current);
      el.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const sensitivity = 0.3; // degrees per pixel
      rotation.current.y = dragStart.current.rotY + dx * sensitivity;
      rotation.current.x = Math.max(-90, Math.min(90, dragStart.current.rotX - dy * sensitivity));
      setTransform();
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch {}
      el.style.cursor = 'grab';
      // resume auto-rotation after 3s
      resumeTimeout.current = window.setTimeout(() => {
        autoRotateEnabled.current = true;
      }, 3000);
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // set initial cursor
    el.style.cursor = 'grab';

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div className="relative w-64 h-64 perspective-1000 mx-auto mt-10 md:mt-0" aria-hidden={false} role="img" aria-label="Skills cube">
      <style>{`
        .cube-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        
        .face {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid #3b82f6;
          background: rgba(15, 23, 42, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: white;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          backface-visibility: visible;
          user-select: none;
          touch-action: none;
        }

        .front  { transform: rotateY(0deg) translateZ(100px); }
        .back   { transform: rotateY(180deg) translateZ(100px); }
        .right  { transform: rotateY(90deg) translateZ(100px); }
        .left   { transform: rotateY(-90deg) translateZ(100px); }
        .top    { transform: rotateX(90deg) translateZ(100px); }
        .bottom { transform: rotateX(-90deg) translateZ(100px); }
      `}</style>
      
      <div ref={containerRef} className="cube-container">
        <div className="face front text-blue-400">SAP ABAP</div>
        <div className="face back text-green-400">Python</div>
        <div className="face right text-purple-400">AI</div>
        <div className="face left text-yellow-400">Web Developer</div>
        <div className="face top text-red-400">Database</div>
        <div className="face bottom text-cyan-400">SAP BTP</div>
      </div>
    </div>
  );
};

export default Cube;