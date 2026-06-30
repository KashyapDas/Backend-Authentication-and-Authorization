async function userData(){
    const result = await fetch("https://jsonplaceholder.typicode.com/todos");
    const res = await result.json();
    return res;
}


module.exports = userData;