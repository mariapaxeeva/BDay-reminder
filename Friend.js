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

    getAge() {
        const today = new Date();
        const [year] = this.birthDate.split('-').map(Number);
        return today.getFullYear() - year;
    }
}

module.exports = Friend;