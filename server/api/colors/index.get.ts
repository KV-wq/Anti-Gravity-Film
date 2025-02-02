import { readFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async () => {
  try {
    const storage = useStorage();
    const data = await storage.getItem("server:data/colors.json");

    if (!data) {
      throw createError({
        statusCode: 404,
        message: "Colors data not found",
      });
    }

    return data;
  } catch (error) {
    console.error("Error reading colors:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to load colors data",
    });
  }
});
