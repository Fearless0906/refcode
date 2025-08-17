import { BASE_URL } from "@/lib/client";
import { Snippet } from "@/types/type";

export const fetchSnippet = async (token: string): Promise<Snippet[]> => {
  const response = await fetch(`${BASE_URL}/snippets/snippet-list/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch snippets");
  }

  return response.json();
};

export const createSnippet = async (
  token: string,
  snippet: Omit<Snippet, "id" | "created_at">
): Promise<Snippet> => {
  const response = await fetch(`${BASE_URL}/snippets/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(snippet),
  });

  if (!response.ok) {
    throw new Error("Failed to create snippet");
  }

  return response.json();
};

export const updateSnippet = async (
  token: string,
  id: number,
  snippet: Partial<Snippet>
): Promise<Snippet> => {
  const response = await fetch(`${BASE_URL}/snippets/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(snippet),
  });

  if (!response.ok) {
    throw new Error("Failed to update snippet");
  }

  return response.json();
};

export const deleteSnippet = async (
  token: string,
  id: number
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/snippets/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete snippet");
  }
};
