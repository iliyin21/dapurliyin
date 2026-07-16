interface StepsCardProps {
  steps: string[];
}

export default function StepsCard({
  steps,
}: StepsCardProps) {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Cara Memasak
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Ikuti langkah berikut untuk mendapatkan hasil terbaik.
        </p>
      </div>


      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            {/* Number */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              {index + 1}
            </div>


            {/* Content */}
            <div className="flex-1 rounded-2xl bg-gray-50 p-4">
              <p className="leading-relaxed text-gray-700">
                {step}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}