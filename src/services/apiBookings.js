import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({
  filter,
  sortBy,
  page,
  rowsPerPage,
  search,
}) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" });

  if (search) {
    query = query.ilike("cabins.name", `%${search}%`).not("cabins", "is", null);
  }

  if (filter) query = query[filter.method](filter.field, filter.value);

  if (sortBy)
    query = query[sortBy.method](sortBy.field, {
      ascending: sortBy.order === "asc",
    });

  if (page) {
    const from = (page - 1) * rowsPerPage;
    const to = from + rowsPerPage - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error.message);

    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getUnconfirmedBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("status", "unconfirmed");

  if (error) {
    console.log(error.message);

    throw new Error("Unconfirmed bookings could not be loaded");
  }

  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extra_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that  were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullname, nationality)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
