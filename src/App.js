import './App.css';
import { Header } from './components/Header';
import {Routes, Route} from 'react-router-dom';
import { Topbar } from './components/Top-bar';
import { ReviewList } from './components/Review-list';
import { SingleReview } from './components/Single-review';

function App() {
  return (
		<div className='App'>
			<Header />
			<Topbar />
			<section className='main-content'>
				<Routes>
					<Route path='/' element={<ReviewList />} />
					<Route path='/reviews' element={<ReviewList />} />
					<Route path='/reviews/:review_id' element={<SingleReview />} />
				</Routes>
			</section>
		</div>
	);
}

export default App;
