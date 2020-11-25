class Milk {
    constructor(x,y){
       this.image = loadImage("images/Food Stock.png");
       this.foodstock = foodStock;
       this.x = x;
       this.y = y;
       
    } 
    getFoodstocks(){
        this.foodStock = database.ref('FOOD');
        this.foodStock.on("value",(data)=>{
        foodstock = data.val();
        
        })
      }
    
      updateFood(count){
        database.ref('/').update({
          FOOD: count
        });
      }
    
       
     
     

      
    deduct(){

    }
   // MilkBottle = createSprite()
   display(){
     
     var x = 80;
     var y = 100;
    
     image(this.image,this.x,this.y,70,70);
     if(this.foodStock!=0){
      for (var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x = 80;
          y = y+50;
        }
        image(this.image,x,y,50,50);
        x = x+30;
        console.log("its working great deepu");
      }
     }
    
    

   }
    
}
  
