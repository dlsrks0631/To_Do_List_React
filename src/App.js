import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onDelete = (index) => {
    setToDos((currentArray) => {
      const updatedToDos = currentArray.filter((_, i) => i !== index);
      return updatedToDos;
    });
  };

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [...currentArray, toDo]);
    setToDo("");
  };

  useEffect(() => {
    const storedToDos = localStorage.getItem("toDos");
    if (storedToDos) {
      setToDos(JSON.parse(storedToDos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const onMouseEnter = (event) => (event.target.style.transform = "scale(1.4)");
  const onMouseLeave = (event) => (event.target.style.transform = "scale(1)");

  return (
    <div>
      <h1>오늘의 할일 리스트</h1>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={onChange}
          type="text"
          placeholder="할 일을 입력하세요..."
        />
        <button>추가</button>
      </form>
      <hr />
      <ul style={{ listStyle: "none" }}>
        {toDos.map((item, index) => (
          <li key={index}>
            {index + 1}. {item}
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}
              onClick={() => onDelete(index)}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
