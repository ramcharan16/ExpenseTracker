const posts =[
    {title:'post one', body:'this is post one'},
    {title:'post two', body:'this is post two'}


];
function getPosts(){
setTimeout(() =>{
    let output='';
    posts.forEach((post,index)=>{
        output+=`<li>${post.title}</li>`;
    })
    document.body.innerHTML=output;
},1000)
}
function createPost(post){
    return new Promise((resolve,reject)=>{
        setTimeout(() =>{
            posts.push(post);

            const error=false;

            if(!error){
                resolve();
            }else{
                reject('Error:something went wrong');
            }
            
    
        },2000);
    });

    };
   
// //PROMISE ALL
const promise1=Promise.resolve('Hello world');
const promise2=10;
const promise3=new Promise((resolve,reject)=>
setTimeout(resolve,2000,'Goodbye'));
Promise.all([promise1,promise2,promise3]).then(values
    =console.log(values));
