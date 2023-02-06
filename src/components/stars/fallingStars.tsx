import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const FallingStars: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (!ctx) return;

        const stars: { x: number; y: number; size: number; speed: number; }[] = [];
        let maxStars = 80;

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < maxStars; i++) {
                let star = stars[i];
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.x = Math.random() * canvas.width;
                    star.y = 0;
                }
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
                ctx.fill();
            }
            requestAnimationFrame(update);
        };

        for (let i = 0; i < maxStars; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = Math.random() * 1.25;
            let speed = Math.random() * .2;
            stars.push({ x, y, size, speed });
        }
        requestAnimationFrame(update);
    }, []);

    return <Canvas ref={canvasRef}  />;
};

export default FallingStars;

const Canvas = styled.canvas`
position: fixed;
  top: 0;
  z-index: -1;
  left: 0;
    width: 100%;
  height: 100%;
  background-color: #0b0b1f;
`
