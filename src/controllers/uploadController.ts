import { Request, Response } from "express";
import axios from "axios";

export const uploadImage = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  // Validações de dados
  if (!image || !customer_code || !measure_datetime || !measure_type) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Missing required fields",
    });
  }

  try {
    // Integração com a API do Google Gemini
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
      {
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );

    const { image_url, measure_value, measure_uuid } = response.data;

    // Verifique se já existe uma leitura no mês para este tipo de leitura

    res.status(200).json({
      image_url,
      measure_value,
      measure_uuid,
    });
  } catch (error) {
    console.error("Error while processing the image:", error);
    res.status(500).json({
      error_code: "GEMINI_API_ERROR",
      error_description: "Error while processing the image",
    });
  }
};
