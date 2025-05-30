//  helpers/dbErrorHandler


const getErrorMessage11 = (err) => {
   console.log(err)

}
const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break;
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].messages)
                message = err.errors[errName].message
        }
    }
    return message
}

const getUniqueErrorMessage = (err) =>  {
    let output
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exist'
    } catch (ex) {
        output = 'Unique field already exist'
    }
    return output
}
export default { getErrorMessage }