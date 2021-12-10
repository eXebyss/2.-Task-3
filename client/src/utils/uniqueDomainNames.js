export const getUniqueDomainNames = emailList => {
	let emails = []

	emailList.map(e => {
		emails.push(e.email)
	})

	let domainNames = []

	emails.map(email => {
		domainNames.push(email.substring(email.lastIndexOf('@')))
	})

	let uniqueDomainNames = [...new Set(domainNames)]

	let options = []

	uniqueDomainNames.map(e => {
		options.push({ value: e, name: e })
	})

    return options
}
