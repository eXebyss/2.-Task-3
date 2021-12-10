import React from 'react'
import Input from './input/Input'
import Select from './select/Select'

const DataFilter = ({ filter, setFilter }) => {
	return (
		<div>
			<Input
				placeholder='Search...'
				value={filter.query}
				onChange={e => setFilter({ ...filter, query: e.target.value })}
			/>
			<Select
				value={filter.sort}
				onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
				defaultValue='Sort by'
				options={[
					{ value: 'email', name: 'Email' },
					{ value: 'date', name: 'Date' },
				]}
			/>
		</div>
	)
}

export default DataFilter
