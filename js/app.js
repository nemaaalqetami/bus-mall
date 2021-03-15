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
let arr =[];

let nameProduct = [];

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
    this.count =25; 
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
    let secondtIndex = randomNumber(0,Product.all.length-1) ;
    let thirdIndex = randomNumber(0,Product.all.length-1) ;

while(firstIndex===secondtIndex||firstIndex===thirdIndex||secondtIndex===thirdIndex
    ||  Product.lastShown.includes(firstIndex)|| Product.lastShown.includes(secondtIndex)|| Product.lastShown.includes(thirdIndex) ){
       firstIndex = randomNumber(0,Product.all.length-1) ;
       secondtIndex = randomNumber(0,Product.all.length-1) ;
       thirdIndex = randomNumber(0,Product.all.length-1) ;
       }

       
    
    const firstRandomProduct = Product.all[firstIndex];
    firstImage.src= firstRandomProduct.path; 
     firstImage.title = firstRandomProduct.name;
     firstImage.alt = firstRandomProduct.name;
     Product.lastShown[0]=firstIndex;

    
    const secondRandomProduct = Product.all[secondtIndex];
       secondtImage.src = secondRandomProduct.path; 
      secondtImage.title = secondRandomProduct.name;
      secondtImage.alt = secondRandomProduct.name;
     Product.lastShown[1]= secondtIndex;
    
    const thirdRandomProduct= Product.all[thirdIndex];
    thirdImage.src = thirdRandomProduct.path;
    thirdImage.alt = thirdRandomProduct.name;
    thirdImage.title = thirdRandomProduct.name;
     Product.lastShown[2]=thirdIndex;

}

section.addEventListener('click',getData);
    
    function getData(event){
        if(event.target.id!=='productSection'){
        
        for(let i = 0; i<Product.all.length;i++){
             Product.all[i].votes++;
            
            if(Product.all[i].name === event.target.title){
        
          Product.all[i].views++;  
          
       
             arr.push(Product.all[i].views);
          
            nameProduct.push(event.target.title);

          
             if(Product.all[i].count === Product.all[i].votes){ 
                 section.removeEventListener('click',getData);
                 button.classList.add('btn');
                 button.textContent='View Result';
              
                 main.appendChild(button);
               
                 document.querySelector('.btn').addEventListener('click',getItem) ;
                createChart();


          }
         console.log(event.target.title+" "+Product.all[i].views);
      
        }
       
            }
       
             render();
         
        } 
        
 
 
    }

   
         
         
    
 main.appendChild(UnorderList);
function randomNumber(min,max){
   
    
  return Math.floor(Math.random() * (max - min + 1 )+ min);
}


function getItem(){
 
                          
    for(let i = 0; i <25 ; i++){
    
        item = document.createElement('li');
  
        item.innerHTML = nameProduct [i]+ " has " + arr[i]+ " views";  
        UnorderList.appendChild(item);
        item.setAttribute('class','li');
 
   
        }
        

main.appendChild(UnorderList)
    }

    function createChart(){
        let context = document.getElementById('myChart').getContext('2d');
    
      let name = [];
      let views =[];
        for(let i=0;i<Product.all.length;i++){
            name.push(Product.all[i].name);

           views.push(Product.all[i].views);
           
        }
      
        let chartObject={
         
          type: 'bar',
        
          data: {
              labels:name,
              datasets: [{
                  label: 'Products views results',
                  backgroundColor: 'rgb(0, 138, 138)',
                  
                  data: views,
              },

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
render();


  
    
     
    