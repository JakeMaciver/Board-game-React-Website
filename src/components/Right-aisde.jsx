export const RightAside = ({
	sortItems,
	setSortItems,
	orderItems,
	setOrderItems,
}) => {
	const handleCheck = (event) => {
		const itemId = parseInt(event.target.value);
		let array = [];
		if (itemId > 3) array = orderItems;
		else array = sortItems;
		const updatedItems = array.map((item) =>
			item.id === itemId
				? { ...item, checked: event.target.checked }
				: { ...item, disabled: !item.disabled }
		);
		if (itemId > 3) setOrderItems(updatedItems);
		else setSortItems(updatedItems);
	};

	return (
		<ul className='aside-bar'>
			<p className='aside-bar-title'>Sort by</p>
			{sortItems.map((item) => (
				<li key={item.id} className='aside-bar-list-item'>
					<label>
						<input
							type='checkbox'
							value={item.id}
							checked={item.checked}
							onChange={handleCheck}
							disabled={item.disabled}
						/>
						{item.label}
					</label>
				</li>
			))}
			<p className='aside-bar-title'>Order by</p>
			{orderItems.map((item) => (
				<li key={item.id} className='aside-bar-list-item'>
					<label>
						<input
							type='checkbox'
							value={item.id}
							checked={item.checked}
							onChange={handleCheck}
							disabled={item.disabled}
						/>
						{item.label}
					</label>
				</li>
			))}
		</ul>
	);
};
