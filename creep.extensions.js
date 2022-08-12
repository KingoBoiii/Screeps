Creep.prototype.findEnergySource = function() {
    const sources = this.findEnergySourcesInRoom();
    if(sources.length) {
        this.memory.target = sources[0].id;
        return sources[0];
    }
}

Creep.prototype.findEnergySourcesInRoom = function() {
    return this.room.find(FIND_SOURCES);
}