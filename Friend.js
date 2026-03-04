class Friend {
    
    constructor(name, birthDate) {
        this.name = name;
        this.birthDate = birthDate;
    }

    getName() {
        return this.name;
    }

    getBirthDate() {
        return this.birthDate;
    }
}

module.exports = Friend;