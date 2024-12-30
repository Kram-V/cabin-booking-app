import supabase from "./supabase";

export async function signUp({ username, email, password, isAdmin }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: "",
        isAdmin,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUserDetails() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateCurrentUser({ username, password, avatar }) {
  let updateData;

  if (username) updateData = { data: { username } };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `https://cuglupvfbzhdsrqboigm.supabase.co/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarError) throw new Error(avatarError.message);

  return updatedData;
}
