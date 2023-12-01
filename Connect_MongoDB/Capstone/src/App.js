import '../src/App.module.css';
import ChatGPTComponent from './GPT';
import Course_Screen from './Screens/CourseScreen/coursescreen';
import MainScreen from './Screens/MainScreen/mainscreen';
import './color.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<MainScreen />} />
					<Route exact path="/gpt" element={<ChatGPTComponent />} />
					<Route exact path="/course" element={<Course_Screen />} />
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;
// API-KEY : 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