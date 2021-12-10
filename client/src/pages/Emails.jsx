import React, { useMemo, useEffect, useState } from 'react'
import axios from 'axios'
import DataFilter from '../components/UI/DataFilter'
import MailList from '../components/UI/MailList'
import Input from '../components/UI/input/Input'
import Loader from '../components/UI/Loader/Loader'
import '../styles/Emails.css'
import { getPageCount } from '../utils/pages'
import Pagination from '../components/UI/pagination/Pagination'
import Select from '../components/UI/select/Select'
import Filter from '../components/UI/Filter'
import Button from '../components/UI/button/Button'
import { getUniqueDomainNames } from '../utils/uniqueDomainNames'

function Emails() {
	const [isEmailLoading, setEmailLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [emailList, setEmailList] = useState([])
	const [filter, setFilter] = useState({ sort: 'date', filter: '', query: '' })
	const [totalPages, setTotalPages] = useState(0)
	const [totalCount, setTotalCount] = useState('')
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)

	useEffect(() => {
		getMails()
		getMailsLimit()
	}, [page, limit])

	const getMails = async () => {
		try {
			setEmailLoading(true)
			const url = 'http://localhost:5000/api/get'
			setTimeout(async () => {
				const response = await axios.get(url)
				setEmailLoading(false)
				const totalCount = response.headers['x-total-count']
				setTotalPages(getPageCount(totalCount, limit))
				setTotalCount(totalCount)
			}, 500)
		} catch (err) {
			console.log(err, 'Error 1: get')
		}
	}

	const getMailsLimit = async () => {
		try {
			setEmailLoading(true)
			const url = 'http://localhost:5000/api/get'
			setTimeout(async () => {
				const response = await axios.get(url, {
					params: {
						_limit: limit,
						_page: page,
					},
				})
				setEmailList(response.data)
				setEmailLoading(false)
			}, 500)
		} catch (err) {
			console.log(err, 'Error 2: get')
		}
	}

	const deleteMail = id => {
		axios.delete(`http://localhost:5000/api/delete/${id}`)
	}

	const refreshTheList = () => {
		getMails()
	}

	const emailHandler = e => {
		setEmail(e.target.value)
	}

	const createSubscriber = async e => {
		e.preventDefault()
		try {
			await axios.post(`http://localhost:5000/api/post`, {
				email: email,
				date: new Date(Date.now()),
			})
		} catch (err) {
			alert(err.response.data.message)
			console.log(`${err.response.data.message}.`, 'Error 2: post')
		}
	}

	const handleClick = async e => {
		createSubscriber(e)
		setEmail('')
	}

	const sortedData = useMemo(() => {
		// console.log('Worked: sortedData.')
		if (filter.sort) {
			return [...emailList].sort((a, b) =>
				a[filter.sort].localeCompare(b[filter.sort])
			)
		}
		return emailList
	}, [filter.sort, emailList])

	const sortedAndFilteredData = useMemo(() => {
		// console.log('Worked: sortedAndFilteredData.')
		if (filter.filter) {
			return sortedData.filter(data =>
				data.email.toLowerCase().includes(filter.filter.toLowerCase())
			)
		}
		return emailList
	}, [emailList, sortedData, filter.filter])

	const sortedFilteredAndSearchedData = useMemo(() => {
		// console.log('Worked: sortedFilteredAndSearchedData.')
		return sortedAndFilteredData.filter(data =>
			data.email.toLowerCase().includes(filter.query.toLowerCase())
		)
	}, [filter.query, sortedData, sortedAndFilteredData])

	return (
		<div className='mailList'>
			<h1>Email Total Count: {totalCount}</h1>
			<Button onClick={refreshTheList}>Refresh the list</Button>
			<br />
			<br />
			<Input
				value={email}
				onChange={e => emailHandler(e)}
				name='email'
				type='text'
				placeholder='Type your email address here...'
			/>
			<Button onClick={e => handleClick(e)}>
				<div className='fa fa-long-arrow-right'></div>
			</Button>
			<hr style={{ margin: '15px 0' }} />
			<DataFilter filter={filter} setFilter={setFilter} />
			<Select
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='Element q-ty per page'
				options={[
					{ value: 10, name: '10' },
					{ value: 25, name: '25' },
					{ value: totalCount, name: 'Show All' },
				]}
			/>
			<Filter
				filter={filter}
				setFilter={setFilter}
				options={getUniqueDomainNames(emailList)}
			/>
			{isEmailLoading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '50px',
					}}>
					<Loader />
				</div>
			) : (
				<MailList
					sortedAndSearchedData={sortedFilteredAndSearchedData}
					deleteMail={deleteMail}
				/>
			)}
			<Pagination
				totalPages={totalPages}
				page={page}
				setPage={setPage}
				totalCount={totalCount}
			/>
		</div>
	)
}

export default Emails
