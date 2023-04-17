export const createReviewCards = (reviewData) => {
	return reviewData.map((review) => {
		return (
			<li key={review.review_id} className='review-card'>
				<section className='card-category-box'>
					<span className='material-symbols-outlined'>category</span>
					<p>/category/{review.category}</p>
				</section>
				<h2 className='card-title'>{review.title}</h2>
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
