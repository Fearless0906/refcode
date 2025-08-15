import { BASE_URL } from "@/lib/client";
import { Snippet } from "@/types/type";

class SnippetService {
  async snippetList(token: string): Promise<Snippet[]> {
    const res = await fetch(`${BASE_URL}/snippets/snippet-list/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch snippets");
    return res.json();
  }

  async createSnippet(
    token: string,
    snippet: Omit<Snippet, "id" | "created_at">
  ): Promise<Snippet> {
    const { user_id, ...snippetWithoutUserId } = snippet;
    const snippetForBackend = {
      ...snippetWithoutUserId,
      user: parseInt(user_id),
    };

    const res = await fetch(`${BASE_URL}/snippets/snippet-create/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetForBackend),
    });
    if (!res.ok) throw new Error("Failed to create snippet");
    return res.json();
  }

  async updateSnippet(
    token: string,
    id: number,
    snippet: Partial<Snippet>
  ): Promise<Snippet> {
    const res = await fetch(`${BASE_URL}/snippets/${id}/update/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(snippet),
    });
    if (!res.ok) throw new Error("Failed to update snippet");
    return res.json();
  }

  async deleteSnippet(token: string, id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/snippets/${id}/delete/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete snippet");
  }
}

export const snippetService = new SnippetService();
