import { Vote } from "./Vote";
import { CommentCounter } from "./CommentCounter";
import { formatTime } from "./utils";

export const SingleReviewCard = ({review, setCommentCounter, setCommentsVisible, setVoteError, setReview, voteError, commentCounter}) => {
  return (
		<ul className='cards-list'>
			<li className='review'>
				<section className='review-category-box'>
					<span className='material-symbols-outlined'>category</span>
					<p>/category/{review.category}</p>
				</section>
				<h2 className='review-title'>{review.title}</h2>
				<section className='review-sub-text'>
					<p>by {review.owner}</p>
					<p>on {formatTime(review.created_at)}</p>
				</section>
				<img
					src={review.review_img_url}
					alt={review.title}
					className='review-img'
				></img>
				<p className='review-created-by'>Game created by {review.designer}</p>
				<p className='review-body'>{review.review_body}</p>
				<section className='review-footer'>
					<CommentCounter
						review={review}
						setCommentsVisible={setCommentsVisible}
						setCommentCounter={setCommentCounter}
            commentCounter={commentCounter}
					/>
					<Vote
						review={review}
						setVoteError={setVoteError}
						setReview={setReview}
						voteError={voteError}
					/>
					{voteError ? (
						<p className='error'>Could not process vote, check connection...</p>
					) : null}
				</section>
			</li>
		</ul>
	);
}