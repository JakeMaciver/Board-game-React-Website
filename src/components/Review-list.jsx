import { useEffect, useState } from 'react';
import { getReviews } from './api';
import { Link, useParams } from 'react-router-dom';
import { formatTime } from './utils';
import { Vote } from './Vote';
import { Sidebar } from './Sidebar';

export const ReviewList = ({sidebarVisible, sortItems, setSortItems, orderItems, setOrderItems}) => {
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [getReviewsError, setGetReviewsError] = useState(null);
	const [voteError, setVoteError] = useState(false);

	const [category, setCategory] = useState('');
	const { category_name } = useParams();

  const [query, setQuery] = useState({sort_by: null, order_by: null})

  const getQuery = (sortByItems, orderByItems) => {
		let sort_by = null;
		let order_by = null;

		sortByItems.forEach((item) => {
			if (item.checked) {
				sort_by = item.query;
			}
		});

		orderByItems.forEach((item) => {
			if (item.checked) {
				order_by = item.query;
			}
		});

		setQuery({ sort_by, order_by });
	};

  function sortReviews(reviews, sortBy, sortOrder) {
		return reviews.sort((a, b) => {
			let comparison = 0;
			if (a[sortBy] > b[sortBy]) {
				comparison = 1;
			} else if (a[sortBy] < b[sortBy]) {
				comparison = -1;
			}
			return sortOrder === 'asc' ? comparison : comparison * -1;
		});
	}

	useEffect(() => {
		setCategory(category_name);
	}, [category_name]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let data = await getReviews(category);
        getQuery(sortItems, orderItems)
        data = sortReviews(data, query.sort_by, query.order_by);
				setReviews(data);
			} catch (error) {
        console.log(error);
				setGetReviewsError('Error fetching data from api');
			}
			setIsLoading(false);
		};
		fetchData();
	}, [category, orderItems, query.order_by, sortItems, query.sort_by]);

	return (
		<section className='review-list'>
			{sidebarVisible ? (
				<Sidebar
					sidebarVisible={sidebarVisible}
					sortItems={sortItems}
					setSortItems={setSortItems}
					orderItems={orderItems}
					setOrderItems={setOrderItems}
				/>
			) : isLoading ? (
				<p className='loading-text'>Loading content...</p>
			) : getReviewsError ? (
				<p>{getReviewsError}</p>
			) : (
				<ul className='cards-list'>
					{category ? <h2 className='category-title'>{category}</h2> : null}
					{reviews.map((review) => {
						return (
							<li key={review.review_id} className='review-card'>
								<section className='card-category-box'>
									<span className='material-symbols-outlined'>category</span>
									<p>/category/{review.category}</p>
								</section>
								<Link to={`/reviews/${review.review_id}`}>
									<h2 className='card-title'>{review.title}</h2>
								</Link>
								<section className='card-sub-text'>
									<p>by {review.owner}</p>
									<p>on {formatTime(review.created_at)}</p>
								</section>
								<img
									src={review.review_img_url}
									alt={review.title}
									className='card-img'
								></img>
								<p className='card-created-by'>
									Game created by {review.designer}
								</p>
								<section className='card-footer'>
									<p>
										<span className='material-symbols-outlined'>chat</span>
										{review.comment_count}
									</p>
									<Vote
										reviews={reviews}
										review={review}
										setReviews={setReviews}
										setVoteError={setVoteError}
										voteError={voteError}
									/>
									{voteError ? (
										<p className='error'>
											Could not process vote, check connection...
										</p>
									) : null}
								</section>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
};
