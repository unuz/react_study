import './App.css';
import { useState } from 'react';

//Header Component
function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault(); // a태그의 기본 이벤트 실행 X
      props.onChangeMode(); // onChangeMode 함수 실행
    }}>{props.title}</a></h1>  {/* props로 전달받은 title 출력 */}
  </header>
}

//Nav Component
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(
    <li key={t.id}>
      <a id={t.id} href={'/read/'+t.body} onClick={(event)=>{
        event.preventDefault(); // a태그의 기본 이벤트 실행 X
        props.onChangeMode(Number(event.target.id)); // onChangeMode 함수 실행
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}  
    </ol>
  </nav>
}

//Article Component
function Article(props){
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}

//Create Component
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event)=>{
      event.preventDefault(); // submit 기본 이벤트 실행 X
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body); // onCreate 실행
    }}>
      <p>
        <input type="text" name="title" placeholder='title을 입력하세요'/>
      </p>
      <p>
        <textarea name="body" placeholder='body를 입력하세요' />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html',body:'html is ...'},
    {id:2, title:'css',body:'css is ...'},
    {id:3, title:'javascript',body:'javascript is ...'}
  ]);
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcom" body="Hello, React"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i< topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      const newTopics = [...topics]; // topics 복제하여 사용 *객체는 복제하여 처리하여야 함
      newTopics.push(newTopic);
      setTopics(newTopics); // newTopics topics state set
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  return (
    <div>
      <Header title="React" onChangeMode={()=>{
        setMode('WELCOME'); //mode state 'WELCOME'으로 변경
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{ // 변수 전달 시 중괄호로 감싸줌
        setMode('READ'); //mode state 'READ'로 변경
        setId(id);
      }}></Nav>
      {content}
      <a href='/create' onClick={(event)=>{
        event.preventDefault(); // a 태그 기본 이벤트 실행 X
        setMode('CREATE'); // mode state 'CREATE'로 변경
      }}>Create</a>
    </div>
  );
}

export default App;
