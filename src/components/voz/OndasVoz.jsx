import React, { useEffect, useRef } from 'react';

// Cuatro ondas superpuestas, de la roja de marca a un blanco tenue.
// `freq` es cuántos ciclos caben en el ancho y `vel` hacia dónde y qué tan rápido viajan.
const CAPAS = [
  { color: '227, 6, 19', fase: 0, freq: 1.6, vel: 1.1, amp: 1, grosor: 2.4 },
  { color: '255, 72, 84', fase: 1.3, freq: 2.2, vel: -0.8, amp: 0.74, grosor: 2 },
  { color: '255, 145, 155', fase: 2.4, freq: 3.1, vel: 1.5, amp: 0.5, grosor: 1.6 },
  { color: '255, 255, 255', fase: 3.6, freq: 4.2, vel: -1.9, amp: 0.28, grosor: 1.2 },
];

const SUAVIZADO_SUBIDA = 0.3;
const SUAVIZADO_BAJADA = 0.1;
const DURACION_GOLPE_MS = 140;

/**
 * Ondas de sonido que se mueven mientras habla la IA.
 *
 * El navegador no entrega el audio de la síntesis de voz, así que la
 * amplitud se simula: un ritmo de sílabas sobre un ritmo de frase, con un
 * golpe extra cada vez que el navegador avisa que se pronunció una palabra.
 * En reposo las ondas casi se aplanan y respiran.
 *
 * Se dibuja dentro de su contenedor, que debe tener alto definido y ser `relative`.
 */
const OndasVoz = ({ activo, pulsoRef, reposo = 0.06 }) => {
  const canvasRef = useRef(null);
  const activoRef = useRef(activo);
  activoRef.current = activo;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const inicio = performance.now();

    let ancho = 0;
    let alto = 0;
    let dpr = 1;
    let envolvente = 0;
    let golpe = 0;
    let cuadro = 0;

    const ajustar = () => {
      dpr = window.devicePixelRatio || 1;
      ancho = canvas.clientWidth;
      alto = canvas.clientHeight;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
    };

    const dibujar = (ahora) => {
      const t = (ahora - inicio) / 1000;
      const hablando = activoRef.current;

      // Ritmo del habla: sílabas (~4 Hz) moduladas por el ritmo de la frase.
      const silaba = 0.5 + 0.5 * Math.sin(t * 27) * Math.sin(t * 11.3 + 1.7);
      const frase = 0.65 + 0.35 * Math.sin(t * 1.9);
      golpe =
        ahora - (pulsoRef?.current || 0) < DURACION_GOLPE_MS ? 1 : golpe * 0.88;

      let objetivo;
      if (hablando) objetivo = reducido ? 0.45 : 0.28 + 0.5 * silaba * frase + 0.3 * golpe;
      else objetivo = reposo * (0.7 + 0.3 * Math.sin(t * 1.2));

      envolvente +=
        (objetivo - envolvente) *
        (objetivo > envolvente ? SUAVIZADO_SUBIDA : SUAVIZADO_BAJADA);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, ancho, alto);

      // Resplandor central que respira con la voz.
      const resplandor = ctx.createRadialGradient(
        ancho / 2, alto / 2, 0, ancho / 2, alto / 2, Math.max(ancho * 0.36, 1),
      );
      resplandor.addColorStop(0, `rgba(227, 6, 19, ${0.08 + envolvente * 0.32})`);
      resplandor.addColorStop(1, 'rgba(227, 6, 19, 0)');
      ctx.fillStyle = resplandor;
      ctx.fillRect(0, 0, ancho, alto);

      ctx.globalCompositeOperation = 'lighter';
      const velocidad = reducido ? 0.15 : 1;
      const escalaGrosor = Math.min(Math.max(alto / 110, 1), 2.2);

      CAPAS.forEach((capa) => {
        ctx.beginPath();
        for (let x = 0; x <= ancho; x += 3) {
          const xn = x / ancho;
          // La ventana apaga los extremos para que las ondas nazcan y mueran en el centro.
          const ventana = Math.sin(Math.PI * xn) ** 2;
          const onda = Math.sin(
            xn * capa.freq * Math.PI * 2 + capa.fase + t * capa.vel * 2 * velocidad,
          );
          const y = alto / 2 + onda * capa.amp * envolvente * alto * 0.42 * ventana;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${capa.color}, ${0.35 + envolvente * 0.55})`;
        ctx.lineWidth = capa.grosor * escalaGrosor;
        ctx.shadowColor = `rgba(${capa.color}, 0.8)`;
        ctx.shadowBlur = 8 + envolvente * 16;
        ctx.stroke();
      });

      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      cuadro = requestAnimationFrame(dibujar);
    };

    ajustar();
    const observador = new ResizeObserver(ajustar);
    observador.observe(canvas);
    cuadro = requestAnimationFrame(dibujar);

    return () => {
      cancelAnimationFrame(cuadro);
      observador.disconnect();
    };
  }, [pulsoRef, reposo]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export default OndasVoz;
