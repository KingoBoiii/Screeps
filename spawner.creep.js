class CreepSpawner {
    
    /** 
     * @param {Room} room
     * @param {String} spawnName
     * @param {Number} defaultTarget 
    **/
    constructor(room, spawnName, defaultTarget = 0) {
        this.room = room;
        this.spawnName = spawnName;
        this.defaultTarget = defaultTarget;
    }

    /** 
     * @param {String} name
     * @param {String} role
     * @param {String[]} bodyParts 
    **/
    spawn(name, role, bodyParts) {
        const bodyPartsCost = getBodyPartsCost(bodyParts);
        if(room.energyAvailable < bodyPartsCost) {
            return;
        }

        const target = _.get(this.room.memory, ['census', role], this.defaultTarget);
        const creepWithSameRole = _.sum(Game.creeps, (creep) => creep.memory.role === role);

        if(creepWithSameRole < target) { 
            const newName = name + Game.time;
            Game.spawns[this.spawnName].spawnCreep(bodyParts, newName, { memory: { role: role } });
        }

        if(Game.spawns[this.spawnName].spawning) {
            const spawningCreep = Game.creeps[Game.spawns[this.spawnName].spawning.name];
            Game.spawns[this.spawnName].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns[this.spawnName].pos.x + 1, Game.spawns[this.spawnName].pos.y,{align: 'left', opacity: 0.8});
        }
    }

}

module.exports = CreepSpawner;