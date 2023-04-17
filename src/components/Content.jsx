import { useEffect, useState } from "react"
import { createReviewCards } from "./utils"
import { getReviews } from "./api";

export const Content = () => {

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getReviews();
				setReviews(data);
			} catch (error) {
				setError('Error fetching data from api');
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<section className='main-content'>
			{isLoading ? (
				<p className="loading-text">Loading content...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<ul className='cards-list'>{createReviewCards(reviews)}</ul>
			)}
		</section>
	);
}