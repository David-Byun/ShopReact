import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  /* 아래 state는 기존 state(state 변경 함수)*/
  initialState: { name: 'kim', age: 20 },
  reducers: {
    changeName(state) {
      state.name = 'park';
    },
    /* state 변경 함수를 action이라고 함 */
    addAge(state, action) {
      state.age += action.payload;
      /* addAge(10) 이런식으로 state 변경함수에 파라미터 뚫는 법 */
    },
  },
});

export let { changeName, addAge } = user.actions;

export default user;
