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
}

module.exports = BirthdayReminder;