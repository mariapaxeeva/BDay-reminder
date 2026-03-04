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