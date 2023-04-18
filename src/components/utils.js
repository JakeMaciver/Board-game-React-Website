import { Link } from 'react-router-dom';

export const createReviewCards = (reviewData) => {
	return reviewData.map((review) => {
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
					<p>on {review.created_at}</p>
				</section>
				<img
					src={review.review_img_url}
					alt={review.title}
					className='card-img'
				></img>
				<p className='card-created-by'>Game created by {review.designer}</p>
				<section className='card-footer'>
					<p>
						<span className='material-symbols-outlined'>chat</span>
						{review.comment_count}
					</p>
					<p>
						<span className='material-symbols-outlined'>favorite</span>
						{review.votes}
					</p>
				</section>
			</li>
		);
	});
};

export const createSingleReview = (review) => {
	return (
		<li className='review'>
			<section className='review-category-box'>
				<span className='material-symbols-outlined'>category</span>
				<p>/category/{review.category}</p>
			</section>
			<h2 className='review-title'>{review.title}</h2>
			<section className='review-sub-text'>
				<p>by {review.owner}</p>
				<p>on {review.created_at}</p>
			</section>
			<img
				src={review.review_img_url}
				alt={review.title}
				className='review-img'
			></img>
			<p className='review-created-by'>Game created by {review.designer}</p>
			<p className='review-body'>{review.review_body}</p>
			<section className='review-footer'>
				<p>
					<span className='material-symbols-outlined'>chat</span>
					{review.comment_count}
				</p>
				<p>
					<span className='material-symbols-outlined'>favorite</span>
					{review.votes}
				</p>
			</section>
		</li>
	);
};
