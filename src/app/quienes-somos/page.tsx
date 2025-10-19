import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Quiénes Somos | VoxMontejano",
  description: "Conoce más sobre VoxMontejano, nuestro equipo y nuestra misión de informar con calidad y veracidad.",
  keywords: ["VoxMontejano", "equipo", "misión", "periodismo", "información"],
  openGraph: {
    title: "Quiénes Somos | VoxMontejano",
    description: "Conoce más sobre VoxMontejano, nuestro equipo y nuestra misión de informar con calidad y veracidad.",
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
                Conoce la historia y misión de VoxMontejano
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-serif font-bold mb-6">Nuestra Misión</h2>
                <p className="text-lg leading-relaxed mb-6">
                  VoxMontejano nace con la firme convicción de ser una voz independiente y 
                  veraz en el panorama mediático actual. Creemos que el periodismo debe ser 
                  un puente entre la información y la comunidad, siempre comprometido con la 
                  verdad y la transparencia.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Nuestro compromiso es ofrecer contenido de calidad, análisis profundo y 
                  cobertura responsable de los acontecimientos que moldean nuestro tiempo. 
                  Cada artículo que publicamos está respaldado por una rigurosa investigación 
                  y un enfoque ético que pone a nuestros lectores en el centro de todo lo que hacemos.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif font-bold mb-6">Nuestros Valores</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Veracidad</h3>
                    <p className="text-muted-foreground">
                      La información que compartimos está verificada y contrastada con múltiples 
                      fuentes confiables.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Independencia</h3>
                    <p className="text-muted-foreground">
                      Mantenemos nuestra libertad editorial sin comprometer nuestra integridad 
                      por intereses particulares.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Transparencia</h3>
                    <p className="text-muted-foreground">
                      Somos claros sobre nuestras fuentes, metodología y el proceso detrás 
                      de cada investigación.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Compromiso Social</h3>
                    <p className="text-muted-foreground">
                      Entendemos nuestro rol como agentes de cambio positivo en la sociedad 
                      a través de la información.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif font-bold mb-6">Nuestro Equipo</h2>
                <p className="text-lg leading-relaxed mb-6">
                  VoxMontejano está conformado por un equipo diverso de profesionales del 
                  periodismo, comunicadores, editores y colaboradores especializados en 
                  diferentes áreas del conocimiento. Cada miembro de nuestro equipo aporta 
                  su experiencia y pasión por informar de manera responsable.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Nuestros periodistas y colaboradores tienen formación en comunicación, 
                  periodismo de investigación, análisis político, economía, cultura, 
                  tecnología y otras especialidades que enriquecen nuestro contenido editorial.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-serif font-bold mb-6">Nuestra Historia</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Fundado en 2025, VoxMontejano surge en un momento crucial para el periodismo 
                  digital. Con la proliferación de información en línea, reconocimos la necesidad 
                  de crear un espacio donde la calidad, la verificación y el análisis profundo 
                  fueran los pilares fundamentales.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Desde nuestros inicios, nos hemos enfocado en construir una plataforma que 
                  no solo informe, sino que también eduque y fomente el pensamiento crítico 
                  en nuestros lectores.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-bold mb-6">Contacto</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Valoramos la comunicación con nuestros lectores. Si tienes sugerencias, 
                  comentarios o propuestas para colaborar, no dudes en contactarnos.
                </p>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="font-semibold mb-2">¿Tienes una historia que contar?</p>
                  <p className="text-muted-foreground">
                    En VoxMontejano estamos siempre abiertos a recibir información sobre 
                    temas de interés público. Tu voz puede ser parte del cambio que queremos 
                    generar en el periodismo.
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