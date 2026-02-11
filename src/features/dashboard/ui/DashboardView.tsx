import { Plus } from "lucide-react";
import { useState } from "react";
import type { CreatePropertyInput } from "@/entities/property/model/types";
import {
  DASHBOARD_STATUS_OPTIONS,
  DASHBOARD_TYPE_OPTIONS,
  DEFAULT_PROPERTY_IMAGE,
} from "@/entities/property/model/constants";
import Button from "@/shared/components/ui/Button";
import CustomSelect from "@/shared/components/ui/CustomSelect";
import Input from "@/shared/components/ui/Input";

interface DashboardViewProps {
  onCreateProperty: (payload: CreatePropertyInput) => void;
}

interface DashboardFormState {
  title: string;
  location: string;
  price: string;
  type: CreatePropertyInput["type"];
  status: CreatePropertyInput["status"];
  beds: string;
  baths: string;
  area: string;
  image: string;
  tag: string;
  description: string;
  features: string;
}

const initialFormState: DashboardFormState = {
  title: "",
  location: "",
  price: "0",
  type: "Casa",
  status: "Venta",
  beds: "1",
  baths: "1",
  area: "80",
  image: DEFAULT_PROPERTY_IMAGE,
  tag: "Nuevo",
  description: "",
  features: "Seguridad 24/7, Zona Social, Pet Friendly",
};

export default function DashboardView({ onCreateProperty }: DashboardViewProps) {
  const [formState, setFormState] = useState<DashboardFormState>(initialFormState);
  const [feedback, setFeedback] = useState<string>("");

  const setField = <TField extends keyof DashboardFormState>(
    field: TField,
    value: DashboardFormState[TField],
  ) => {
    setFeedback("");
    setFormState((previousState) => ({
      ...previousState,
      [field]: value,
    }));
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-32">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
        <div className="flex items-center justify-between bg-zinc-950 p-8 text-white">
          <div>
            <h2 className="font-display text-3xl font-medium">Panel de Propietario</h2>
            <p className="mt-1 text-zinc-400">Gestiona tus publicaciones de forma centralizada</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold">
            U
          </div>
        </div>

        <form
          className="space-y-8 p-8"
          onSubmit={(event) => {
            event.preventDefault();

            if (!formState.title.trim() || !formState.location.trim() || !formState.description.trim()) {
              setFeedback("Completa titulo, ubicacion y descripcion para publicar.");
              return;
            }

            const payload: CreatePropertyInput = {
              title: formState.title,
              location: formState.location,
              price: Number(formState.price),
              type: formState.type,
              status: formState.status,
              beds: Number(formState.beds),
              baths: Number(formState.baths),
              area: Number(formState.area),
              image: formState.image,
              tag: formState.tag,
              description: formState.description,
              features: formState.features
                .split(",")
                .map((feature) => feature.trim())
                .filter(Boolean),
            };

            onCreateProperty(payload);
            setFeedback("Propiedad creada. Se agrego al inventario.");
            setFormState(initialFormState);
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              required
              placeholder="Titulo de la propiedad"
              value={formState.title}
              onChange={(event) => setField("title", event.target.value)}
            />
            <Input
              required
              placeholder="Ubicacion"
              value={formState.location}
              onChange={(event) => setField("location", event.target.value)}
            />
            <Input
              required
              type="number"
              min={1}
              placeholder="Precio (PEN)"
              value={formState.price}
              onChange={(event) => setField("price", event.target.value)}
            />
            <Input
              required
              type="number"
              min={1}
              placeholder="Area (m2)"
              value={formState.area}
              onChange={(event) => setField("area", event.target.value)}
            />

            <Input
              required
              type="number"
              min={0}
              placeholder="Dormitorios"
              value={formState.beds}
              onChange={(event) => setField("beds", event.target.value)}
            />
            <Input
              required
              type="number"
              min={0}
              placeholder="Banos"
              value={formState.baths}
              onChange={(event) => setField("baths", event.target.value)}
            />

            <CustomSelect
              value={formState.type}
              onChange={(value) => setField("type", value)}
              options={DASHBOARD_TYPE_OPTIONS}
              variant="light"
              className="w-full"
            />
            <CustomSelect
              value={formState.status}
              onChange={(value) => setField("status", value)}
              options={DASHBOARD_STATUS_OPTIONS}
              variant="light"
              className="w-full"
            />
          </div>

          <Input
            type="url"
            placeholder="URL de imagen principal"
            value={formState.image}
            onChange={(event) => setField("image", event.target.value)}
          />
          <Input
            placeholder="Tag visual (Ej: Nuevo, Exclusivo)"
            value={formState.tag}
            onChange={(event) => setField("tag", event.target.value)}
          />
          <Input
            placeholder="Comodidades separadas por coma"
            value={formState.features}
            onChange={(event) => setField("features", event.target.value)}
          />
          <textarea
            required
            className="flex min-h-[140px] w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Descripcion comercial"
            value={formState.description}
            onChange={(event) => setField("description", event.target.value)}
          />

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Button type="submit" variant="emerald" icon={Plus}>
              Publicar en Inventario
            </Button>
            {feedback ? <p className="text-sm text-emerald-600">{feedback}</p> : null}
          </div>
        </form>
      </div>
    </div>
  );
}
