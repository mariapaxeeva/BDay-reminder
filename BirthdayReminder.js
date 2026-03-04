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

    getUpcomingBirthdays() {
        // todo: реализовать позже
        if (this.friends.length === 0) return [];
        
        const today = new Date(2026, 4, 15);
        const upcomingBirthdays = [];
        
        for (const friend of this.friends) {
            const [year, month, day] = friend.getBirthDate().split('-').map(Number);
            const birthDateThisYear = new Date(2026, month - 1, day);
            
            const diffTime = birthDateThisYear - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays >= 0 && diffDays <= 7) {
                upcomingBirthdays.push(friend);
            }
        }
        
        return upcomingBirthdays;
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