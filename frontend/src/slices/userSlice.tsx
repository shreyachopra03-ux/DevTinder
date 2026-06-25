import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    _id: string;
    firstName: string;
    lastName?: string;
    emailId: string;
    age: number;
    gender: string;
    photoUrl?: string;
    skills?: string[];
    about?: string;
}

const initialState: UserState | null = null;

const userSlice = createSlice({
    name: "user",
    initialState: initialState as UserState | null,
    reducers: {
        addUser: (_state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        deleteUser: () => {
            return null;
        }
    }
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;