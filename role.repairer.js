require('creep.extensions');
const Role = require("role.base");

class Repairer extends Role {

    constructor() {
        super('#ff0000');
    }
    
    /** @param {Creep} creep **/
    work(creep) {
        if(!creep) {
            return;
        }

        creep.shouldCreepWork('Harvest', 'Repair');

        if(!creep.memory.working) {
            const storage = creep.findStorage(); 
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: this.PathColor}});
            }
        }
        else {
            const target = creep.room.findStructureWithLowestHits([STRUCTURE_CONTAINER, STRUCTURE_WALL, STRUCTURE_ROAD]);
            if(target) {
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: this.PathColor}});
                }
            }
        }
    }

    static castToRepairer(obj) {
        return Object.assign(new Repairer(), obj);
    } 

}

module.exports = Repairer;