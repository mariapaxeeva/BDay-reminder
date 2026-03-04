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
}

module.exports = BirthdayReminder;