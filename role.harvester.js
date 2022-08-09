/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
 
const roleHarvester = {
    
    run: function(creep) {
        const room = creep.room;
        const structures = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType !== STRUCTURE_CONTROLLER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        
        if(structures.length > 0) {
            if(creep.store.getFreeCapacity() > 0) {
                const sourceTarget = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                const target = creep.pos.findClosestByPath(structures);
                if(target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }

                // var targets = creep.room.find(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                //     }
                // });
                // if(targets.length > 0) {
                //     if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                //     }
                // }
            }
        } else {
            if(creep.store.getFreeCapacity() > 0) {
                const sourceTarget = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax;
                    }
                });
                if(target) {
                    if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
    
};

module.exports = roleHarvester;