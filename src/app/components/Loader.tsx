type Props = {
  /** Libellé micro à côté de la pilule (ex. « Modèle local · 4 Mo ») */
  label?: string;
};

export default function Loader({ label }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex w-full max-w-xs flex-col items-center gap-3"
    >
      <div className="progress-track">
        <div className="progress-fill" />
      </div>
      {label && <p className="text-micro tnum text-stone">{label}</p>}
    </div>
  );
}
