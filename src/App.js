import './App.css';
import { Header } from './components/Header';
import {Routes, Route} from 'react-router-dom';
import { Topbar } from './components/Top-bar';
import { ReviewList } from './components/Review-list';
import { SingleReview } from './components/Single-review';
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { RightAside } from './components/Right-aisde';

function App() {
	const [user, setUser] = useState('cooljmessy');
	const [sidebarVisible, setSidebarVisible] = useState(false);

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [screenHeight, setScreenHeight] = useState(window.innerHeight);

	const [sortItems, setSortItems] = useState([
		{ id: 1, label: 'date', checked: false, disabled: false, query: 'created_at' },
		{ id: 2, label: 'comment-count', checked: false, disabled: false, query: 'comment_count' },
		{ id: 3, label: 'votes', checked: false, disabled: false, query: 'votes' },
	]);

	const [orderItems, setOrderItems] = useState([
		{ id: 4, label: 'ascending', checked: false, disabled: false, query: 'asc' },
		{ id: 5, label: 'descending', checked: false, disabled: false, query: 'desc' },
	]);

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
			<Topbar setSidebarVisible={setSidebarVisible} screenWidth={screenWidth} />
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
								sortItems={sortItems}
								setSortItems={setSortItems}
								orderItems={orderItems}
								setOrderItems={setOrderItems}
                screenWidth={screenWidth}
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
								sortItems={sortItems}
								setSortItems={setSortItems}
								orderItems={orderItems}
								setOrderItems={setOrderItems}
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
								sortItems={sortItems}
								setSortItems={setSortItems}
								orderItems={orderItems}
								setOrderItems={setOrderItems}
							/>
						}
					/>
				</Routes>
				{screenWidth < 1020 ? null : (
					<RightAside
						sortItems={sortItems}
						setSortItems={setSortItems}
						orderItems={orderItems}
						setOrderItems={setOrderItems}
            user={user}
            screenWidth={screenWidth}
					/>
				)}
			</section>
		</div>
	);
}

export default App;
