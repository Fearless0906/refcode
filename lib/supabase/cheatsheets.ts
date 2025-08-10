import { createClient } from "./client";
import { CheatSheet, CheatSheetItem } from "@/types/type";

export async function getCheatSheets(userId: string): Promise<CheatSheet[]> {
  const supabase = createClient();

  const { data: cheatsheets, error } = await supabase
    .from("cheatsheets")
    .select(
      `
      *,
      items:cheatsheet_items(*)
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cheat sheets:", error);
    throw error;
  }

  return cheatsheets || [];
}

export async function getCheatSheetById(
  id: string,
  userId: string
): Promise<CheatSheet | null> {
  const supabase = createClient();

  const { data: cheatsheet, error } = await supabase
    .from("cheatsheets")
    .select(
      `
      *,
      items:cheatsheet_items(*)
    `
    )
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching cheat sheet:", error);
    return null;
  }

  return cheatsheet;
}

export async function createCheatSheet(
  cheatsheet: Omit<CheatSheet, "id" | "created_at" | "updated_at">,
  items: Omit<CheatSheetItem, "id" | "cheatsheet_id" | "created_at">[]
): Promise<CheatSheet> {
  const supabase = createClient();

  // Start a transaction
  const { data: newCheatSheet, error: cheatsheetError } = await supabase
    .from("cheatsheets")
    .insert(cheatsheet)
    .select()
    .single();

  if (cheatsheetError) {
    console.error("Error creating cheat sheet:", cheatsheetError);
    throw cheatsheetError;
  }

  // Add items to the cheat sheet
  if (items.length > 0) {
    const itemsWithCheatSheetId = items.map((item, index) => ({
      ...item,
      cheatsheet_id: newCheatSheet.id,
      order_index: index,
    }));

    const { error: itemsError } = await supabase
      .from("cheatsheet_items")
      .insert(itemsWithCheatSheetId);

    if (itemsError) {
      console.error("Error creating cheat sheet items:", itemsError);
      throw itemsError;
    }
  }

  // Fetch the complete cheat sheet with items
  const completeCheatSheet = await getCheatSheetById(
    newCheatSheet.id,
    cheatsheet.user_id
  );
  return completeCheatSheet!;
}

export async function updateCheatSheet(
  id: string,
  updates: Partial<
    Omit<CheatSheet, "id" | "created_at" | "updated_at" | "user_id">
  >,
  userId: string
): Promise<CheatSheet> {
  const supabase = createClient();

  const { data: updatedCheatSheet, error } = await supabase
    .from("cheatsheets")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating cheat sheet:", error);
    throw error;
  }

  return updatedCheatSheet;
}

export async function deleteCheatSheet(
  id: string,
  userId: string
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("cheatsheets")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting cheat sheet:", error);
    throw error;
  }
}

export async function toggleFavorite(
  id: string,
  userId: string
): Promise<void> {
  const supabase = createClient();

  // Get current favorite status
  const { data: current } = await supabase
    .from("cheatsheets")
    .select("favorite")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (current) {
    const { error } = await supabase
      .from("cheatsheets")
      .update({ favorite: !current.favorite })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  }
}

export async function addCheatSheetItem(
  cheatsheetId: string,
  item: Omit<CheatSheetItem, "id" | "cheatsheet_id" | "created_at">,
  userId: string
): Promise<CheatSheetItem> {
  const supabase = createClient();

  // Verify the cheat sheet belongs to the user
  const { data: cheatsheet } = await supabase
    .from("cheatsheets")
    .select("id")
    .eq("id", cheatsheetId)
    .eq("user_id", userId)
    .single();

  if (!cheatsheet) {
    throw new Error("Cheat sheet not found or access denied");
  }

  const { data: newItem, error } = await supabase
    .from("cheatsheet_items")
    .insert({
      ...item,
      cheatsheet_id: cheatsheetId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding cheat sheet item:", error);
    throw error;
  }

  return newItem;
}

export async function updateCheatSheetItem(
  id: string,
  updates: Partial<Omit<CheatSheetItem, "id" | "cheatsheet_id" | "created_at">>,
  userId: string
): Promise<CheatSheetItem> {
  const supabase = createClient();

  // Verify the item belongs to a cheat sheet owned by the user
  const { data: item } = await supabase
    .from("cheatsheet_items")
    .select(
      `
      *,
      cheatsheet:cheatsheets!inner(user_id)
    `
    )
    .eq("id", id)
    .eq("cheatsheet.user_id", userId)
    .single();

  if (!item) {
    throw new Error("Cheat sheet item not found or access denied");
  }

  const { data: updatedItem, error } = await supabase
    .from("cheatsheet_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating cheat sheet item:", error);
    throw error;
  }

  return updatedItem;
}

export async function deleteCheatSheetItem(
  id: string,
  userId: string
): Promise<void> {
  const supabase = createClient();

  // Verify the item belongs to a cheat sheet owned by the user
  const { data: item } = await supabase
    .from("cheatsheet_items")
    .select(
      `
      *,
      cheatsheet:cheatsheets!inner(user_id)
    `
    )
    .eq("id", id)
    .eq("cheatsheet.user_id", userId)
    .single();

  if (!item) {
    throw new Error("Cheat sheet item not found or access denied");
  }

  const { error } = await supabase
    .from("cheatsheet_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting cheat sheet item:", error);
    throw error;
  }
}

export async function reorderCheatSheetItems(
  cheatsheetId: string,
  itemIds: string[],
  userId: string
): Promise<void> {
  const supabase = createClient();

  // Verify the cheat sheet belongs to the user
  const { data: cheatsheet } = await supabase
    .from("cheatsheets")
    .select("id")
    .eq("id", cheatsheetId)
    .eq("user_id", userId)
    .single();

  if (!cheatsheet) {
    throw new Error("Cheat sheet not found or access denied");
  }

  // Update order_index for each item
  const updates = itemIds.map((id, index) => ({
    id,
    order_index: index,
  }));

  const { error } = await supabase
    .from("cheatsheet_items")
    .upsert(updates, { onConflict: "id" });

  if (error) {
    console.error("Error reordering cheat sheet items:", error);
    throw error;
  }
}
