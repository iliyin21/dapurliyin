"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/recipes";
import type { DbRecipe } from "@/lib/supabase/recipe-mapper";

export interface RecipeFormValues {
  title: string;
  category: string;
  author: string;
  description: string;
  image: string;
  cookingTime: string;
  servings: string;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  ingredients: string[];
  steps: string[];
  youtube: string;
  instagram: string;
  tiktok: string;
  published: boolean;
}

interface RecipeFormProps {
  initial?: DbRecipe;
  onSubmit: (values: RecipeFormValues) => void | Promise<void>;
  submitLabel: string;
}

function toFormValues(recipe?: DbRecipe): RecipeFormValues {
  return {
    title: recipe?.title ?? "",
    category: recipe?.category ?? categories[0].name,
    author: recipe?.author ?? "",
    description: recipe?.description ?? "",
    image: recipe?.image ?? "",
    cookingTime: recipe?.cookingTime ?? "",
    servings: recipe?.servings ?? "",
    difficulty: recipe?.difficulty ?? "Mudah",
    ingredients: recipe?.ingredients?.length ? recipe.ingredients : [""],
    steps: recipe?.steps?.length ? recipe.steps : [""],
    youtube: recipe?.video?.youtube ?? "",
    instagram: recipe?.video?.instagram ?? "",
    tiktok: recipe?.video?.tiktok ?? "",
    published: recipe?.published ?? true,
  };
}

export default function RecipeForm({
  initial,
  onSubmit,
  submitLabel,
}: RecipeFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<RecipeFormValues>(
    toFormValues(initial)
  );
  const [imagePreview, setImagePreview] = useState(initial?.image ?? "");
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof RecipeFormValues>(
    key: K,
    value: RecipeFormValues[K]
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const updateListItem = (
    key: "ingredients" | "steps",
    index: number,
    value: string
  ) => {
    const next = [...values[key]];
    next[index] = value;
    update(key, next);
  };

  const addListItem = (key: "ingredients" | "steps") =>
    update(key, [...values[key], ""]);

  const removeListItem = (key: "ingredients" | "steps", index: number) =>
    update(
      key,
      values[key].filter((_, i) => i !== index)
    );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview only. Real uploads need object storage (e.g. Supabase
    // Storage) — for now we just preview the file and store its object URL.
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    update("image", url);
    toast.info(
      "Preview foto ditampilkan secara lokal. Hubungkan Supabase Storage agar foto tersimpan permanen."
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.title.trim()) {
      toast.error("Judul resep wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...values,
        ingredients: values.ingredients.filter((i) => i.trim()),
        steps: values.steps.filter((s) => s.trim()),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic info */}
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 font-semibold">Informasi Dasar</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Judul Resep
            </label>
            <Input
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Contoh: Ayam Geprek Crispy"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Kategori
            </label>
            <select
              value={values.category}
              onChange={(e) => update("category", e.target.value)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Author
            </label>
            <Input
              value={values.author}
              onChange={(e) => update("author", e.target.value)}
              placeholder="Nama kamu"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Waktu Memasak
            </label>
            <Input
              value={values.cookingTime}
              onChange={(e) => update("cookingTime", e.target.value)}
              placeholder="30 Menit"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Porsi
            </label>
            <Input
              value={values.servings}
              onChange={(e) => update("servings", e.target.value)}
              placeholder="2 Porsi"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Tingkat Kesulitan
            </label>
            <div className="flex gap-2">
              {(["Mudah", "Sedang", "Sulit"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => update("difficulty", d)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    values.difficulty === d
                      ? "border-blue-900 bg-blue-900 text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Status
            </label>
            <div className="flex gap-2">
              {[
                { value: true, label: "Publish" },
                { value: false, label: "Draft" },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => update("published", s.value)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    values.published === s.value
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Deskripsi
            </label>
            <textarea
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              placeholder="Ceritakan tentang resep ini..."
              className="w-full rounded-xl border p-3 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </section>

      {/* Photo upload */}
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 font-semibold">Foto Resep</h2>

        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center hover:bg-slate-50">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt="Preview"
              className="mb-2 h-40 w-full rounded-xl object-cover"
            />
          ) : (
            <UploadCloud className="text-slate-400" size={28} />
          )}
          <span className="text-sm text-slate-500">
            Klik untuk mengunggah foto resep
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </section>

      {/* Ingredients */}
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 font-semibold">Bahan-Bahan</h2>

        <div className="space-y-3">
          {values.ingredients.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) =>
                  updateListItem("ingredients", index, e.target.value)
                }
                placeholder={`Bahan ${index + 1}`}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeListItem("ingredients", index)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-3"
          onClick={() => addListItem("ingredients")}
        >
          <Plus size={16} />
          Tambah Bahan
        </Button>
      </section>

      {/* Steps */}
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 font-semibold">Langkah Memasak</h2>

        <div className="space-y-3">
          {values.steps.map((item, index) => (
            <div key={index} className="flex gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold">
                {index + 1}
              </span>
              <textarea
                value={item}
                onChange={(e) =>
                  updateListItem("steps", index, e.target.value)
                }
                placeholder={`Langkah ${index + 1}`}
                rows={2}
                className="w-full rounded-xl border p-3 text-sm outline-none focus:border-blue-400"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeListItem("steps", index)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-3"
          onClick={() => addListItem("steps")}
        >
          <Plus size={16} />
          Tambah Langkah
        </Button>
      </section>

      {/* Video links */}
      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 font-semibold">Video Tutorial (opsional)</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Link YouTube
            </label>
            <Input
              value={values.youtube}
              onChange={(e) => update("youtube", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Link Instagram
            </label>
            <Input
              value={values.instagram}
              onChange={(e) => update("instagram", e.target.value)}
              placeholder="https://www.instagram.com/reel/..."
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Link TikTok
            </label>
            <Input
              value={values.tiktok}
              onChange={(e) => update("tiktok", e.target.value)}
              placeholder="https://www.tiktok.com/@.../video/..."
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
          disabled={submitting}
        >
          Batal
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Menyimpan..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
