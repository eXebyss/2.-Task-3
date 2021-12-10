import React from 'react'
import cl from '../../styles/MailList.module.css'

function MailList({ sortedAndSearchedData, deleteMail }) {
	if (!sortedAndSearchedData.length) {
		return (
			<h1 style={{ textAlign: 'center' }}>
				No emails found by your search query!
			</h1>
		)
	}

	return sortedAndSearchedData.map(data => {
		const isoDate = new Date(data.date)
		const date = isoDate.toLocaleString('lv-LV', {
			localeMatcher: 'best fit',
			hour12: false,
			formatMatcher: 'best fit',
		})
		return (
			<div key={data.id} className={cl.mailCard}>
				<p>
					{data.id}. Email: {data.email}. Date: {date}
				</p>
				<button onClick={() => deleteMail(data.id)}>Delete</button>
			</div>
		)
	})
}

export default MailList
