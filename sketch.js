var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var game, gameImage;
var hit, hitImage;

function preload() {

  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")
  monkey_hit = loadAnimation("monkeyhit.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameImage = loadImage("game over.png")
}



function setup() {
  createCanvas(400, 400);


  var survivalTime = 0;

  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("hit", monkey_hit)
  // monkey.addImage(bananaImage)
  monkey.scale = 0.1

  ground = createSprite(400, 350, 900, 50);
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  monkey.setCollider("circle", 0, 0, 0);
  monkey.debug = false
  score = -3
}

function draw() {

  background(255);
  
  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.5;

  monkey.collide(ground);
  spawnFood();
  spawnObstacles();

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  if (obstaclesGroup.isTouching(monkey)) {
    monkey.velocityY = 0;
    //These are to stop the obstacles and the bananas
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    //These are to freeze the obstacles and the bananas so that       they don't disappear after a certain time
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    //To show that that you have lost(This is from the fruit         ninja game over)
    game = createSprite(200, 200, 5, 5)
    game.addImage(gameImage)
    //this is to show that the monkey was hit(i custom made it       from the avaliable image which i snipped it from the image)
    monkey.changeAnimation("hit", monkey_hit)
    monkey.scale = 0.8
  } else {
    //For the score to continue if 
    score = score + Math.round(1);
    survivalTime = Math.ceil(frameCount / frameRate())
  }

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100, 50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.08;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 325, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}