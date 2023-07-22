const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

let token = localStorage.token
if (!token)
    token = localStorage.token = Math.rendom().toString(36).substr(-8)

const header = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAll = () => {
    fetch(`${api}/contacts`, { header })
        .then(res => res.json())
        .then(data => data.contacts)
}

export const remove = (contact) => {
    fetch(`${api}/contacts/${contact.id}`, { methos: 'DELETE', header })
        .then(res => res.json())
        .then(data => data.contact)
}

export const create = (body) => {
    fetch(`${api}/contacts`, {
        methos: 'POST',
        header: {
            ...header,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
}