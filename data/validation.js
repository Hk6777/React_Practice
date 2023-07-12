const { ObjectId } = require('mongodb')

module.exports = {

    checkId(id) {
        if (id) throw 'invalid Id!!';
        if (typeof id !== 'string') throw 'Id is not in string form'
        id = id.trim()
        if (id.length === 0) throw 'Id can not be empty'
        if (!ObjectId.isValid(id)) throw 'Invalid Object Id'
        return id
    },
    checkString(str, varName) {

        if (!str) throw `You must supply a ${varName}`
        if (typeof str !== 'string') throw `${varName} must be a string value`
        str = str.trim()
        if (str.length === 0) throw `${varName} cannot be a empty string`
        if (str.length < 4) throw `Please enter morthan 4 character ${varName}`
        if(!isNaN(str)) throw `${varName} is not a valid string`

        return str

    },
    checkArrayString() {

    }

}