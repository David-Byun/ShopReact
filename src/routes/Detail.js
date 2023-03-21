import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail(props) {
  /* 
    useEffect안에 코드는 html 렌더링 후에 동작합니다
    - 어려운 연산
    - 서버에서 데이터 가져오는 작업
    - 타이머 장착하는 것
  */
  useEffect(() => {
    console.log('안녕');
  });

  let [count, setCount] = useState(0);

  /* 유저가 URL 파라미터에 입력한 거 가져오려면 useParams */
  let { id } = useParams();

  /* find()는 array뒤에 붙을 수 있으며 return 조건식을 적으면 됨 */
  /* find() callback 함수에 파라미터 넣으면 array 자료에 있던 자료를 뜻함 x로 작명 */
  /* x.id == id라는 조건식을 씀. 해당 조건에 맞는 결과를 변수에 담아줌 */
  let product = props.shoes.find((x) => x.id == id);

  return (
    <div className="container">
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
