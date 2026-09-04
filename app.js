const nameEnemy = ["Goblin", "Rata gigante", "Bandido", "Lobo salvaje", "Esqueleto", "Orco", "Arpía", "Trol", "Caballero caído", "Dragón"];

const player = {
    name: "Talos",
    level: 1,
    pointsLife: 70,
    maxPointsLife: 70,
    pointsAttack: 15,
    equipment: {
        weapon:"Shortsword",
        shield: "Woodshield"
                } 
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
    //Sistema de pérdida de puntos de salud y mensajería del sistema
    let calculateMin = atacante.pointsAttack * 0.75;
    let calculateMax = atacante.pointsAttack;
    let daño = Math.floor(Math.random() * (calculateMax - calculateMin + 1)) + calculateMin;
    defensor.pointsLife = defensor.pointsLife - daño;
    console.log(`${atacante.name} ataca a ${defensor.name}. Le hace ${daño} de daño. Vida restante de ${defensor.name} = ${defensor.pointsLife}.`);
    if(defensor.pointsLife <= 0 ){
        console.log(`${defensor.name} ha sido derrotado. Hoy la historia será escrita por ${atacante.name}`);
        combateTerminado = true;
    }
       
};




