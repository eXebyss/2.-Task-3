import React from 'react'

const Filter = ({ filter, setFilter, options }) => {
	return (
		<div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
			{options.map(option => (
				<div key={option.name}>
					{' '}
					<input
						type='radio'
						id={option.name}
						name='filter'
						value={option.value}
						onChange={selectedSort =>
							setFilter({ ...filter, filter: selectedSort.target.value })
						}
					/>
					<label htmlFor={option.name}>{option.name}</label>
				</div>
			))}
		</div>
	)
}

export default Filter
