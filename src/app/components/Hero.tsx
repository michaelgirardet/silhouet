import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="flex flex-col items-center gap-16 px-6 pt-16 pb-24 text-center md:pt-24">
      <div className="flex max-w-3xl flex-col items-center gap-8">
        <h1 className="text-ivory font-display text-[40px] leading-[1.05] font-medium tracking-[-0.02em] sm:text-[56px] sm:tracking-[-0.03em] lg:text-display lg:tracking-display">
          Détourage précis et instantané.
        </h1>
        <p className="text-body text-stone max-w-xl">
          Sans compte. Sans limite. Sans stockage. Supprimez l&apos;arrière-plan
          de vos images en quelques secondes — PNG et WebP transparents prêts à
          l&apos;usage.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/remove-bg"
            className="bg-chalk text-canvas hover:bg-ivory rounded-[48px] px-8 py-4 text-body-sm transition-colors duration-150"
          >
            Détourer une image
          </Link>
          <Link
            href="/convert"
            className="border-haze text-slate hover:border-stone hover:text-ivory rounded-full border px-8 py-4 text-body-sm transition-colors duration-150"
          >
            Optimiser une image
          </Link>
        </div>
      </div>

      {/* Silhouette signature — halo ambre discret */}
      <div className="checker rounded-images relative w-full max-w-2xl overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,163,61,0.18), transparent 70%)",
          }}
        />
        <Image
          src="/images/rosa_img_nobg.png"
          alt="silhouette détourée — femme avec un chat"
          width={640}
          height={560}
          className="relative mx-auto h-auto w-full max-w-lg"
          priority
        />
      </div>
      <p className="text-micro leading-[1.3] text-stone">
        Tout se passe dans votre navigateur — aucune image envoyée sur un
        serveur
      </p>
    </section>
  );
}

export default Hero;
