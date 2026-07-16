type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10">

      <h2 className="font-heading text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}