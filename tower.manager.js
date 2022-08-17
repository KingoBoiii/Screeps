class TowerManager {

    constructor() {
        this.towers = _.filter(Game.structures, (structure) => structure.structureType === STRUCTURE_TOWER);
    }

    defense() {
        for(const tower of this.towers) {
            const invaders = tower.room.findInvaderCreeps();
            tower.attack(invaders[0]);
        }
    }

    heal() {
        throw new Error("Not implemented yet!");
    }

    repair() {
        throw new Error("Not implemented yet!");
    }

}

module.exports = TowerManager;

