require('creep.extensions');
const roleRepair = require('role.repair');

const roleBuilder = {
    
    run: function(creep) {
        creep.shouldCreepWork('Harvest', 'Build');

        const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return constructionSite.progress < constructionSite.progressTotal || (creep.room.controller.safeMode > 0);
            }
        });
        if(target) {
            if(creep.memory.working) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                const storage = creep.findStorage(); 
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            roleRepair.run(creep);
        }
    }
    
};

module.exports = roleBuilder;