const functions = {

    
    /** @param {Creep} creep **/
    shouldCreepWork: function(creep, harvestMsg = 'Harvest', workMsg = 'Repair') {
        let work = creep.memory.working;
        
        if(work && creep.store[RESOURCE_ENERGY] == 0) {
            work = false;
            creep.say(harvestMsg);
        }
        if(!work && creep.store.getFreeCapacity() == 0) {
            work = true;
            creep.say(workMsg);
        }
        
        return work;
    }

}
    
module.exports = functions;