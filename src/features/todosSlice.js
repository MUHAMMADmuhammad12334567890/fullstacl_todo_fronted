import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  error: null,
  loading: false,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todo");

      const data = await res.json();
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchPostTodo = createAsyncThunk(
  "todos/fetch/post",
  async (text, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: text }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/fetch/delete",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/todo/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const patchTodo = createAsyncThunk(
  "todos/fetch/patch",
  async (tofo, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todo/${tofo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ compleyted: !tofo.compleyted }),
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;

        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;

        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      });
    builder.addCase(fetchPostTodo.fulfilled, (state, action) => {
      state.todos.unshift(action.payload);
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((item) => item._id !== action.payload);
    });

    builder.addCase(patchTodo.fulfilled, (state, action) => {
      state.compleyted = state.todos.map((item) => {
        if (item._id === action.payload._id) {
          (item.compleyted = !item.compleyted);
          return item
        }
        return item;
      });
    });
  },
});

export default todosSlice.reducer;
