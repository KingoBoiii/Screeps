Room.prototype.findTombstonesWithEnergy = function() {
    return this.find(FIND_TOMBSTONES, {
        filter: (tombstone) => tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    });
}

Room.prototype.findDroppedResourceEnergy = function() {
    return this.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => resource.resourceType === RESOURCE_ENERGY && resource.amount > 0
    });
}

Room.prototype.findRuinsWithEnergy = function() {
    return this.find(FIND_RUINS, {
        filter: (ruin) => ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    });
}

/** @param {Structure} structureTypes **/
Room.prototype.findStructureWithLowestHits = function(structureTypes = [STRUCTURE_WALL, STRUCTURE_RAMPART, STRUCTURE_ROAD]) {
    const targets = this.find(FIND_STRUCTURES, {
        filter: (structure) => _.includes(structureTypes, structure.structureType) && structure.hits < structure.hitsMax
    });

    let targetId;
    let lowestHits = Infinity;
    _.forEach(targets, (target) => {
        if(target.hits < lowestHits) {
            lowestHits = Math.min(lowestHits, target.hits);
            targetId = target.id;
        }
    });
    const target = Game.getObjectById(targetId);
    return target;
}

/** @param {string[]} segments **/
Room.prototype.getBodyPartsBySegments = function(segments) {
    const body = [];

    const segmentCost = _.sum(segments, (part) => BODYPART_COST[part]);

    const energyAvailable = this.energyAvailable;
    // const energyAvailable = this.energyCapacityAvailable;

    const maxSegments = Math.floor(energyAvailable / segmentCost);

    _.times(maxSegments, function() {
        _.forEach(segments, s => body.push(s));
    });

    const sortedBody = _.sortBy(body, (part) => part);

    return sortedBody;
}

/** @returns {Source[]} active sources **/
Room.prototype.findActiveEnergySources = function() {
    return this.find(FIND_SOURCES_ACTIVE);
}

