/* Définition des variables */

var caillou1, caillou2, caillou3;
var redGamePiece;
var greenGamePiece;
var plante = new Image();
plante.src = 'images/plante.png';
// var redGamePiece = new Image();
// redGamePiece.src ='images/lion.png'; // Image

// var greenGamePiece = new Image();
// greenGamePiece.src ='images/mouton.png'; // Image


function startGame() {
    redGamePiece = new component(380, 10, 1.5, 1.5, 15,'red',5);
    greenGamePiece = new component(90, 120, 1, 1, 15,"green",1000); 
    caillou1 = new component(220, 50, 0, 0, 20,"grey", 5); 
    caillou2 = new component(143, 80, 0, 0, 13,"grey", 5);     
    caillou3 = new component(210, 180, 0, 0, 15,"grey", 5);  

    myGameArea.start();
}


    /* Tous les paramètres de la zone de jeu */

var myGameArea = {
    canvas : document.createElement("canvas"),/* On génère dynamiquement le canvas */

    /* Paramètres du canvas + actions lors du rafraichissement via setInterval */
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 250;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 50);
    },

    /* Paramètres d'effacement du canvas lors de la mise à jour */
    clear : function() {
        this.context.fillStyle = '#daefce';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    },

    /* Définit l'action lors de collisions entre 2 components */
    collision : function() {
        
        var dx = redGamePiece.x - greenGamePiece.x;
        var dy = redGamePiece.y - greenGamePiece.y;
        

        var dxc1 = redGamePiece.x - caillou1.x;
        var dyc1 = redGamePiece.y - caillou1.y;
        var dxc2 = redGamePiece.x - caillou2.x;
        var dyc2 = redGamePiece.y - caillou2.y;
        var dxc3 = redGamePiece.x - caillou3.x;
        var dyc3 = redGamePiece.y - caillou3.y;
        var dxc4 = redGamePiece.x - plante.x;
        var dyc4 = redGamePiece.y - plante.y;
        
        
        
        var dxc1_1 = greenGamePiece.x - caillou1.x;
        var dyc1_1 = greenGamePiece.y - caillou1.y;
        var dxc2_2 = greenGamePiece.x - caillou2.x;
        var dyc2_2 = greenGamePiece.y - caillou2.y;
        var dxc3_3 = greenGamePiece.x - caillou3.x;
        var dyc3_3 = greenGamePiece.y - caillou3.y;

        var distance = Math.sqrt(dx * dx + dy * dy);
        var dist = Math.sqrt(dxc1 * dxc1 + dyc1 * dyc1);
        var dist2 = Math.sqrt(dxc2 * dxc2 + dyc2 * dyc2);
        var dist3 = Math.sqrt(dxc3 * dxc3 + dyc3 * dyc3);
        var dista = Math.sqrt(dxc1_1 * dxc1_1 + dyc1_1 * dyc1_1);
        var dista2 = Math.sqrt(dxc2_2 * dxc2_2 + dyc2_2 * dyc2_2);
        var dista3 = Math.sqrt(dxc3_3 * dxc3_3 + dyc3_3 * dyc3_3);
        
        
        if (distance < redGamePiece.radius + greenGamePiece.radius) {
            greenGamePiece.life -= 5;
            console.log (greenGamePiece.life);
        }
        if (dist < redGamePiece.radius + caillou1.radius) {
            redGamePiece.vy = -redGamePiece.vy;
            redGamePiece.vx = -redGamePiece.vx;
        }
        if (dista < greenGamePiece.radius + caillou1.radius) {
            greenGamePiece.vy = -greenGamePiece.vy;
            greenGamePiece.vx = -greenGamePiece.vx;
        }
        if (dist2 < redGamePiece.radius + caillou2.radius) {
            redGamePiece.vy = -redGamePiece.vy;
            redGamePiece.vx = -redGamePiece.vx;
        }
        if (dista2 < greenGamePiece.radius + caillou2.radius) {
            greenGamePiece.vy = -greenGamePiece.vy;
            greenGamePiece.vx = -greenGamePiece.vx;
        }
        if (dist3 < redGamePiece.radius + caillou3.radius) {
            redGamePiece.vy = -redGamePiece.vy;
            redGamePiece.vx = -redGamePiece.vx;
        }
        if (dista3 < greenGamePiece.radius + caillou3.radius) {
            greenGamePiece.vy = -greenGamePiece.vy;
            greenGamePiece.vx = -greenGamePiece.vx;
        }
        // if (dist4 < redGamePiece.radius + plante.radius) {
        //     redGamePiece.vy = -redGamePiece.vy;
        //     redGamePiece.vx = -redGamePiece.vx;
        // }
        // if (dista4 < greenGamePiece.radius + plante.radius) {
        //     greenGamePiece.vy = -greenGamePiece.vy;
        //     greenGamePiece.vx = -greenGamePiece.vx;
        // }
        
    }
}


/* Classe Components */

function component(x,y,vx,vy,radius,color,life) {

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;    
    this.radius = radius;
    this.color = color;
    this.life = life;
    // this.type = type;
    // if (type == "image") {
    //     this.image = new Image();
    //     this.image.src = color;
    // };

    this.update = function(){
        ctx = myGameArea.context;
        if(this.life > 0){
            ctx.drawImage(plante, 350, 35);
            ctx.drawImage(plante, 35, 35);
            ctx.drawImage(plante, 235, 95);


            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();

            if (this.y + this.vy > myGameArea.canvas.height || this.y + this.vy < 0) 
            {
                this.vy = -this.vy;
            }

            if (this.x + this.vx > myGameArea.canvas.width || this.x + this.vx < 0) 
            {
                this.vx = -this.vx;
            }
            
        }

        // if (type == "image") {
        //     ctx.drawImage(
        //         this.image, 
        //         this.x, 
        //         this.y,
        //         this.width, 
        //         this.height);
        // } 
        // else {
        //     ctx.fillStyle = this.color;
        //     ctx.arc(this.x, this.y, this.width, this.height);
        // }
    }
}


/* Mise à jour du jeu */

function updateGameArea() {
    
    myGameArea.clear();
    myGameArea.collision();
   
    redGamePiece.x += redGamePiece.vx;
    redGamePiece.y += redGamePiece.vy;

    greenGamePiece.x += greenGamePiece.vx;
    greenGamePiece.y += greenGamePiece.vy;

    redGamePiece.update();       
    greenGamePiece.update();
    caillou1.update();
    caillou2.update();
    caillou3.update();
   
}

