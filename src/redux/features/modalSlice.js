const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isVisible: false,
  type: "",
  selectedPost: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isVisible = true;
      state.type = action.payload.type;
      if (action.payload.post) state.selectedPost = action.payload.post;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.type = "";
      state.selectedPost = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
