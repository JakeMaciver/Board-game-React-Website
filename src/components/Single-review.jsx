import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { getSingleReview } from "./api";
import { createSingleReview } from "./utils";

export const SingleReview = () => {

  const [review, setReview] = useState([]);
  let {review_id} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
				try {
					const data = await getSingleReview(review_id);
					setReview(data);
				} catch (error) {
					setError('Error fetching data from api');
				}
				setIsLoading(false);
			};
			fetchData();
  }, [])

	return (
		<ul className='single-review'>
			{isLoading ? (
				<p className='loading-text'>Loading content...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<ul className='cards-list'>{createSingleReview(review)}</ul>
			)}
			<li className='post-comment'></li>
			<li className='comments'></li>
		</ul>
	);
};
