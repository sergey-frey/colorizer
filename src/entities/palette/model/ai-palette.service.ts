import { aiInstance } from "@/src/shared/api/ai-instance";
import { GenerateAIPaletteDto, GetAIPaletteDto } from "@/src/shared/api/dto";
import { formatAIPalette } from "@/src/shared/lib/color";
import { ChatCompletionMessageParam } from "openai/src/resources/chat/completions.js";

class AIPaletteService {
  private _ai = aiInstance;
  private _model = "gpt-3.5-turbo";
  private _contexts: Record<string, ChatCompletionMessageParam[]> = {
    getPalette: [
      {
        role: "system",
        content:
          "You are a color palette generator. You should generate a beautiful color palette with the given amount of colors.",
      },
    ],
  };

  async getPalette({
    amountOfColors,
  }: GetAIPaletteDto): Promise<GenerateAIPaletteDto | null> {
    const completion = await this._ai.chat.completions.create({
      model: this._model,
      messages: [
        ...this._contexts["getPalette"],
        {
          role: "user",
          content: `Give me a beautiful color palette with ${amountOfColors} colors. You should return only ${amountOfColors} hex colors separated by commas.`,
        },
      ],
    });

    const response = completion.choices[0].message?.content;

    if (!response) {
      return null;
    }

    return {
      data: formatAIPalette(response),
    };
  }
}

export const aiPaletteService = new AIPaletteService();
