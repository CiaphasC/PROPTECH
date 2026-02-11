import { ArrowRight, Building } from "lucide-react";
import { useState } from "react";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";

export default function AppFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-white">
              <Building size={16} />
            </div>
            <span className="font-display text-xl font-bold tracking-wide">
              PROP<span className="font-light italic text-emerald-500">TECH</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">
            La plataforma inmobiliaria mas avanzada del Peru. Tecnologia y confianza en cada
            transaccion.
          </p>
        </div>

        <div>
          <h4 className="font-display mb-6 font-bold tracking-wide text-white">Propiedades</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            {[
              "Venta de Casas",
              "Departamentos de Lujo",
              "Oficinas Prime",
              "Proyectos en Plano",
            ].map((item) => (
              <li key={item} className="cursor-pointer transition-colors hover:text-emerald-500">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display mb-6 font-bold tracking-wide text-white">Compania</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            {["Sobre Nosotros", "Agentes Afiliados", "Carreras", "Prensa"].map((item) => (
              <li key={item} className="cursor-pointer transition-colors hover:text-emerald-500">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display mb-6 font-bold tracking-wide text-white">Newsletter</h4>
          <p className="mb-4 text-sm text-zinc-400">Recibe las ultimas oportunidades exclusivas.</p>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.trim()) {
                return;
              }
              setSubscribed(true);
              setEmail("");
            }}
          >
            <Input
              type="email"
              required
              placeholder="Tu email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-white/10 bg-white/5 text-white placeholder:text-zinc-600"
            />
            <Button variant="emerald" className="px-3" type="submit">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          {subscribed ? (
            <p className="mt-3 text-xs text-emerald-400">Suscripcion registrada correctamente.</p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between border-t border-white/5 px-6 pt-12 text-xs text-zinc-500 md:flex-row">
        <p>© 2026 PropTech Peru. Todos los derechos reservados.</p>
        <div className="mt-4 flex gap-6 md:mt-0">
          <span>Privacidad</span>
          <span>Terminos</span>
          <span>Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
