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
}

module.exports = BirthdayReminder;