import { snippetState, Snippet } from "@/types/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { snippetService } from "@/services/snippetService";

const loadInitialState = (): snippetState => {
  return {
    snippet: [],
    loading: false,
    error: null,
    success: false,
  };
};

const initialState: snippetState = loadInitialState();

export const fetchSnippetList = createAsyncThunk<
  Snippet[], // Return type
  string, // Argument type (token)
  { rejectValue: string } // Reject type
>("snippet/snippetList", async (token, { rejectWithValue }) => {
  try {
    return await snippetService.snippetList(token);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch snippets"
    );
  }
});

export const createSnippet = createAsyncThunk<
  Snippet, // Return type
  { token: string; snippet: Omit<Snippet, "id" | "created_at"> }, // Argument type
  { rejectValue: string } // Reject type
>("snippet/createSnippet", async ({ token, snippet }, { rejectWithValue }) => {
  try {
    return await snippetService.createSnippet(token, snippet);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to create snippet"
    );
  }
});

export const updateSnippet = createAsyncThunk<
  Snippet, // Return type
  { token: string; id: number; snippet: Partial<Snippet> }, // Argument type
  { rejectValue: string } // Reject type
>(
  "snippet/updateSnippet",
  async ({ token, id, snippet }, { rejectWithValue }) => {
    try {
      return await snippetService.updateSnippet(token, id, snippet);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update snippet"
      );
    }
  }
);

const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {
    resetSnippetState: () => loadInitialState(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnippetList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        fetchSnippetList.fulfilled,
        (state, action: PayloadAction<Snippet[]>) => {
          state.loading = false;
          state.snippet = action.payload;
          state.success = true;
        }
      )
      .addCase(fetchSnippetList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
        state.success = false;
      })
      .addCase(createSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createSnippet.fulfilled,
        (state, action: PayloadAction<Snippet>) => {
          state.loading = false;
          state.snippet.push(action.payload);
          state.success = true;
        }
      )
      .addCase(createSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
        state.success = false;
      })
      .addCase(updateSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateSnippet.fulfilled,
        (state, action: PayloadAction<Snippet>) => {
          state.loading = false;
          const index = state.snippet.findIndex(
            (s) => s.id === action.payload.id
          );
          if (index !== -1) {
            state.snippet[index] = action.payload;
          }
          state.success = true;
        }
      )
      .addCase(updateSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
        state.success = false;
      });
  },
});

export const { resetSnippetState } = snippetSlice.actions;
export default snippetSlice.reducer;
