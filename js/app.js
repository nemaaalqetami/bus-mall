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
let votes =[];
let nameProduct = [];
let allViews = [];

const main = document.getElementById('main');
let button = document.createElement('button');
button.setAttribute('class','button');
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
    this.votes =0;
    Product.all.push(this);
   
    
}
Product.all=[];
Product.lastShown=[];
for (let i=0;i<img.length;i++){
    new Product(img[i],ext[i]);
    
}
  



function render(){

 let firstIndex = randomNumber(0,Product.all.length-1) ;
    let secondIndex = randomNumber(0,Product.all.length-1) ;
    let thirdIndex = randomNumber(0,Product.all.length-1) ;

while(firstIndex===secondIndex||firstIndex===thirdIndex||secondIndex===thirdIndex
    ||  Product.lastShown.includes(firstIndex)|| Product.lastShown.includes(secondIndex)|| Product.lastShown.includes(thirdIndex) ){
       firstIndex = randomNumber(0,Product.all.length-1) ;
       secondIndex = randomNumber(0,Product.all.length-1) ;
       thirdIndex = randomNumber(0,Product.all.length-1) ;
       }

       
  
    

    const firstRandomProduct = Product.all[firstIndex];
    firstImage.src= firstRandomProduct.path; 
     firstImage.title = firstRandomProduct.name;
     firstImage.alt = firstRandomProduct.name;
     Product.lastShown[0]=firstIndex;
     firstRandomProduct.views+= 1;
  
   
     console.log( Product.all[firstIndex].name+Product.all[firstIndex].views);

    const secondRandomProduct = Product.all[secondIndex];
       secondtImage.src = secondRandomProduct.path; 
      secondtImage.title = secondRandomProduct.name;
      secondtImage.alt = secondRandomProduct.name;
     Product.lastShown[1]= secondIndex;
     secondRandomProduct.views+= 1;

 
 console.log( Product.all[secondIndex].name +Product.all[secondIndex].views);


    const thirdRandomProduct= Product.all[thirdIndex];
    thirdImage.src = thirdRandomProduct.path;
    thirdImage.alt = thirdRandomProduct.name;
    thirdImage.title = thirdRandomProduct.name;
     Product.lastShown[2]=thirdIndex;
     thirdRandomProduct.views+= 1;
       

  
     console.log(  Product.all[thirdIndex].name+Product.all[thirdIndex].views);

 

   
}

section.addEventListener('click',getData);
    
    function getData(event){
      
        if(event.target.id!=='productSection'){
       
        for(let i = 0; i<Product.all.length;i++){
            Product.all[i].count++;
            
            if(Product.all[i].name === event.target.title){
        
          Product.all[i].votes++;  
         
   
             votes.push(Product.all[i].votes);
          
            nameProduct.push(event.target.title);
             
          
             if(Product.all[i].count === 25){ 
                 section.removeEventListener('click',getData);
                
                 button.classList.add('btn');
                 button.textContent='View Result';
                 main.appendChild(button);
               
                 document.querySelector('.btn').addEventListener('click',getList) ;
                

                 for(let i = 0; i< Product.all.length; i++){
                  allViews.push(Product.all[i].views);
                 }
                 localStorage.setItem('nemaa',JSON.stringify(Product.all));
                createChart();


          }
      
      
        }
       
            }
           
             render();
         
        } 
        

 
    }

   
         
         
    

function randomNumber(min,max){
   
    
  return Math.floor(Math.random() * (max - min + 1 )+ min);
}


function getList(){
  
  // getListItem();

    for(let i = 0; i< Product.all.length; i++){ 
      
     Product.all[i].count=0
  

        item = document.createElement('li');
       
        
        item = document.createElement('li');
        item.innerText = nameProduct [i]+ " has " + votes[i]+ " Votes, " + allViews[i] + " views";  
        UnorderList.appendChild(item);
        item.setAttribute('class','li');
           
   
        }
      // section.addEventListener('click',getData);
 
main.appendChild(UnorderList);


    }

    function createChart(){
        let context = document.getElementById('myChart').getContext('2d');
    
      let name = [];
      let votes =[];
    
        for(let i=0;i<Product.all.length;i++){
            name.push(Product.all[i].name);

           votes.push(Product.all[i].votes);
         
        }
      
        let chartObject={
         
          type: 'horizontalBar',
        
          data: {
              labels:name,
              datasets: [{
                  label: 'Products votes results',
                  backgroundColor: 'rgb(0, 138, 138)',
                  
                  data: votes
              },
              {
                label : 'Products views results',
                backgroundColor: 'rgb(37, 214, 214)',
                data : allViews
              }

            ]
        
          },
      
         
          options: {
           
            responsive: true,
            tooltips: {
                mode: 'single',
            },
            scales: {
              xAxes: [{ 
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontColor: "#25af6af3", // this here
                  },
            }
            ],

            yAxes: [{
                ticks: {
                    fontColor: "#25af6af3", // this here
                  },
               
                  gridLines: {
                      display: false,
                  },
               
            }],
            
          }
         
          }
      }
        let chart = new Chart(context,chartObject);
        
      }


       function getListItem(){
        let data = localStorage.getItem('nemaa');
        data  =JSON.parse(data);
        return data;
       }

render();


  
    
     
    