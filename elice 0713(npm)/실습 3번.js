//counter.js
let count = 0;

module.exports = () => {
    count += 1;
    return count; 
};


//index.js

const counter = require('./counter');

for (let i = 0; i < 10; i++) {
    console.log(counter());
}