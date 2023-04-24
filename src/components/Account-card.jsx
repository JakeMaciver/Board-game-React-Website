import { getUser } from "./api";
import { useEffect, useState } from "react";

export const AccountCard = ({user}) => {

  const [activeUser, setActiveUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser(user);
      const singleUser = data.filter((userData) => userData.username === user);
      setActiveUser(singleUser[0]);
    }
    fetchData();
  }, [user])

  return (
		<section className='account-card-container'>
			<p className='account-card-name'>{activeUser.username}</p>
			<img className='account-card-profile-pic' src={activeUser.avatar_url} alt={activeUser.username}></img>
			<p className='account-card-message'>logged in</p>
		</section>
	);
}