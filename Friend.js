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
        const [year, month, day] = this.birthDate.split('-').map(Number);
        
        let age = today.getFullYear() - year;
        
        // Проверка, был ли уже день рождения в этом году
        const birthDayThisYear = new Date(today.getFullYear(), month - 1, day);
        if (today < birthDayThisYear) {
            age--;
        }
        
        return age;
    }
}

module.exports = Friend;