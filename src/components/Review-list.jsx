import { useEffect, useState } from 'react';
import { getReviews, patchReviewVotes } from './api';
import {Link} from "react-router-dom";
import { formatTime } from './utils';
import { Vote } from './Vote';

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [getReviewsError, setGetReviewsError] = useState(null);

  useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getReviews();
				setReviews(data);
			} catch (error) {
				setGetReviewsError('Error fetching data from api');
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

  return (
		<section className='review-list'>
			{isLoading ? (
				<p className='loading-text'>Loading content...</p>
			) : getReviewsError? (
				<p>{getReviewsError}</p>
			) : (
				<ul className='cards-list'>
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
									<Vote reviews={reviews} review={review} setReviews={setReviews}/>
								</section>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
};
