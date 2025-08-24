"use client";
import Image from "next/image";
import { useState } from "react";

export default function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [v, setV] = useState(50);
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image src={before} alt="avant" className="block w-full h-auto" width={500} height={500} />
      <div className="absolute inset-0 overflow-hidden border-r border-border" style={{ width: `${v}%` }}>
        <Image src={after} alt="après" className="block w-full h-auto" width={500} height={500} />
      </div>
      <input
        type="range" min={0} max={100} value={v}
        onChange={(e) => setV(Number(e.target.value))}
        aria-label="Comparer avant/après"
        className="absolute left-0 right-0 bottom-3 w-3/5 mx-auto h-1 rounded-full bg-border"
      />
    </div>
  );
}
