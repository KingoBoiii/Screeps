require('room.extensions');

Creep.prototype.containerHarvest = function(target) {
    const result = this.harvest(target);

    const containers = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            const sourceInRange = structure.pos.findInRange(FIND_SOURCES, 1, {
                filter: (source) => source.id === this.memory.source
            });
            return structure.structureType === STRUCTURE_CONTAINER && sourceInRange.length > 0;
        }
    });
    if(this.pos !== containers[0].pos) {
        this.moveTo(containers[0].pos);
    }

    return result;
}

Creep.prototype.findHarvestingSource = function() {
    const sourceFromMemory = Game.getObjectById(this.memory.source);
    if(sourceFromMemory) {
        return sourceFromMemory;
    }

    const sources = this.room.find(FIND_SOURCES, {
        filter: (source) => {
            const harvestersTargetingSource = _.sum(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.source === source.id);
            
            const containersInRange = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => structure.structureType === STRUCTURE_CONTAINER
            });

            return containersInRange.length > 0 && harvestersTargetingSource === 0;
        }
    });

    if(sources.length) {
        const source = sources[0];
        this.memory.source = source.id;
        return source;
    }
}

Creep.prototype.findHarvestingContainer = function() {
    const collectorsTargetingContainer = _.sum(Game.creeps, (creep) => creep.memory.role === 'collector' && this.memory.container === creep.memory.container);
    const containerFromMemory = Game.getObjectById(this.memory.container);
    if(containerFromMemory && collectorsTargetingContainer === 1) {
        return containerFromMemory;
    }    
    
    const containers = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.pos.findInRange(FIND_SOURCES, 1)
    });

    if(containers.length) {
        const container = containers[0];
        this.memory.container = container.id;
        return container;   
    }
}

Creep.prototype.findStorage = function() {
    const storageStructure = this.room.findStorage();
    if(storageStructure) { 
        const storage = storageStructure[0];
        this.memory.source = storage.id;
        return storage;
    }
}

Creep.prototype.findContainer = function() {
    const containers = this.room.findContainers();

    const d = _.sum(Game.creeps, creep => creep.memory.role === 'Collector' && creep.memory.source === this.memory.source);

    if(containers.length && d < 1) {
        const container = containers[0];
        this.memory.container = container.id;
        return container;
    }
}

Creep.prototype.findStructureWithLowestEnergy = function(structureTypes = [STRUCTURE_EXTENSION, STRUCTURE_TOWER]) {
    // If safe mode is active, prioritize towers.
    const invaderCount = _.sum(this.room.findInvaderCreeps());

    if(this.room.controller.safeMode > 0 && invaderCount > 0) {
        structureTypes = [STRUCTURE_TOWER, STRUCTURE_EXTENSION];
    }

    const targets = this.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => _.includes(structureTypes, structure.structureType) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    });

    // const orderedTargets = _.sortBy(targets, (target) => target.store.getFreeCapacity() > 0 && target.structureType !== STRUCTURE_SPAWN);

    if(targets.length) {
        const target = targets[0];
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

Creep.prototype.findEmptyExtensionsAndSpawn = function() {
    const extensions = this.room.findEmptyExtensions();
    if(extensions.length) {
        const extension = extensions[0];
        this.memory.source = extension.id;
        return extension;
    }
    
    const spawn = this.room.findSpawn();
    if(spawn) {
        const s = spawn[0];
        this.memory.source = s.id;
        return s;
    }
}

Creep.prototype.findEnergySource1 = function() {
    const sourceFromMemory = Game.getObjectById(this.memory.source);
    if(sourceFromMemory) {
        return sourceFromMemory;
    }    

    const source = this.pos.findClosestByPath(FIND_SOURCES, {
        filter: (source) => {
            const minersTargetingSource = _.sum(Game.creeps, (creep) => creep.memory.role === 'miner' && creep.memory.source === source.id);
            return minersTargetingSource < 1;
        }
    });
    this.memory.source = source.id;
    return source;
}

Creep.prototype.findEnergySource = function() {
    const tombstones = this.room.findTombstonesWithEnergy();
    if(tombstones.length) {
        const tombstone = tombstones[0];
        this.memory.source = tombstone.id;
        return tombstone;
    }
    
    const ruins = this.room.findRuinsWithEnergy();
    if(ruins.length) {
        const ruin = ruins[0];
        this.memory.source = ruin.id;
        return ruin;
    }
    
    const sourceFromMemory = Game.getObjectById(this.memory.source);
    const creepTargetingSource = _.sum(Game.creeps, (creep) => creep.memory.source === this.memory.source);
    if(sourceFromMemory && sourceFromMemory.energy > 0 && creepTargetingSource < 4) {
        return sourceFromMemory;
    }

    const droppedEnergy = this.room.findDroppedResourceEnergy();
    if(droppedEnergy.length) {
        const energy = droppedEnergy[0];
        this.memory.source = energy.id;
        return energy;
    }
    
    const source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
        filter: (source) => source.energy > 0 && source.id != '9fa9077331385d3'
    });

    if(source) {
        this.memory.source = source.id;
        return source;
    }
}
