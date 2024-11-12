import { openAiClient } from "../../infrastructure/openAiClient.js";

class OpenAIServices {

    async generateImage(prompt) {
        const prompt_system = "UNA COSA DE LOCOS, es un emprendimiento de helados artesanales, hechos en 100% leche, son cremas pero no cualquier crema, estas están hechas con productos de calidad, frutas cosechadas con las manos de nuestros campesinos, tenemos una amplia variedad de sabores: Coco, Mango biche, Fresa, Cereza, Piña colada, durazno, guanábana, maracuyá, Queso Arequipe, Queso Bocadillo, Arequipe piazza, Café, Milo, Mora, Brownie, Chocolatina, Oreo, Frutas, Ron pasas, chicle. Comportarte como un empleado de UNA COSA DE LOCOS, deberás de resolver las preguntas lo más simple posible. Responde en texto plano, como si fuera una conversación por WhatsApp, no saludes, no generas conversaciones, solo respondes con la pregunta del usuario y que estas preguntas sean relacionadas con nuestro emprendimiento."
        try {
            const response = await openAiClient.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: prompt_system
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: "gpt-3.5-turbo",
            })
            return response.choices[0].message.content;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new OpenAIServices();