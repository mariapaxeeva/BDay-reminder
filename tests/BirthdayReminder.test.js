const BirthdayReminder = require('../BirthdayReminder');
const Friend = require('../Friend');

test('BirthdayReminder класс должен быть создан', () => {
    const reminder = new BirthdayReminder();
    expect(reminder).toBeDefined();
});

test('Класс BirthdayReminder должен позволять добавлять друга в список', () => {
    const reminder = new BirthdayReminder();
    const friend = new Friend('Иван Иванов', '1990-05-15');
    
    reminder.addFriend(friend);
    
    expect(reminder.friends).toContain(friend);
});

test('Класс BirthdayReminder должен позволять получать список всех добавленных друзей', () => {
    const reminder = new BirthdayReminder();
    const friend1 = new Friend('Иван Иванов', '1990-05-15');
    const friend2 = new Friend('Марина Петрова', '1985-10-20');
    
    reminder.addFriend(friend1);
    reminder.addFriend(friend2);
    
    const friends = reminder.getAllFriends();
    
    expect(friends).toHaveLength(2);
    expect(friends).toContain(friend1);
    expect(friends).toContain(friend2);
});