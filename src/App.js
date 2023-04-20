import './App.css';
import { Header } from './components/Header';
import {Routes, Route} from 'react-router-dom';
import { Topbar } from './components/Top-bar';
import { ReviewList } from './components/Review-list';
import { SingleReview } from './components/Single-review';
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';

function App() {

  const [user, setUser] = useState('cooljmessy');
  const [sidebarVisible, setSidebarVisible] = useState(false);

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [screenHeight, setScreenHeight] = useState(window.innerHeight);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
		setScreenHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

  return (
		<div className='App'>
			<Header />
			<Topbar setSidebarVisible={setSidebarVisible} screenWidth={screenWidth}/>
			<section className='main-content'>
				{screenWidth < 1020 ? null : <Sidebar />}
				<Routes>
					<Route
						path='/'
						element={
							<ReviewList
								user={user}
								setSidebarVisible={setSidebarVisible}
								sidebarVisible={sidebarVisible}
							/>
						}
					/>
					<Route
						path='/reviews'
						element={
							<ReviewList
								user={user}
								setSidebarVisible={setSidebarVisible}
								sidebarVisible={sidebarVisible}
							/>
						}
					/>
					<Route
						path='/reviews/:review_id'
						element={
							<SingleReview
								user={user}
								setSidebarVisible={setSidebarVisible}
								sidebarVisible={sidebarVisible}
							/>
						}
					/>
					<Route
						path='/reviews/categories/:category_name'
						element={
							<ReviewList
								user={user}
								setSidebarVisible={setSidebarVisible}
								sidebarVisible={sidebarVisible}
							/>
						}
					/>
				</Routes>
			</section>
		</div>
	);
}

export default App;
