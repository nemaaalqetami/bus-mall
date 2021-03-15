'use straict';

let img =['bag','banana','bathroom','boots',
'breakfast','bubblegum','chair','cthulhu',
'dog-duck','dragon','pen','pet-sweep',
'scissors','shark','sweep','tauntaun',
'unicorn','usb','water-can','wine-glass',];

let ext =['jpg','jpg','jpg','jpg',
'jpg','jpg','jpg','jpg',
'jpg','jpg','jpg','jpg',
'jpg','jpg','png','jpg',
'jpg','gif','jpg','jpg',];


// let img =['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg',
// 'breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg',
// 'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg',
// 'scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg',
// 'unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg',];
let arr =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let nameProduct = ['','','','','','','','','','','','','','','','','','','','','','','',''];

const main = document.getElementById('main');
let button = document.createElement('button');
let UnorderList = document.createElement('ul');
let item ;
const section = document.getElementById('productSection');
const firstImage = document.getElementById('firstimage');
const secondtImage = document.getElementById('secondimage');
const thirdImage = document.getElementById('thirdimage');


function Product(name,imgExt)
{
    this.name = name;
    this.views = 0;
    this.count =0; 
    this.path = `./assets/${name}.${imgExt}`;
    this.vots =0;
    Product.all.push(this);
}
Product.all=[];

for (let i=0;i<img.length;i++){
    new Product(img[i],ext[i]);
    
}

function render(){
    const firstIndex = randomNumber(0,Product.all.length-1) ;
    const firstRandomProduct = Product.all[firstIndex];
    firstImage.src= firstRandomProduct.path; 
     firstImage.title = firstRandomProduct.name;
     firstImage.alt = firstRandomProduct.name;



     const secondIndex = randomNumber(0,Product.all.length-1) ;
   
     const secondRandomProduct = Product.all[secondIndex];
       secondtImage.src = secondRandomProduct.path; 
      secondtImage.title = secondRandomProduct.name;
      secondtImage.alt = secondRandomProduct.name;

    const thirdIndex = randomNumber(0,Product.all.length-1) ;
    const thirdRandomProduct= Product.all[thirdIndex];
    thirdImage.src = thirdRandomProduct.path;
    thirdImage.alt = thirdRandomProduct.name;
    thirdImage.title = thirdRandomProduct.name;

}

section.addEventListener('click',function(event){
    
    
         
         
    if(event.target.id!=='productSection'){
        
        for(let i = 0; i<Product.all.length;i++){
             Product.all[i].count++;
            if(Product.all[i].name === event.target.title){
           Product.all[i].vots++ ;
            Product.all[i].views++;
             arr[i]=Product.all[i].views
                    nameProduct[i]= event.target.title
          
             if(Product.all[i].count === 25){ 
               
                 button.classList.add('btn');
                 button.textContent='View Result';
                 main.appendChild(button);
               
                 document.querySelector('.btn').addEventListener('click',getItem) ;


          }
           
        
        }
       
            }
             render();
   
        } 
        
 
 
    }) 

 main.appendChild(UnorderList);
function randomNumber(min,max){
   
    
  return Math.floor(Math.random() * (max - min + 1 )+ min);
}


function getItem(){
 
                          
    for(let i = 0; i < nameProduct.length-5 ; i++){
    
        item = document.createElement('li');
  
        item.innerHTML = nameProduct [i]+ " has " + arr[i]+ " views";  
        UnorderList.appendChild(item);
    
 
   
        }
        

main.appendChild(UnorderList)
    }


render();


  
    
     
    