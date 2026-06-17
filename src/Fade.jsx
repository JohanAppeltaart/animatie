import {useEffect, useMemo, useRef, useState} from 'react'
import './App.css'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Fade() {
    const containerRef = useRef(null);
    const glowRef = useRef(null);

    useGSAP(() => {
        const handleMouseMove = (e) => {
            // Get positions relative to the container boundaries
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX/window.innerWidth-.5; // Offset half-width (300/2)
            const y = e.clientY/window.innerHeight-.5;   // Offset half-height (150/2)

            gsap.to(glowRef.current, {
                x: x*300,
                y: y*300,
                duration: 1.5, // Quick response, but with a slight, elegant drag
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef });

    useGSAP(() => {
        gsap.to(glowRef.current, {
            height: 400,
            width: 1200,
            duration: 1,
            delay: .5,
            ease: "power3.out"
        })

    }, {scope: glowRef});

    return (
        <div ref={containerRef} className="
        flex items-center justify-center h-screen bg-black">

            <div
                ref={glowRef}
                className="h-0 w-0
                absolute
                bg-[radial-gradient(ellipse_100%_100%_at_center_8%,_#0f0f0f_0,_#14204f_50%)]
                rounded-full
                blur-[125px]

                flex flex-col items-center justify-center
                "
            >
                {/*<h1 className="bg-white blur-none">*/}
                {/*    lol*/}
                {/*</h1>*/}
            </div>
        </div>
    );
}

export default Fade
