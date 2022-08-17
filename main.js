const CreepManager = require('./creep.manager');
const TowerManager = require('./tower.manager');

module.exports.loop = function () {

    const creepManager = new CreepManager();
    creepManager.clearDeadCreeps();
    creepManager.spawnCreeps();
    creepManager.run();

    const towerManager = new TowerManager();
    towerManager.defense();
    
}