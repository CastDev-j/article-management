import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_PROMPT = `RESPONDE EXCLUSIVAMENTE CON EL TEXTO FORMATEADO EN MARKDOWN
SIN NINGÚN TEXTO ADICIONAL, EXPLICACIONES O COMENTARIOS

PRESERVAR TODAS LAS URLS EXACTAMENTE COMO SE MUESTRAN EN EL ORIGINAL
NO MODIFICAR NINGUNA URL DE IMAGEN, VIDEO O ENLACE

Formatos soportados:

# Título Principal
## Subtítulo  
### Sección
#### Subsección

**negritas**
*cursivas*

> "citas en blockquote"

![descripción](URL-ORIGINAL-INTACTA)
[texto](URL-ORIGINAL-INTACTA)

- listas con guiones
1. listas numeradas

---

Iniciar directamente con el contenido Markdown
URLS PRESERVADAS EXACTAMENTE - ES LO MÁS IMPORTANTE`;

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "El contenido está vacío." },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key no configurada en el servidor." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `${GEMINI_PROMPT}\n\n${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const formattedContent = response.text();

    if (!formattedContent) {
      return NextResponse.json(
        { error: "No se recibió respuesta del modelo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      formattedContent: formattedContent.trim(),
      success: true,
    });
  } catch (error) {
    console.error("Error formatting content with Gemini:", error);

    let errorMessage = "Error desconocido al formatear el contenido";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: `Error al formatear con IA: ${errorMessage}` },
      { status: 500 }
    );
  }
}
