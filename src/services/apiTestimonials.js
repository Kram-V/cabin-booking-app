import supabase from "./supabase";

export async function getTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error.message);

    throw new Error("Testimonials could not be loaded");
  }

  return data;
}

export async function createTestimonial(insertData) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([insertData])
    .select()
    .single();

  if (error) {
    console.log(error.message);

    throw new Error("Testimonial could not be added");
  }

  return data;
}

export async function updateTestimonial(d, id) {
  const { data, error } = await supabase
    .from("testimonials")
    .update({ ...d })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);

    throw new Error("Testimonial could not be updated");
  }

  return data;
}

export async function deleteTestimonial(id) {
  const { data, error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error.message);

    throw new Error("Testimonial could not be deleted");
  }

  return data;
}
