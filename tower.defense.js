const towerDefense = {

    run: function() {
        const towers = _.filter(Game.structures, (structure) => structure.structureType === STRUCTURE_TOWER);
        for(const tower of towers) {
            const invaders = tower.room.findInvaderCreeps();
            tower.attack(invaders[0]);
        }
    }

}

module.exports = towerDefense;