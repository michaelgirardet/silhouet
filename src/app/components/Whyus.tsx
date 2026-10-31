import {
  LightningIcon,
  ShieldSlashIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

function Whyus() {
  const { t } = useI18n();

  const whyUsContent = [
    {
      icon: <LightningIcon size={24} weight="light" />,
      title: t.whyus.fastTitle,
      text: t.whyus.fastText,
    },
    {
      icon: <StarIcon size={24} weight="light" />,
      title: t.whyus.preciseTitle,
      text: t.whyus.preciseText,
    },
    {
      icon: <ShieldSlashIcon size={24} weight="light" />,
      title: t.whyus.privacyTitle,
      text: t.whyus.privacyText,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-16 px-6 pb-32">
      <h2 className="text-ivory font-display text-subheading font-medium">
        {t.whyus.title}
      </h2>

      <div className="grid w-full max-w-page grid-cols-1 gap-4 md:grid-cols-3">
        {whyUsContent.map((item) => (
          <article
            key={item.title}
            className="bg-soot flex flex-col items-center gap-4 rounded-cards border border-white/6 p-8 text-center"
          >
            <div aria-hidden className="text-ivory">
              {item.icon}
            </div>
            <h3 className="text-ivory font-display text-caption font-medium">
              {item.title}
            </h3>
            <p className="text-body-sm text-stone">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
        <p className="text-micro tnum text-slate">{t.whyus.formats}</p>
        <p className="text-micro text-stone">{t.whyus.neverStored}</p>
      </div>
    </div>
  );
}

export default Whyus;
