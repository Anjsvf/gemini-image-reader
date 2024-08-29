import { Request, Response } from "express";
import Measure from "../model/Measure";

export const listMeasures = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  if (!customer_code) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "customer_code is required",
    });
  }

  try {
    const query: any = { customer_code };
    if (measure_type) {
      query.measure_type = measure_type.toString().toUpperCase();
    }

    const measures = await Measure.find(query);

    if (measures.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }

    res.status(200).json({
      customer_code,
      measures,
    });
  } catch (error) {
    console.error("Error fetching measures:", error);
    res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "An internal server error occurred",
    });
  }
};
