
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var sur_time;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
   createCanvas(400,400);    
   
   monkey=createSprite(50,300,5,5);
   monkey.addAnimation("running",monkey_running);
   //edges = createEdgeSprites();
   monkey.scale=0.1;
  
   ground=createSprite(200,330,900,5);

  
   sur_time=0;
  
   obstacleGroup = new Group();
   foodGroup = new Group();
  
   monkey.setCollider("circle",0,20,250);
   //monkey.debug = true;
  
}


function draw() {
   background("white");
   text("Survival Time: "+ sur_time,150,50);
 
  //stop trex from falling down
    monkey.collide(ground);
  
   
   if(gameState === PLAY){
        ground.velocityX=-6;
    
        sur_time =Math.ceil(frameCount/20);
     
        if(keyDown("space")&&monkey.y >= 100){
             monkey.velocityY = -10;
        }
     
       monkey.velocityY =monkey.velocityY + 0.8;
     
       if(ground.x<0){
            ground.x=ground.width/2;
       }
     
          
      food(); 
      obstacles(); 
     
       if(monkey.isTouching(obstacleGroup)) 
       {
              gameState=END;
       }
        
   }
  
   else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    monkey.velocityX = 0; 
     
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
    gameState=PLAY;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
     
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
     
    sur_time=0;
  }

  
   drawSprites();
  
}
function food()
{
   if(frameCount%80===0){
   banana=createSprite(600,100,15,15);
   banana.addImage("banana",bananaImage);
   banana.velocityX=-5;
   banana.scale=0.1;
   banana.y=Math.round(random(120,200));
   banana.lifetime=200;
   foodGroup.add(banana);
   }
   
}

function obstacles()
{
     if(frameCount%300===0)
    {
      obstacle=createSprite(600,310,15,15);
      obstacle.addImage("obstacle",obstacleImage);
      obstacle.velocityX=-6;
      obstacle.x=Math.round(random(120,400));
      obstacle.scale=0.1;
      obstacleGroup.add(obstacle);
    }
    
    
}




