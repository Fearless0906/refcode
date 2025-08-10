import { createClient } from "@/lib/supabase/client";
import { Snippet } from "@/types/type";

export class SnippetService {
  private supabase = createClient();

  async getSnippets(userId: string): Promise<Snippet[]> {
    console.log("Getting snippets for user:", userId);

    // Get the current session to ensure we're authenticated
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      throw sessionError;
    }

    if (!session) {
      console.error("No active session found");
      throw new Error("No active session");
    }

    console.log("Session found, user:", session.user.email);
    console.log("Making database request...");

    const { data, error } = await this.supabase
      .from("snippets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching snippets:", error);
      throw error;
    }

    console.log("Snippets fetched successfully:", data?.length || 0);
    return data || [];
  }

  async createSnippet(
    snippet: Omit<Snippet, "id" | "created_at">
  ): Promise<Snippet> {
    // Get the current session to ensure we're authenticated
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      throw sessionError;
    }

    if (!session) {
      throw new Error("No active session");
    }

    const { data, error } = await this.supabase
      .from("snippets")
      .insert({
        ...snippet,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating snippet:", error);
      throw error;
    }

    return data;
  }

  async updateSnippet(id: string, updates: Partial<Snippet>): Promise<Snippet> {
    // Get the current session to ensure we're authenticated
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      throw sessionError;
    }

    if (!session) {
      throw new Error("No active session");
    }

    const { data, error } = await this.supabase
      .from("snippets")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating snippet:", error);
      throw error;
    }

    return data;
  }

  async deleteSnippet(id: string): Promise<void> {
    // Get the current session to ensure we're authenticated
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      throw sessionError;
    }

    if (!session) {
      throw new Error("No active session");
    }

    const { error } = await this.supabase
      .from("snippets")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting snippet:", error);
      throw error;
    }
  }

  async toggleFavorite(id: string, favorite: boolean): Promise<void> {
    // Get the current session to ensure we're authenticated
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      throw sessionError;
    }

    if (!session) {
      throw new Error("No active session");
    }

    const { error } = await this.supabase
      .from("snippets")
      .update({ favorite })
      .eq("id", id);

    if (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  }

  async searchSnippets(
    userId: string,
    searchTerm: string,
    language?: string,
    favoritesOnly?: boolean
  ): Promise<Snippet[]> {
    // Get the current session to ensure we're authenticated
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      throw sessionError;
    }

    if (!session) {
      throw new Error("No active session");
    }

    let query = this.supabase
      .from("snippets")
      .select("*")
      .eq("user_id", userId);

    if (searchTerm) {
      query = query.or(
        `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`
      );
    }

    if (language && language !== "all") {
      query = query.eq("language", language);
    }

    if (favoritesOnly) {
      query = query.eq("favorite", true);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error searching snippets:", error);
      throw error;
    }

    return data || [];
  }
}

export const snippetService = new SnippetService();
