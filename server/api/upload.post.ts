import { writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData) return { error: "No file uploaded" };

  const file = formData[0];
  if (!file || !file.filename) return { error: "Invalid file" };

  const fileName = `${Date.now()}-${file.filename}`;
  const filePath = resolve(`./public/images/${fileName}`);

  writeFileSync(filePath, file.data);

  return {
    success: true,
    path: `/images/${fileName}`,
  };
});
