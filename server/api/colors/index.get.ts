import { defineEventHandler } from "h3";
import { useStorage } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const path = `${process.cwd()}/server/data/colors.json`;
    const storage = useStorage();
    return await storage.getItem(`root:${path}`);

    // Для локальной разработки оставляем текущий подход
  } catch (error) {
    console.error("Error loading colors:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to load colors data: ${error.message}`,
    });
  }
});
