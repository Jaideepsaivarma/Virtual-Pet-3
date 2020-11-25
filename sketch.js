//Creating global scopes....
var dog,happyDog;
var database;
var foodS,foodStock;

var bottle,foodObj;
var feedThePet,addFood;
var fedTime,lastFed;

//Creating Variables for Img....
var background_img,milk_img;
var BedRoom_img,Bathroom_img,Garden_img;
var dog_img,happydog_img;

//Creating GameStates....
var gameState = Hungry;
var Hungry = 1;
var Playing = 2;
var Bathing = 3;
var sleeping = 4;


function preload()
{
  dog_img = loadImage("dogImg.png");
  happydog_img = loadImage("dogImg1.png");
  background_img = loadImage("Background 1.jpg");
  milk_img = loadImage("Milk.png") ;
  BedRoom_img = loadImage("Bed Room.png");
  Garden_img = loadImage("Garden.png");
  Bathroom_img = ("WashRoom.png");
}

function setup() {
  //Creating canvas....
  createCanvas(750, 500);
  //declaring the database....
  database = firebase.database();
  //creating the dog....
  dog = createSprite(650,400,10,10);
  dog.addImage(dog_img);
  dog.scale = 0.2;
  //Creating Milk Bottles....
  Milk1 = new Milk(20,200);
  Milk2 = new Milk(80,200);
  Milk3 = new Milk(140,200);
  Milk4 = new Milk(200,200);
  Milk5 = new Milk(260,200);
  Milk6 = new Milk(20,290);
  Milk7 = new Milk(80,290);
  Milk8 = new Milk(140,290);
  Milk9 = new Milk(200,290);
  Milk10 = new Milk(260,290);
  
  //Reading State....
  readState = database.ref('GAMESTATE');
  readState.on("value",function(data){
       gameState = data.val();
       console.log("CONNECTED TO DATABASE");
       console.log("Game State is" + gameState)
  })

}


function draw() {  
    background(background_img)
 // if(gameState!=Hungry)
  //Creating button to feed the pet....
  feedThePet = createButton("Feed The Dog");
  feedThePet.position(850,70);
  feedThePet.mousePressed(feedDog);
  //creating add stocks Button....
  addFood = createButton("Add Food");
  addFood.position(750,70);
  addFood.mousePressed(addStock);
  

    if(gameState!=1){
      addFood.hide();
      feedThePet.hide();
    }
   
  

    //Displaying MilkBottle With food Stock....    
    if(foodS>0){
      Milk1.display();
    }
    if(foodS>1){
      Milk2.display();
    }
    if(foodS>2){
      Milk3.display();
    }
    if(foodS>3){
      Milk4.display();
    }
    if(foodS>4){
      Milk5.display();
    }
    if(foodS>5){
      Milk6.display();
    }
    if(foodS>6){
      Milk7.display();
    }
    if(foodS>7){
      Milk8.display();
    }
    if(foodS>8){
      Milk9.display();
    }
    if(foodS>9){
      Milk10.display();
    }
     //Connceting dataBase to get State....

     //Connecting to fed Time
     fedTime = database.ref('FEEDTIME')  ;
     fedTime.on("value",function(data){
     lastFed = data.val();
     })

      drawSprites();
      //Using Styles....

      fill(255,255,224);
      textSize(20);

         //Displaying Rooms....
         currentTime = hour();
       if(currentTime==(lastFed+1)){
         //Using BackGground....
         background(Garden_img,550,500);
         gameState = Playing;
      } else if(currentTime==(lastFed+2)){
         //Using BackGround....
         background(BedRoom_img,550,500)
         gameState = sleeping;
      } else if(currentTime>(lastFed+2) && currentTime<=lastFed+4){
        //Using BackGround....
         background(Bathroom_img,1000,100)
         gameState = Bathroom;
      } else {
         //Using BackGround....
        //background(background_img);

         gameState = Hungry;
      }

      //Displaying Last Fed....
      if(lastFed>=12){
        text("Last Feed : "+lastFed%12 + "PM",200,30);

      } else if(lastFed===0){
        text("Last Feed : 12 AM",200,30);

      } else{
        text("Last Feed : "+lastFed,200,30);
      }
      
     


      foodStock = database.ref('FOOD');
      foodStock.on("value",readStock);
      

}
function readStock(data){

  //reading the value from the dataBase....
  foodS = data.val();

}
function writeStock(x){

  if(x<=0){
    x = 0;
  } else {
    x = x-1;
  }
  database.ref('/').update({
  FOOD : x
  })

}
function addStock(){
  if(foodS<10){
  foodS++
  dog.addImage(dog_img)
  database.ref('/').update({
    FOOD : foodS
  })
  }
}


function feedDog(){

  dog.addImage(happydog_img);
  
  if(foodS<=0){
    foodS = 0;
  } else {
    foodS = foodS-1;
  }
     database.ref('/').update({
    FOOD : foodS,
    FEEDTIME : hour()
    
  })

}
function  BedRoom(){
  background(BedRoom_img,550,500);
}
function Garden(){
  imageMode(CENTER);
  background(Garden_img,displayWidth/2,displayWidth/2);
}
function Bathroom(){
  background(Bathroom_img,550,500);
}



function getFoodstocks(){
  foodStock = database.ref('FOOD');
  foodStock.on("value",(data)=>{
  foodstock = data.val();
  
  })
}



