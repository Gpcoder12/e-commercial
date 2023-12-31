import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishListItems: [],
  amountOfItemsInWishList: 0,
  feedback: { message: "", type: "" },
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      //stores the payload in a constant
      const itemToAdd = action.payload;

      //checks if the payload is already in the  wishListItems array
      const itemToAddExists = state.wishListItems.find(
        (item) => item.id === itemToAdd.id
      );

      //if payload does not exist then create a new object with its values
      if (!itemToAddExists) {
        state.wishListItems.unshift(itemToAdd);

        //Update the feedback and increase the amount of items in the wishlist
        state.feedback.message = "Item added to wishlist";
        state.feedback.type = "success";
        state.amountOfItemsInWishList++;
      }
      if (itemToAddExists) {
        //Update the feedback and increase the amount of items in the wishlist
        state.amountOfItemsInWishList--;
        state.feedback.message = "Item removed from wishlist";
        state.feedback.type = "success";

        //remove the selected item from the array
        state.wishListItems = state.wishListItems.filter(
          (item) => item.id !== itemToAddExists.id
        );
      }
    },
    updateListFromFirebase: (state, action) => {
      //update the wishlist and the amount of items
      state.wishListItems = action.payload;
      state.amountOfItemsInWishList = state.wishListItems.length;
    },
    clearListOnLogout: (state) => {
      state.wishListItems = [];
      state.amountOfItemsInWishList = 0;
    },
  },
});

export const { addToWishList, updateListFromFirebase, clearListOnLogout } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
