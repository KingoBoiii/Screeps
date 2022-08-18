const roleRepair = require('role.repair');

const roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.shouldCreepWork('Collect', 'Transfer');

        // const energyBelowCapacity = creep.room.energyAvailable < creep.room.energyCapacityAvailable;
        let containers = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_CONTAINER && structure.pos.findInRange(FIND_SOURCES, 1);
            }
        });

        const storage = creep.findStorage();
        const isStorageFull = storage.store.getFreeCapacity(RESOURCE_ENERGY) === storage.store.getCapacity();
        if(!isStorageFull){
            if(creep.memory.working) {
                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                const target = creep.findHarvestingContainer();
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            roleRepair.runStructures(creep, [STRUCTURE_CONTAINER]);
        }
    }

};

module.exports = roleCollector;