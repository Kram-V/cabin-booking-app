import supabase from "./supabase";

export async function getRatings() {
  const { data, error } = await supabase
    .from("ratings")
    .select("*, guests(fullname)")
    .order("id", { ascending: false });

  if (error) {
    console.log(error.message);

    throw new Error("Ratings could not be loaded");
  }

  return data;
}
