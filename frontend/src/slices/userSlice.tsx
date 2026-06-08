import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string,
    name?: string,
    email: string
}

const initialState: UserState | null = null as UserState | null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (_state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        deleteUser: () => {
            return null;
        }
    }
});

export const { addUser,deleteUser } = userSlice.actions;

export default userSlice.reducer;