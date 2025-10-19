import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Quiénes Somos | VoxMontejano",
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
    title: "Quiénes Somos | VoxMontejano",
    description:
      "Aula de periodismo concentra las prácticas de los estudiantes de la licenciatura en Ciencias de la Comunicación.",
    type: "website",
  },
};

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-6">
                Quiénes Somos
              </h1>
              <p className="text-xl text-center text-muted-foreground font-serif">
                Proyecto académico de periodismo
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <div className="bg-muted/50 p-8 rounded-lg">
                  <p className="text-lg leading-relaxed">
                    Aula de periodismo concentra las prácticas de los
                    estudiantes de la licenciatura en Ciencias de la
                    Comunicación que cursan la materia de Periodismo bajo la
                    asesoría de la docente, Gabriela Montejano, comunicóloga y
                    periodista en el estado de Guanajuato.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    Es un proyecto académico, cuyo único objetivo es reforzar
                    las actividades de la materia.
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
