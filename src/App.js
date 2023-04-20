import './App.css';
import { Header } from './components/Header';
import {Routes, Route} from 'react-router-dom';
import { Topbar } from './components/Top-bar';
import { ReviewList } from './components/Review-list';
import { SingleReview } from './components/Single-review';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState('cooljmessy');

  return (
		<div className='App'>
			<Header />
			<Topbar />
			<section className='main-content'>
				<Routes>
					<Route path='/' element={<ReviewList user={user} />} />
					<Route path='/reviews' element={<ReviewList user={user} />} />
					<Route
						path='/reviews/:review_id'
						element={<SingleReview user={user} />}
					/>
				</Routes>
			</section>
		</div>
	);
}

export default App;
