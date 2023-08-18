//generics
// example 1
function logAnything<T>(arg : T) : T{
  return arg;
}
logAnything(1);
logAnything('1');
logAnything([1]);
logAnything({age:1});

// example 2
interface HasAge{
  age:number;
}
const peoples :HasAge[]=[ {age:30}, {age:40}, {age:50} ];
// function getOldest(people:HasAge[]):HasAge{
//   return people.sort((a,b)=>b.age-a.age)[0];
// }
getOldest(peoples);
//this function will return the 0th index object after sorting. which is {age:50}.
// I can access the property   getOldest(peoples).age from the above.

interface Player{
  age:number;
  name:string;
}
const players : Player[]=[ {age:30,name:'hari'}, {age:40,name:'prasad'}, {age:50,name:'sammeta'} ];
getOldest(players);
//this function will return the 0th index object after sorting. which is {age:50,name:'sammeta'}
// I can access the property getOldest(players).age from the above.
// but I can,t access the property   getOldest(players).name from the above ,because the return type is function getOldest(people:HasAge[]):HasAge{}. HasAge is the return type of function which does not have name property.
//I can not acscess getOldest(players).name .
// type assertion can be used here to access the name property.

// type assertion - 
// const p = getOldest(players) as Player;
// we are forcefully assigining type Player to p
// now we can access p.name, which not recommended.

//so here we will try to make it generic

// function getOldest<T>(people:T[]):T{
//   return people.sort((a,b)=>b.age-a.age)[0];
// }

// here we have error on b.age and a.age.  Property 'age' does not exist on type 'T'
// we extend HasAge interface for T. <T extends HasAge>

function getOldest<T extends HasAge>(people:T[]):T{
  return people.sort((a,b)=>b.age-a.age)[0];
}

// now we have made this function generic and we can access
// getOldest(peoples).age  

// getOldest(players).age
// getOldest(players).name

// example 3

interface IPost{
  title:string;
  id:number;
  description:string;
}

//asycn function will always return a Promise
const fetchPostsData=async (path:string) : Promise<IPost[]>=>{
  const response = await fetch(`http://example.com${path}`);
  return response.json();
}

(async ()=>{
  const posts = await fetchPostsData('/posts');
  // I can access all the three properties of IPost here.
  //posts[0].title  posts[0].id    posts[0].description 
})

// now I will create another function which will fetch users data.
interface IUser{
  name:string;
  id:number;
  age:number;
}
const fetchUsersData=async (path:string) : Promise<IUser[]>=>{
  const response = await fetch(`http://example.com${path}`);
  return response.json();
}
// on the above function only return type of promise is changed, all the other code is same.
//  Promise<IUser[]>

(async ()=>{
  const users = await fetchPostsData('/posts');
  // I can access all the three properties of IUser here.
  //users[0].name  posts[0].id    posts[0].age 
})

// but the problem here is we have repeated the same function. fetchUsersData() , fetchPostsData
// i will create a common generic function 

const fetchdata = async <T>(path:string) :Promise<T[]> => {
  const response = await fetch(`http://example.com${path}`);
  return response.json();
}
(async ()=>{
  const users = await fetchdata<IUser>('/users');
  // I can access all the three properties of IUser here.
  //users[0].name  posts[0].id    posts[0].age 

  const posts = await fetchdata<IPost>('/posts');
    // I can access all the three properties of IPost here.
  //posts[0].title  posts[0].id    posts[0].description 
})

// duck typing or structural typing
interface ICredential{
  username:string;
  password:string;
}
function login(credential:ICredential):boolean{
  console.log(credential);
  return true;
}

const user = {
  username:'hari',
  password:'123',
  isAdmin:true
}
login(user);

// when I call a finction login(credential:ICredential) which accepts a parameter of type ICredential.
//  whenIi an pass an object user which has all the properties of ICredential interface to it, the login function assumes that user is also of same type ICredential. this assumption is called duck typing.

//-----------------------------------------------------------------------------------------------

interface IAuth {
  userName:string;
  login(userName:string,password:string):void;
}

const Auth = {
  userName:'hari',
  login(userName:string,password:string){
  }
}

//

let d: number[] = [];

// d.push('a');
d.push(1);
// d.push(true);