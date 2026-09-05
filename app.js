const nameEnemy = ["Goblin", "Rata gigante", "Bandido", "Lobo salvaje", "Esqueleto", "Orco", "Arpía", "Trol", "Caballero caído", "Dragón"];
const armasDisponibles = [
    {name: "Espada corta", bonus:0},
    {name: "ESpada larga", bonus:8},
    {name: "Mandoble", bonus:16},
    {name:"Espada del alba", bonus: 28}
];
let weaponLevel = 0;
const escudosDisponibles = [
    {name:"Escudo de madera", blockChance: 0.05},
    {name:"Escudo de hierro", blockChance: 0.12},
    {name:"Escudo torreón", blockChance: 0.20},
    {name:"Égida sagrada", blockChance: 0.32},
];
let shieldLevel = 0;
const armadurasDisponibles = [
    {name: "Ropa de viajero", reduction: 0.05},
    {name: "Cota de malla", reduction: 0.12},
    {name: "Armadura de placas", reduction: 0.20},
    {name: "Armadura del guardián", reduction: 0.30},  

];
let armorLevel = 0;

const player = {
    name: "Talos",
    level: 1,
    pointsLife: 70,
    maxPointsLife: 70,
    pointsAttack: 15,
};

/* 
Establece las rondas del juego y crea un enemigo en cada ronda tomando los nombres del array:nameEnemy
*/
let combateTerminado = false;

for (let round = 1; round <= 10; round++){
    const enemy = {
    name: nameEnemy[round -1],
    pointsLife: 30 + (round * round * 6),
    pointsAttack: 4 + (round * round),
    
};

//Se establece el sistema de subida de nivel. Por cada ronda el jugador sube un nivel y aumenta sus estadísticas.
    player.level = player.level + 1;
        let porcentaje = player.pointsLife / player.maxPointsLife
        player.maxPointsLife = 65 + (round * round *5);
        player.pointsAttack = 15 + (round *round*2);
       player.pointsLife = porcentaje * player.maxPointsLife; 
       console.log(`${player.name} ha subido de nivel. Sus estadísticas se han modificado. Su ataque ahora es de ${player.pointsAttack} y su vida es de ${player.pointsLife}`);
    
    //Se establece el healer cada dos turnos que restaura vida del jugador
     if(round % 2 ===0) {
        if(player.pointsLife < player.maxPointsLife * 0.75){
            player.pointsLife = player.maxPointsLife * 0.75
            console.log(`Los dioses reconocen tu coraje y te bendicen. ${player.name} ha recuperado salud`);
        };
        
     }
    //Se establece el brujo aleatoria que nerfea
     if(Math.random() < 0.5){
        player.pointsAttack = player.pointsAttack *0.9;
            console.log(`El brujo maldito aparece en tu camino. ${player.name} ha perdido 10 por ciento de ataque. Ataque restante de ${player.name}: ${player.pointsAttack}`);
        
     }
    
    //Se establece el bucle de ataques iniciando por el jugador y siguiendo por el enemy
    combateTerminado = false;
    while (!combateTerminado){
        attack(player, enemy);
        attack(enemy, player);
    }
    //Se establece el game over
    if(player.pointsLife <= 0){
        console.log("Game over");
        break 
    }
};

    //Función de ataque con su condición de finalización
function attack (atacante, defensor){
    if(combateTerminado){
        return;
    }
    if(Math.random() < 0.15){
        console.log(`${defensor.name} esquivó el golpe!`);
        return;
    } else if(defensor === player && Math.random()< escudosDisponibles[shieldLevel].blockChance){
        console.log(`${defensor.name} bloquó el golpe!`);
        return
    }
    
    //Sistema de pérdida de puntos de salud y mensajería del sistema
    let daño = 0;
    if (atacante === player){
    let calculateMin = (atacante.pointsAttack + armasDisponibles[weaponLevel].bonus) * 0.75;
    let calculateMax = atacante.pointsAttack + armasDisponibles[weaponLevel].bonus;
    daño = Math.floor(Math.random() * (calculateMax - calculateMin + 1)) + calculateMin;
    } else{
    let calculateMin = atacante.pointsAttack * 0.75
    let calculateMax = atacante.pointsAttack;
    daño = Math.floor(Math.random() * (calculateMax - calculateMin + 1)) + calculateMin;
    }

    if(defensor === player){
        let dañoReal = daño - (daño * armadurasDisponibles[armorLevel].reduction);
        defensor.pointsLife = defensor.pointsLife - dañoReal;
        }else{
    defensor.pointsLife = defensor.pointsLife - daño;
    }
    console.log(`${atacante.name} ataca a ${defensor.name}. Le hace ${daño} de daño. Vida restante de ${defensor.name} = ${defensor.pointsLife}.`);
    if(defensor.pointsLife <= 0 ){
        console.log(`${defensor.name} ha sido derrotado. Hoy la historia será escrita por ${atacante.name}`);
        combateTerminado = true;
    }
       
};




