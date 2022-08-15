require('room.extensions');

Creep.prototype.findStructureWithLowestEnergy = function(structureTypes = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_TOWER]) {
    const targets = this.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => _.includes(structureTypes, structure.structureType) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    });

    const orderedTargets = _.sortBy(targets, (target) => target.store.getFreeCapacity() > 0 && target.structureType !== STRUCTURE_SPAWN);

    if(orderedTargets.length) {
        const target = orderedTargets[0];
        return target;
    }
}

/** @param {Creep} creep **/
Creep.prototype.shouldCreepWork = function(harvestMsg = 'Harvest', workMsg = 'Repair') {
    let work = this.memory.working;
    
    if(work && this.store[RESOURCE_ENERGY] == 0) {
        work = false;
        this.say(harvestMsg);
    }
    if(!work && this.store.getFreeCapacity() == 0) {
        work = true;
        this.say(workMsg);
    }
    
    this.memory.working = work;
    return work;
}

Creep.prototype.findEnergySource = function() {
    const tombstones = this.room.findTombstonesWithEnergy();
    if(tombstones.length) {
        console.log(tombstones);
        const tombstone = tombstones[0];
        this.memory.source = tombstone.id;
        return tombstone;
    }
    
    const droppedEnergy = this.room.findDroppedResourceEnergy();
    if(droppedEnergy.length) {
        const energy = droppedEnergy[0];
        this.memory.source = energy.id;
        return energy;
    }

    // const ruins = this.room.findRuinsWithEnergy();
    // if(ruins.length) {
    //     const ruin = ruins[0];
    //     this.memory.source = ruin.id;
    //     return ruin;
    // }

    const sourceFromMemory = Game.getObjectById(this.memory.source);
    if(sourceFromMemory && sourceFromMemory.energy > 0) {
        return sourceFromMemory;
    }
    
    const source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
        filter: (source) => {
            const creepTargetingSource = _.sum(Game.creeps, (c) => c.memory.source === source.id && c.memory.working);
            return (creepTargetingSource <= 4) && source.energy > 0;
        } 
    });

    if(source) {
        this.memory.source = source.id;
        return source;
    }
}
