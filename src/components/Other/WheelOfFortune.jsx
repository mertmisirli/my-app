import React, { useRef, useState, useEffect } from "react";
import '../../styles/Other/Wheel.css'

const options = ["Elma","","Armut","", "Muz","", "Karpuz","", "Kiraz","", "Portakal",""];

function WheelOfFortune() {
  const [angle, setAngle] = useState(0);
  const [selected, setSelected] = useState(null);

  const isDragging = useRef(false);
  const lastAngle = useRef(0);
  const velocity = useRef(0);
  const wheelRef = useRef(null);
  const lastTime = useRef(0);

  const friction = 0.98; // Yavaşlama oranı

  const getAngleFromEvent = (e) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX || e.touches?.[0].clientX;
    const y = e.clientY || e.touches?.[0].clientY;
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handleStart = (e) => {
    e.preventDefault();
    isDragging.current = true;
    lastAngle.current = getAngleFromEvent(e) - angle;
    cancelAnimationFrame(spinAnimation.current);
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const current = getAngleFromEvent(e);
    const newAngle = current - lastAngle.current;
    const delta = newAngle - angle;
    velocity.current = delta;
    setAngle(newAngle);
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Minimum dönme hızı kontrolü
    const minVelocity = 20; // derece/saniye
    if (Math.abs(velocity.current) < minVelocity) {
      velocity.current = velocity.current < 0 ? -minVelocity : minVelocity;
    }

    spin();
  };

  const spinAnimation = useRef();

  const spin = () => {
    velocity.current *= friction;
    if (Math.abs(velocity.current) < 0.01) {
      calculateWinner();
      return;
    }

    setAngle((prev) => prev + velocity.current);
    spinAnimation.current = requestAnimationFrame(spin);
  };

  const calculateWinner = () => {
    // Normalize edilen açı (0 ile 360 arasında)
    const normalized = (angle % 360 + 360) % 360;
    const segmentAngle = 360 / options.length;

    // İğneyle hizalanan segmenti bulalım:
    const index = Math.floor((normalized + segmentAngle / 2) / segmentAngle);

    setSelected(options[index]);
  };

  return (
    <div className="wheel-container">
      <div className="pointer"></div> {/* Sabit iğne */}
      <div
        className="wheel"
        ref={wheelRef}
        style={{ transform: `rotate(${angle}deg)` }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {options.map((item, i) => (
          <div
            key={i}
            className="segment"
            style={{
              transform: `rotate(${(360 / options.length) * i}deg)`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      {selected && <p>Kazanan: {selected}</p>}
    </div>
  );
}

export default WheelOfFortune;
