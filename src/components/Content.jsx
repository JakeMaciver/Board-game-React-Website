import { useEffect, useState } from "react"
import { createReviewCards } from "./utils"
import { getReviews } from "./api";

export const Content = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews();
      console.log(data);
      setReviews(data);
    }
    fetchData();
  }, [])

  return (<section className="main-content">
    <ul className="cards-list">
      {createReviewCards(reviews)}
    </ul>
  </section>)
}