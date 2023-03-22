import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addAge } from '../store/userSlice';
import { addNum } from '../store/store';

function Cart() {
  /* 
    component 10개 이상시 사용 
    컴포넌트간 공유 필요없으면 useState props 공유가 나음
  */
  let state = useSelector((state) => state);
  /* 
    store.js로 요청보내주는 함수 
    dispatch(state 변경함수()) 이렇게 사용
    ex) dispatch(changeName())
*/
  let dispatch = useDispatch();

  return (
    <div>
      {state.user.name} {state.user.age}의 장바구니
      <button onClick={() => dispatch(addAge(100))}>나이</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addNum(state.cart[i].id));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
