export const Topbar = ({setSidebarVisible, screenWidth}) => {

  const handleMenuOnClick = () => {
    if(screenWidth < 1020) setSidebarVisible((sidebarVisible) => !sidebarVisible);
  }

  return (
		<section className='top-bar'>
			<span className='material-symbols-outlined' onClick={handleMenuOnClick}>menu</span>
			<button className="create-review-btn">Create A Review</button>
			<span className='material-symbols-outlined'>account_circle</span>
		</section>
	);
}