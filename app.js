const player = {
    name: "Talos",
    level: 1,
    pointsLife: 50,
    pointsAttack: 10,
    equipment: {
        weapon:"Shortsword",
        shield: "Woodshield"
                } 
};

const goblin = {
    name: "Goblin",
    pointsLife: 30,
    pointsAttack: 7,
};


function attack (atacante, defensor){
    defensor.pointsLife = defensor.pointsLife - atacante.pointsAttack;
    console.log(`${atacante.name} ataca a ${defensor.name}. Le hace ${atacante.pointsAttack} de daño. Vida restante de ${defensor.name} = ${defensor.pointsLife}.`);
};

attack(player, goblin);
attack(goblin, player);