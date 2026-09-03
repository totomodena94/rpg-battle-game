const nameEnemy = ["Goblin", "Rata gigante", "Bandido", "Lobo salvaje", "Esqueleto", "Orco", "Arpía", "Trol", "Caballero caído", "Dragón"];

const player = {
    name: "Talos",
    level: 1,
    pointsLife: 70,
    maxPointsLife: 50,
    pointsAttack: 10,
    equipment: {
        weapon:"Shortsword",
        shield: "Woodshield"
                } 
};
let combateTerminado = false;

for (let round = 1; round <= 10; round++){
    const enemy = {
    name: nameEnemy[round -1],
    pointsLife: 30 + (round * round * 6),
    pointsAttack: 4 + (round * round),
    
};
    player.level = player.level + 1;
        let porcentaje = player.pointsLife / player.maxPointsLife
        player.maxPointsLife = 20 + (round * round *5);
        player.pointsAttack = 10 + (round *round*2);
       player.pointsLife = porcentaje * player.maxPointsLife; 
       console.log(`${player.name} ha subido de nivel. Sus estadísticas se han modificado. Su ataque ahora es de ${player.pointsAttack} y su vida es de ${player.pointsLife}`);
    
     if(round % 2 ===0) {
        if(player.pointsLife < player.maxPointsLifepointsLife * 0.75){
            player.pointsLife = maxPointsLife * 0.75
            console.log(`Los dioses reconocen tu coraje y te bendicen. ${player.name} ha recuperado salud)`);
        };
        
     }
    
    
    combateTerminado = false;
    while (!combateTerminado){
        attack(player, enemy);
        attack(enemy, player);
    }

    if(player.pointsLife <= 0){
        console.log("Game over");
        break 
    }
};







function attack (atacante, defensor){
    if(combateTerminado){
        return;
    }
    
    defensor.pointsLife = defensor.pointsLife - atacante.pointsAttack;
    console.log(`${atacante.name} ataca a ${defensor.name}. Le hace ${atacante.pointsAttack} de daño. Vida restante de ${defensor.name} = ${defensor.pointsLife}.`);
    if(defensor.pointsLife <= 0 ){
        console.log(`${defensor.name} ha sido derrotado. Hoy la historia será escrita por ${atacante.name}`);
        combateTerminado = true;
    }
       
};




