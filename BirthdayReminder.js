class BirthdayReminder {
    constructor() {
        this.friends = [];
    }

    addFriend(friend) {
        this.friends.push(friend);
    }

    getAllFriends() {
        return this.friends;
    }
}

module.exports = BirthdayReminder;