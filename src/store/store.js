import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './userSlice';

// + 버튼 누르면 수량이 +1 되는 기능(0번째 버튼 누르면 id가 0인 것을 ++) id와 동일한 id 가진 상품을 + 1
// 주문하기 버튼 누르면 장바구니 상품 추가하기

let data = [
  { id: 0, name: 'White and Black', count: 2 },
  { id: 2, name: 'Grey Yordan', count: 1 },
];
/* 
    UseState 같은 역할 
    Redux의 state 변경하는 법 : state 수정해주는 함수 만들고 원할 때 그 함수 실행해달라고 store.js에 요청
    1. state 수정해주는 함수 만들기
    2. 만든 함수를 export 해야함
    3. 만든 함수 import 해서 사용
*/

let cart = createSlice({
  name: 'cart',
  initialState: data,
  reducers: {
    addNum(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[num].count++;
    },
  },
});

export let { addNum } = cart.actions;

export default configureStore({
  reducer: {
    cart: cart.reducer,
    user: user.reducer,
  },
});
