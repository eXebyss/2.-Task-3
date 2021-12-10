import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../src/styles/App.css'
import union from '../images/Union.png'
import success from '../images/ic_success.png'
import Button from '../components/UI/button/Button'

function Main() {
	const [email, setEmail] = useState('')
	const [checkbox, setCheckbox] = useState(false)
	const [emailDirty, setEmailDirty] = useState(false)
	const [emailError, setEmailError] = useState('Email address is required')
	const [checkError, setCheckError] = useState(true)
	const [formValid1, setFormValid1] = useState(false)
	const [formValid2, setFormValid2] = useState(false)

	useEffect(() => {
		if (emailError || checkError) {
			setFormValid1(false)
		} else {
			setFormValid1(true)
		}
	}, [emailError, checkError])

	const emailHandler = e => {
		setEmail(e.target.value)
		const re1 =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const re2 = /\.co$/
		if (!re1.test(String(e.target.value).toLowerCase())) {
			setEmailError('Please provide a valid e-mail address')
		} else if (re2.test(String(e.target.value).toLowerCase())) {
			setEmailError('We are not accepting subscriptions from Colombia emails')
		} else {
			setEmailError('')
		}
	}

	const checkboxHandler = e => {
		setCheckbox(!checkbox)
		setCheckError(!checkError)
	}

	const blurHandler = e => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			default:
				setEmailDirty(true)
				break
		}
	}

	const createSubscriber = async e => {
		e.preventDefault()		
		await axios.post(`${API_URL}api/post`, {
			email: email,
			date: new Date(Date.now()),
		})
	}

	const handleClick = e => {
		createSubscriber(e)
		setEmail('')
		setFormValid2(true)
	}

	return (
		<div className='grid-container'>
			<div className='grid-item-1'>
				<header>
					<div className='top-bar'>
						<img src={union} alt='Union' />
						<h3>pineapple.</h3>
						<ul className='menu'>
							<li>
								<a href='https://magebit.com/' title='About'>
									About
								</a>
							</li>
							<li>
								<a href='https://magebit.com/' title='How it works'>
									How it works
								</a>
							</li>
							<li>
								<a href='https://magebit.com/' title='Contact'>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</header>
				<section>
					{formValid2 ? (
						<div className='success'>
							<img src={success} alt='Success' />
						</div>
					) : (
						''
					)}
					<div
						className='heading'
						style={
							formValid2 ? { marginTop: '3.5%' } : { marginTop: '34.4118%' }
						}>
						{formValid2 ? (
							<h1>Thanks for subscribing!</h1>
						) : (
							<h1>Subscribe to newsletter</h1>
						)}
					</div>
					<div className='subheading'>
						{formValid2 ? (
							<h2>
								You have successfully subscribed to our email listing. Check
								your email for the discount code.
							</h2>
						) : (
							<h2>
								Subscribe to our newsletter and get 10% discount on pineapple
								glasses.
							</h2>
						)}
					</div>
					{!formValid2 ? (
						<div className='input'>
							<form>
								{emailDirty && emailError && (
									<div style={{ color: 'red' }}>{emailError}</div>
								)}
								<input
									value={email}
									onChange={e => emailHandler(e)}
									onBlur={e => blurHandler(e)}
									name='email'
									type='text'
									placeholder='Type your email address here...'
								/>
								<Button disabled={!formValid1} onClick={e => handleClick(e)}>
									<div className='fa fa-long-arrow-right'></div>
								</Button>
							</form>
						</div>
					) : (
						''
					)}
					{!formValid2 ? (
						<div className='tos'>
							{!checkbox && (
								<div style={{ color: 'red' }}>
									You must accept the terms and conditions
								</div>
							)}
							<label className='container'>
								I agree{' '}
								<span>
									<a href='https://magebit.com/' title='Subscribe'>
										to terms of service
									</a>
								</span>
								<input
									value={checkbox}
									onChange={e => checkboxHandler(e)}
									type='checkbox'
								/>
								<span className='checkmark'></span>
							</label>
						</div>
					) : (
						''
					)}
					<div className='line'>
						<hr className='horizontal-line' />
					</div>
				</section>
				<footer>
					<div className='social-icons'>
						<a
							href='https://www.facebook.com/'
							title='Facebook'
							className='fa fa-facebook'></a>
						<a
							href='https://www.instagram.com/'
							title='Instagram'
							className='fa fa-instagram'></a>
						<a
							href='https://twitter.com/'
							title='Twitter'
							className='fa fa-twitter'></a>
						<a
							href='https://www.youtube.com/'
							title='Youtube'
							className='fa fa-youtube-play'></a>
					</div>
				</footer>
			</div>
			<div className='grid-item-2'></div>
		</div>
	)
}

export default Main
