class Friend {
    
    constructor(name, birthDate) {
        this.name = name;
        this.birthDate = birthDate;
    }

    getName() {
        return this.name;
    }

    getBirthDate() {
        // todo: реализовать позже
        return '1990-05-15';
    }
}

module.exports = Friend;