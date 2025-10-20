// Client-side service for formatting content using server-side API

export interface GeminiFormatResponse {
  formattedContent: string;
  success: boolean;
  error?: string;
}

export class GeminiAIService {
  async formatContent(content: string): Promise<GeminiFormatResponse> {
    if (!content.trim()) {
      return {
        formattedContent: content,
        success: false,
        error: 'El contenido está vacío.'
      };
    }

    try {
      const response = await fetch('/api/format-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la respuesta del servidor');
      }

      const data = await response.json();
      
      if (data.success) {
        return {
          formattedContent: data.formattedContent,
          success: true
        };
      } else {
        return {
          formattedContent: content,
          success: false,
          error: data.error || 'Error desconocido'
        };
      }
    } catch (error) {
      console.error('Error formatting content:', error);
      
      let errorMessage = 'Error de conexión al servidor';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return {
        formattedContent: content,
        success: false,
        error: errorMessage
      };
    }
  }

  isConfigured(): boolean {
    // Always return true since we're using server-side API
    return true;
  }
}

// Singleton instance
export const geminiAI = new GeminiAIService();
