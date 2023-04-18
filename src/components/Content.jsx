import { ReviewList } from './Review-list';
import { useLocation } from 'react-router-dom';
import { SingleReview } from './Single-review';

export const Content = () => {
	let { pathname } = useLocation();

	return (
		<section className='main-content'>
			{pathname === `/` || pathname === `/reviews` ? (
				<ReviewList />
			) : (
				<SingleReview />
			)}
		</section>
	);
};
