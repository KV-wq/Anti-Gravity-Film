import { writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData) return { error: "No file uploaded" };

  const file = formData[0];
  if (!file || !file.filename) return { error: "Invalid file" };

  // Проверяем расширение файла
  const validExtensions = [".mp4", ".mov", ".webm"];
  const fileExt = file.filename
    .substring(file.filename.lastIndexOf("."))
    .toLowerCase();

  if (!validExtensions.includes(fileExt)) {
    return { error: "Invalid file type. Only mp4, mov, and webm are allowed." };
  }

  const fileName = `${Date.now()}${fileExt}`;
  const filePath = resolve(`./public/video/${fileName}`);

  writeFileSync(filePath, file.data);

  return {
    success: true,
    path: `/video/${fileName}`,
  };
});
