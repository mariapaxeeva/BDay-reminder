class BirthdayReminder {
    constructor() {
        this.friends = [];
    }

    getAllFriends() {
        return this.friends;
    }

    addFriend(friend) {
        this.friends.push(friend);
    }

    removeFriend(friend) {
        const index = this.friends.indexOf(friend);
        if (index !== -1) {
            this.friends.splice(index, 1);
        }
    }

    getTodaysBirthdays() {
        if (this.friends.length === 0) return [];
        
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDay = today.getDate();
        
        return this.friends.filter(friend => {
            const [year, month, day] = friend.getBirthDate().split('-').map(Number);
            return month === todayMonth && day === todayDay;
        });
    }

    getUpcomingBirthdays(daysAhead) {
        if (this.friends.length === 0) return [];
        
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDay = today.getDate();
        
        // Функция для преобразования даты в день года
        const dayOfYear = (month, day) => {
            const date = new Date(2000, month - 1, day);
            return Math.floor((date - new Date(2000, 0, 1)) / (24 * 60 * 60 * 1000));
        };
        
        const todayDayOfYear = dayOfYear(todayMonth, todayDay);
        
        return this.friends.filter(friend => {
            const [year, month, day] = friend.getBirthDate().split('-').map(Number);
            const birthdayDayOfYear = dayOfYear(month, day);
            
            let diff = birthdayDayOfYear - todayDayOfYear;
            if (diff < 0) {
                diff += 365;
            }
            
            return diff <= daysAhead;
        });
    }

    findFriendsByName(searchName, exactMatch = false) {
        if (this.friends.length === 0) return [];
        
        if (exactMatch) {
            return this.friends.filter(friend => 
                friend.getName().toLowerCase() === searchName.toLowerCase()
            );
        } else {
            return this.friends.filter(friend => 
                friend.getName().toLowerCase().includes(searchName.toLowerCase())
            );
        }
    }

    checkAndNotifyBirthdays(callback = null) {
        // todo: реализовать позже
        const todayBirthdays = this.getTodaysBirthdays();
        
        if (todayBirthdays.length === 0) {
            return [];
        }
        
        todayBirthdays.forEach(friend => {
            console.log(`   СЕГОДНЯ ДЕНЬ РОЖДЕНИЯ У ${friend.getName().toUpperCase()}!`);
            console.log(`   Исполняется ${friend.getAge()} лет`);
            console.log(`   Дата рождения: ${friend.getBirthDate()}`);
            console.log('   Поздравьте своего друга!\n');
        });
        
        return todayBirthdays;
    }
}

module.exports = BirthdayReminder;