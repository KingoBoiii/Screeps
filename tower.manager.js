function TowerManager() {
    this.towers = _.filter(Game.structures, (structure) => structure.structureType === STRUCTURE_TOWER);

    this.defense = function() {
        for(const tower of this.towers) {
            const invaders = tower.room.findInvaderCreeps();
            tower.attack(invaders[0]);
        }
    }

    this.heal = function() {
        throw new Error("Not implemented yet!");
    }

    this.repair = function() {
        throw new Error("Not implemented yet!");
    }

}

module.exports = TowerManager;

