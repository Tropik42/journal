// const obj = {
//     a: 1,
//     b: "String",
//     c: true
// };

// const {a, ...oth} = obj

// console.log(a, oth)

const now = new Date();
console.log(now)

const now1 = now.getMonth()

console.log(now1)

const data = `${now.getFullYear()}-${now.getDate()}-${now.getMonth()+1} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds().toString().length > 1 ? now.getSeconds() : '0' + now.getSeconds()}`
console.log(data)

