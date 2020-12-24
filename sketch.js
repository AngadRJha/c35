var hypnoticBall;
var database;
var position;

function setup(){
    createCanvas(500,500);

    //linking to the database-Namespacing
    database = firebase.database();

    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    
    var dbDataRef = database.ref("/");
    dbDataRef.on("value",readD);
    var hypnoticBallPosition = database.ref("ball/position");
    //on is the listener = used to read data, or when data is added/edited
    hypnoticBallPosition.on("value",readPosition,showError);


}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    }
   
   
    drawSprites();
}

function writePosition(x,y){
    var dbRef = database.ref("ball/position");
    dbRef.set({
        "x": position.x + x,
        "y": position.y + y
    })
}

function readPosition(data){
    position = data.val();
    console.log(data.val())
    hypnoticBall.x =  position.x
    hypnoticBall.y =  position.y
}

function showError(){
    console.log("no data")
}
function readD(data){
    sss= data.val()
    console.log(sss)
}