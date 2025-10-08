"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export default function BeforeAfter({
	before,
	after,
}: {
	before: string;
	after: string;
}) {
	const [v, setV] = useState(50);
	const wrapRef = useRef<HTMLDivElement>(null);

	const clamp = (n: number) => Math.min(100, Math.max(0, n));

	const setFromEvent = useCallback((clientX: number) => {
		const el = wrapRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const next = ((clientX - rect.left) / rect.width) * 100;
		setV(clamp(next));
	}, []);

	return (
		<div
			ref={wrapRef}
			className="border-border shadow-soft relative overflow-hidden rounded-xl border"
		>
			<Image
				src={before}
				alt="avant"
				className="block h-auto w-full select-none"
				width={1600}
				height={1200}
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
				priority={false}
			/>

			<div
				className="border-border absolute inset-0 overflow-hidden border-r transition-[width] duration-150"
				style={{ width: `${v}%` }}
				aria-hidden="true"
			>
				<Image
					src={after}
					alt="après"
					className="block h-auto w-full select-none"
					width={1600}
					height={1200}
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
					priority={false}
				/>
			</div>

			<div
				className="pointer-events-none absolute inset-y-0"
				style={{ left: `calc(${v}% - 1px)` }}
				aria-hidden="true"
			>
				<div className="bg-border mx-auto h-full w-[2px]" />
			</div>

			{/* Zone interactive (drag + clavier) */}
			<div
				className="absolute inset-0"
				role="slider"
				aria-label="Comparateur avant/après"
				aria-orientation="horizontal"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(v)}
				tabIndex={0}
				onMouseDown={(e) => {
					e.preventDefault();
					setFromEvent(e.clientX);
					const onMove = (ev: MouseEvent) => setFromEvent(ev.clientX);
					const onUp = () => {
						window.removeEventListener("mousemove", onMove);
						window.removeEventListener("mouseup", onUp);
					};
					window.addEventListener("mousemove", onMove);
					window.addEventListener("mouseup", onUp);
				}}
				onTouchStart={(e) => {
					const t = e.touches[0];
					if (t) setFromEvent(t.clientX);
				}}
				onTouchMove={(e) => {
					const t = e.touches[0];
					if (t) setFromEvent(t.clientX);
				}}
				onKeyDown={(e) => {
					// Pas d'autorepeat violent : petit step de 1, gros step de 10 avec Shift
					const step = e.shiftKey ? 10 : 1;
					if (e.key === "ArrowLeft") {
						e.preventDefault();
						setV((old) => clamp(old - step));
					} else if (e.key === "ArrowRight") {
						e.preventDefault();
						setV((old) => clamp(old + step));
					} else if (e.key === "Home") {
						e.preventDefault();
						setV(0);
					} else if (e.key === "End") {
						e.preventDefault();
						setV(100);
					}
				}}
			/>

			<input
				type="range"
				min={0}
				max={100}
				value={v}
				onChange={(e) => setV(Number(e.target.value))}
				aria-label="Comparer avant/après"
				className="bg-border accent-indigo [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:shadow-soft [&::-moz-range-thumb]:border-border [&::-moz-range-thumb]:shadow-soft absolute bottom-3 left-1/2 h-1 w-[70%] -translate-x-1/2 [appearance:none] rounded-full sm:w-3/5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:[appearance:none] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:bg-white"
			/>
		</div>
	);
}
