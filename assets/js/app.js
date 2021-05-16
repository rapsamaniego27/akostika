class Data{
 constructor(){
  
 }

 //Methods
 async fetchSiblings(){
    let api = '../data/siblings.json';
    let response = await fetch(api);
    let data = await response.json();
 
    return data;
  }
}

/* Run this for testing API fetching */

/* const data = new Data();

data.fetchSiblings()
    .then(data => {
     console.log(data);
    })
    .catch(err => console.log(err)); */
console.log('sample file from Classes folder');

console.log('component file from components folder');

let pattern;

/* Regular expression pattern */
pattern = /hello/i;

//String to match
const str = 'Hello';

//Log Results
const result = pattern.exec(str);
console.log(result);


/* Function to test if the str passes the pattern. */
function patternTest(pattern, str){
 if(pattern.test(str)){
  console.log(`${str} matches ${pattern.source}`);
 }else{
  console.log(`${str} does NOT match ${pattern.source}`);
 }
}

patternTest(pattern, str);
console.log('Nav file from misc folder');

console.log('Slider file from misc folder');
