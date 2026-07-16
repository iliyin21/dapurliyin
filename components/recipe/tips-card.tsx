import { Lightbulb } from "lucide-react";

interface TipsCardProps {
  tips?: string[];
}

export default function TipsCard({ tips }: TipsCardProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-white">
          <Lightbulb size={20} />
        </div>
        <h2 className="text-2xl font-bold text-amber-900">Tips Memasak</h2>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-3 text-amber-900">
            <span className="font-bold">•</span>
            <p className="leading-relaxed">{tip}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
