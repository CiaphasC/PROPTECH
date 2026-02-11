import { Phone } from "lucide-react";
import { useState } from "react";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";

interface ContactAgentFormProps {
  propertyTitle: string;
}

interface ContactFormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormState: ContactFormState = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactAgentForm({ propertyTitle }: ContactAgentFormProps) {
  const [formState, setFormState] = useState<ContactFormState>({
    ...initialFormState,
    message: `Hola, estoy interesado en ${propertyTitle}.`,
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = <TField extends keyof ContactFormState>(
    field: TField,
    value: ContactFormState[TField],
  ) => {
    setSubmitted(false);
    setFormState((previousState) => ({
      ...previousState,
      [field]: value,
    }));
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <Input
        required
        placeholder="Nombre Completo"
        value={formState.fullName}
        onChange={(event) => updateField("fullName", event.target.value)}
      />
      <Input
        required
        type="email"
        placeholder="Correo Electronico"
        value={formState.email}
        onChange={(event) => updateField("email", event.target.value)}
      />
      <Input
        required
        placeholder="Telefono / WhatsApp"
        value={formState.phone}
        onChange={(event) => updateField("phone", event.target.value)}
      />
      <textarea
        className="flex min-h-[120px] w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        value={formState.message}
        onChange={(event) => updateField("message", event.target.value)}
      />

      <Button type="submit" variant="emerald" className="h-12 w-full text-lg">
        Contactar Agente
      </Button>
      <Button type="button" variant="outline" className="w-full" icon={Phone}>
        Llamar Ahora
      </Button>

      {submitted ? (
        <p className="text-sm text-emerald-600">
          Tu consulta fue registrada. El agente se pondra en contacto pronto.
        </p>
      ) : null}
    </form>
  );
}
