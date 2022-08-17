require('creep.extensions');
require('room.extensions');

const roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        const source = creep.findHarvestingSource();
        if(source) {
            creep.containerHarvest(source);
        }
    }
    
};

module.exports = roleHarvester;