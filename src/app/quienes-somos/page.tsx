import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";

export const metadata: Metadata = {
  title: "¿Quiénes Somos? | VoxMontejano",
  description:
    "Aula de periodismo concentra las prácticas de los estudiantes de la licenciatura en Ciencias de la Comunicación.",
  keywords: [
    "VoxMontejano",
    "periodismo",
    "estudiantes",
    "Ciencias de la Comunicación",
    "proyecto académico",
  ],
  openGraph: {
    title: "¿Quiénes Somos? | VoxMontejano",
    description:
      "Aula de periodismo concentra las prácticas de los estudiantes de la licenciatura en Ciencias de la Comunicación.",
    type: "website",
  },
};

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <article className="max-w-6xl mx-auto">
            <header className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                ¿Quiénes Somos?
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif">
                Proyecto académico de periodismo
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Aula de periodismo concentra las prácticas de los
                    estudiantes de la licenciatura en Ciencias de la
                    Comunicación que cursan la materia de Periodismo bajo la
                    asesoría de la docente, Gabriela Montejano, comunicóloga y
                    periodista en el estado de Guanajuato.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Es un proyecto académico, cuyo único objetivo es reforzar
                    las actividades de la materia.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <img
                  src="https://ik.imagekit.io/gns9zkk92/WhatsApp%20Image%202025-10-19%20at%2012.43.17%20PM.jpeg?updatedAt=1760899850740"
                  alt="VoxMontejano - Proyecto académico de periodismo"
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
