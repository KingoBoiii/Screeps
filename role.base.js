class Role {

    constructor(pathColor = '#ffffff') {
        this.pathColor = pathColor;
    }

    get PathColor() {
        return this.pathColor;
    }

    /** @param {Creep} creep **/
    work(creep) {
        // console.log('Role.work()');
    }

    static castTo(type, obj) {
        return Object.assign(type, obj);
    }

}

module.exports = Role;