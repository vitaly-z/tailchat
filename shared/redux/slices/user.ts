import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserLoginInfo } from '../../model/user';
import type { FriendRequest } from '../../model/friend';

interface UserState {
  info: UserLoginInfo | null;
  friends: string[]; // 好友的id列表
  friendRequests: FriendRequest[];
}

const initialState: UserState = { info: null, friends: [], friendRequests: [] };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserLoginInfo>) {
      state.info = action.payload;
    },
    setFriendList(state, action: PayloadAction<string[]>) {
      state.friends = action.payload;
    },
    setFriendRequests(state, action: PayloadAction<FriendRequest[]>) {
      state.friendRequests = action.payload;
    },
    appendFriend(state, action: PayloadAction<string>) {
      if (state.friends.some((id) => id === action.payload)) {
        return;
      }

      state.friends.push(action.payload);
    },
    appendFriendRequest(state, action: PayloadAction<FriendRequest>) {
      if (state.friendRequests.some(({ _id }) => _id === action.payload._id)) {
        return;
      }

      state.friendRequests.push(action.payload);
    },
    removeFriendRequest(state, action: PayloadAction<string>) {
      const index = state.friendRequests.findIndex(
        ({ _id }) => _id === action.payload
      );
      if (index >= 0) {
        state.friendRequests.splice(index, 1);
      }
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
