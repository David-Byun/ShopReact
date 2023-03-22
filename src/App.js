import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';
import { useQuery } from 'react-query';

function App() {
  let [shoes, setShoes] = useState(data);
  let [show, setShow] = useState(false);

  // hook : 유용한 것들이 들어있는 함수
  // 페이지 이동을 도와주는 함수
  let navigate = useNavigate();

  /* 
    장점 1 : 성공, 실패, 로딩 중 쉽게 파악 가능 
    result.data;
    result.isLoading
    result.error

    장점 2 : 틈만나면 자동으로 재요청해줌
    장점 3 : retry 해줌
    장점 4 : state 공유 안해도 됩니다
  */
  let result = useQuery('작명', () => {
    return (
      axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
        return a.data;
      }),
      { staleTime: 2000 }
    );
  });

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i}></Card>;
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  /* 로딩중 UI 띄우기 */
                  axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((result) => {
                      let copy = [...shoes, ...result.data];
                      setShoes(copy);
                    })
                    .catch(() => {
                      console.log('실패');
                    });

                  // 여러 axios get 요청 완료 후에 코드 진행시에 다음과 같이 작성
                  Promise.all([axios.get('/url1'), axios.get('/url2')]).then(
                    () => {}
                  );
                }}
              >
                버튼
              </button>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'
        }
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
