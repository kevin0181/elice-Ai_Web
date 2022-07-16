const module1 = require('./module1');
const module2 = require('./module2');
const data = require('./data');
const funcModule = require('./funcModule');

console.log(
    module1,
    module2,
    data.name,
    /* funcModule 사용 */
    funcModule()
);