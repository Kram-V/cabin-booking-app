import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);

    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(d) {
  const hasImagePath = typeof d.image === "string" ? true : false;

  let imageName;
  let imagePath;

  if (!hasImagePath) {
    imageName = `${Math.random()}-${d.image.name}`.replaceAll("/", "");
    imagePath = `https://cuglupvfbzhdsrqboigm.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...d, image: hasImagePath ? d.image : imagePath })
    .select()
    .single();

  if (error) {
    console.log(error.message);

    throw new Error("Cabin could not be added");
  }

  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, d.image);

    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(uploadError);
      throw new Error("Can't upload photo");
    }
  }

  return data;
}

export async function updateCabin(d, id) {
  const hasImagePath = typeof d.image === "string" ? true : false;

  let imageName;
  let imagePath;

  if (!hasImagePath) {
    imageName = `${Math.random()}-${d.image.name}`.replaceAll("/", "");
    imagePath = `https://cuglupvfbzhdsrqboigm.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...d, image: hasImagePath ? d.image : imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);

    throw new Error("Cabin could not be updated");
  }

  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, d.image);

    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(uploadError);
      throw new Error("Can't upload photo");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message);

    throw new Error("Cabin could not be deleted");
  }

  return data;
}
