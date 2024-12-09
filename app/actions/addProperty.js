"use server";

async function addProprty(formData) {
  const amenities = formData.getAll("amenities");
  const images = formData
  .getAll("images")
  .filter((image) => image.name !== "")
  .map((image) => image.name);
  console.log(images)
}

export default addProprty;
