/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

const roleRepair = require('role.repair');

const roleBuilder = {
    
    run: function(creep) {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🚧 build');
        }

        const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.progress < constructionSite.progressTotal;
            }
        });

        if(target) {
            if(creep.memory.working) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                const sourceTarget = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            roleRepair.run(creep);
        }
    }
    
};

module.exports = roleBuilder;