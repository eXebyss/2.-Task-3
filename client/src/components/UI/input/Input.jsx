import React from 'react'

const Input = ({ placeholder, value, onChange, name, type }) => {
	return (
		<input
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			name={name}
			type={type}
		/>
	)
}

export default Input
