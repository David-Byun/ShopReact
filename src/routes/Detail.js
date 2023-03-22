import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Detail(props) {
  let [check, setCheck] = useState(true);

  /* 유저가 URL 파라미터에 입력한 거 가져오려면 useParams */
  let { id } = useParams();
  let [tab, setTab] = useState(0);

  /* find()는 array뒤에 붙을 수 있으며 return 조건식을 적으면 됨 */
  /* find() callback 함수에 파라미터 넣으면 array 자료에 있던 자료를 뜻함 x로 작명 */
  /* x.id == id라는 조건식을 씀. 해당 조건에 맞는 결과를 변수에 담아줌 */
  let product = props.shoes.find((x) => x.id == id);
  let [target, setTarget] = useState('');
  /* 
    useEffect안에 코드는 html 렌더링 후에 동작합니다. 
    주로 적는 케이스
    - 어려운 연산
    - 서버에서 데이터 가져오는 작업
    - 타이머 장착하는 것
    - 서버로 데이터 요청하는 코드
    
    1. 재렌더링마다 코드 실행하고 싶으면 useEffect(()=>{});
    2  컴포넌트가 로드될 때 딱 한번 실행하고 싶으면(mount 1회) useEffect(() => {}, []);
    3. useEffect 실행 전에 뭔가 실행하려면 언제나 : useEffect(() => {return ()=> {}}, []) 
    4. 특정 state 변경시에만 실행하려면 [state명] useEffect(() => {}, [count])

  */
  /* useEffect 실행 조건 넣을수 있는 곳은 [] 해당 입력한 값이 변할때만 실행됨 */
  /* [] 에 입력한 값이 없으면 mount해도 생기지 않음*/
  useEffect(() => {
    /* isNaN 함수 사용하여 확인 */
    if (isNaN(target) == true) {
      alert('숫자만 입력 가능해요!');
    }
    /* return 은 useEffect 동작 전에 실행되는 코드 */
    return () => {
      /* 기존 타이머는 제거해주세요 */
      /* 기존 데이터 요청은 제거해주세요(서버로 데이터 요청이 중복되는 현상 방지) */
    };
  }, [target]);

  return (
    <div className="container">
      {check === true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : (
        ''
      )}

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
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={props.shoes} />
    </div>
  );
}

/* component는 return 문이 없으면 제 기능 못함 */
/* 
  팁1. props.어쩌구가 귀찮으면 {} 변수명 ex) {tab, tab2} 
  팁2. if 절 안쓰고 아래 처럼 해도 됨
*/
function TabContent({ tab, shoes }) {
  let [fade, setFade] = useState('');
  useEffect(() => {
    //리액트의 automatic batching 기능 : state 변경함수마다 재렌더링이 아니라 한번에 렌더링
    setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('');
    };
  }, [tab]);
  // 탭 state가 변할 때 end 부착
  return (
    <div className={`start ${fade}`}>
      [<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tab];
    </div>
  );
}
// 전환 애니메이션은 부착하면 애니메이션 나오는 className 하나 만들고 원할 때 부착하면 됨
// 1.동작전 className, 동작후 className 만들기 2. className에 transition속성 추가 3. 원할때 2번 className 부착
export default Detail;
