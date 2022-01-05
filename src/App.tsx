//components
import ShowCase from "./components/ShowCase";

//context
import QuestionCardProvider from "./context/QuestionCardProvider";

function App() {
  return (
    <QuestionCardProvider>
      <ShowCase />
    </QuestionCardProvider>
  );
}

export default App;
