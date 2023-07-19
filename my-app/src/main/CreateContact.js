import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeFrom from 'form-serialize'

class CreateContact extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeFrom(e.target, { hash: true })

        if (this.props.onCreateContact) {
            this.props.onCreateContact(values)
        }
    }
    render() {
        return (
            <div>
                <Link className='close-create-contact' to='/'>Close</Link>
                <from onSubmit={this.handleSubmit} className='create-contact-form'>
                    <ImageInput className='create-contact-avatar-input' name='avatarUrl' maxHeight={64}></ImageInput>
                    <div className='create-contact-detail'>
                        <input type='text' name='name' placeholder='Name'></input>
                        <input type='text' name='handle' placeholder='Handle'></input>
                        <button>Add Contact</button>
                    </div>

                </from>
            </div>
        )
    }
}
export default CreateContact