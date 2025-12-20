"use client";

import Hero from "./components/Hero";
import Whyus from "./components/Whyus";

export default function Home() {
  return (
    <section className="flex flex-col gap-48 py-14">
      <Hero />
      <Whyus />
    </section>
  );
}
