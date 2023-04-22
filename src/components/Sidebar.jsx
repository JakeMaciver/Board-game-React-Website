import { useState, useEffect } from 'react';
import { getCategories } from './api';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getCategories();
			setCategories(data);
		};
		fetchData();
	}, []);

	return (
		<ul className='side-bar'>
			<Link to={`/reviews`} style={{ textDecoration: 'none' }}>
				<p className='side-bar-title'>Home</p>
			</Link>
			<p className='side-bar-title'>Categories</p>
			{categories.map((category) => {
				return (
					<li key={category.slug} className='side-bar-list-item'>
						<Link
							to={`/reviews/categories/${category.slug}`}
							style={{ textDecoration: 'none', color: '#ccc'}}
						>
							<p>{category.slug}</p>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
