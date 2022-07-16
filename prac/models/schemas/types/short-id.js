const {nanoid} = require('nanoid');
// import nanoid from "nanoid";
const shortId = {
    type: String,
    default: () => {
        return nanoid();
    },
    require: true,
    index: true,
}
module.exports = shortId;