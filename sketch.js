//Create variables here
var database,doggo,dogImg,happyDog,foodS,foodStock;
var lastFed;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodObject=new Food();
  
  doggo=createSprite(250,250);
  doggo.addImage(dogImg)
  doggo.scale=0.2;
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  feed=createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(24, 206, 226);
foodObject.display();
  drawSprites();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
   lastFed=data.val();
  });
 
  //add styles here
textSize(15);
stroke("red");
fill("white")
text("Food Remaining: "+foodS,180,100)

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+lastFed%12+"PM",350,30)
}else if(lastFed===0){
text("last Feed: 12AM",350,30)
}else 
text("last Feed: "+lastFed+"AM",350,30)
}
//Function to read values from DB
function readStock(data){
  foodS=data.val();
}


function feedDog(){
  doggo.addImage(happyDog);
 
 foodObject.updateFoodStock(foodObject.getFoodStock()-1);
 database.ref('/').update({
   Food:foodObject.getFoodStock(),
   FeedTime:hour()
 })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




