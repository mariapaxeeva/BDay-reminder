const BirthdayReminder = require('../BirthdayReminder');
const Friend = require('../Friend');

const mockDate = (year, month, day) => {
    const realDate = Date;
    global.Date = class extends realDate {
        constructor(...args) {
            if (args.length === 0) {
                return new realDate(year, month - 1, day);
            }
            return new realDate(...args);
        }
    };
};

afterEach(() => {
    global.Date = Date;
});

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

test('Класс BirthdayReminder должен позволять удалять друзей', () => {
    const reminder = new BirthdayReminder();
    const friend = new Friend('Иван Иванов', '1990-05-15');
    
    reminder.addFriend(friend);
    reminder.removeFriend(friend);
    
    expect(reminder.getAllFriends()).not.toContain(friend);
});

test('Класс BirthdayReminder должен искать сегодняшних именниников', () => {
    mockDate(2026, 5, 15);
    
    const reminder = new BirthdayReminder();
    const friend1 = new Friend('Иван Иванов', '1990-05-15');
    const friend2 = new Friend('Марина Петрова', '1985-10-20');
    const friend3 = new Friend('Альберт Блэк', '1995-05-15');
    
    reminder.addFriend(friend1);
    reminder.addFriend(friend2);
    reminder.addFriend(friend3);
    
    const todayBirthdays = reminder.getTodaysBirthdays();
    
    expect(todayBirthdays).toContain(friend1);
    expect(todayBirthdays).toContain(friend3);
    expect(todayBirthdays).not.toContain(friend2);
    expect(todayBirthdays.length).toBe(2);
});

test('Класс BirthdayReminder должен искать именниников на неделе', () => {
    mockDate(2026, 5, 15);
    
    const reminder = new BirthdayReminder();
    const friend1 = new Friend('Иван Иванов', '1990-05-15');  // сегодня
    const friend2 = new Friend('Марина Петрова', '1985-05-16'); // завтра
    const friend3 = new Friend('Альберт Блэк', '1995-05-20'); // через 5 дней
    const friend4 = new Friend('Анна Смирнова', '1988-05-22'); // через 7 дней
    const friend5 = new Friend('Олег Новиков', '1992-05-23'); // через 8 дней
    const friend6 = new Friend('Елена Козлова', '1987-06-01'); // через 17 дней
    
    reminder.addFriend(friend1);
    reminder.addFriend(friend2);
    reminder.addFriend(friend3);
    reminder.addFriend(friend4);
    reminder.addFriend(friend5);
    reminder.addFriend(friend6);
    
    const upcomingBirthdays = reminder.getUpcomingBirthdays();
    
    expect(upcomingBirthdays).toContain(friend1);
    expect(upcomingBirthdays).toContain(friend2);
    expect(upcomingBirthdays).toContain(friend3);
    expect(upcomingBirthdays).toContain(friend4);
    expect(upcomingBirthdays).not.toContain(friend5);
    expect(upcomingBirthdays).not.toContain(friend6);
    expect(upcomingBirthdays.length).toBe(4);
});

test('Класс BirthdayReminder должен искать друзей по имени (точное совпадение)', () => {
    const reminder = new BirthdayReminder();
    const friend1 = new Friend('Иван Иванов', '1990-05-15');
    const friend2 = new Friend('Марина Петрова', '1985-10-20');
    
    reminder.addFriend(friend1);
    reminder.addFriend(friend2);
    
    const foundFriends = reminder.findFriendsByName('Иван Иванов', true);
    
    expect(foundFriends).toContain(friend1);
    expect(foundFriends).not.toContain(friend2);
    expect(foundFriends.length).toBe(1);
});

test('Класс BirthdayReminder должен искать друзей по имени (частично)', () => {
    const reminder = new BirthdayReminder();
    const friend1 = new Friend('Иван Иванов', '1990-05-15');
    const friend2 = new Friend('Марина Петрова', '1985-10-20');
    const friend3 = new Friend('Иван Блэк', '1995-03-10');
    
    reminder.addFriend(friend1);
    reminder.addFriend(friend2);
    reminder.addFriend(friend3);
    
    const foundFriends = reminder.findFriendsByName('Иван');
    
    expect(foundFriends).toContain(friend1);
    expect(foundFriends).toContain(friend3);
    expect(foundFriends).not.toContain(friend2);
    expect(foundFriends.length).toBe(2);
});

test('Класс BirthdayReminder должен уведомлять о сегодняшних ДР', () => {
    mockDate(2026, 5, 15);
    
    const reminder = new BirthdayReminder();
    const friend = new Friend('Иван Иванов', '1990-05-15');
    
    reminder.addFriend(friend);
    reminder.checkAndNotifyBirthdays();

    expect(consoleOutput[0]).toContain('   СЕГОДНЯ ДЕНЬ РОЖДЕНИЯ У');
    expect(consoleOutput[0]).toMatch(/ИВАН ИВАНОВ/);
    expect(consoleOutput[1]).toMatch(/Исполняется 36 лет/);
    expect(consoleOutput[2]).toMatch(/Дата рождения: 1990-05-15/);
    expect(consoleOutput[3]).toMatch(/Поздравьте своего друга/);
});