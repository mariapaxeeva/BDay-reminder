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

test('Friend класс должен быть создан', () => {
    const friend = new Friend('Иван Иванов', '1990-05-15');
    expect(friend).toBeDefined();
});

test('Класс Friend должен возвращать корректное имя', () => {
    const friend = new Friend('Иван Иванов', '1990-05-15');
    expect(friend.getName()).toBe('Иван Иванов');
});

test('Класс Friend должен возвращать корректную дату рождения', () => {
    const friend = new Friend('Иван Иванов', '1990-05-15');
    expect(friend.getBirthDate()).toBe('1990-05-15');
});

test('Класс Friend должен возвращать корректное имя для разных имен', () => {
    const friend = new Friend('Марина Петрова', '1985-10-20');
    expect(friend.getName()).toBe('Марина Петрова');
});

test('Класс Friend должен возвращать корректную дату рождения для разных дат', () => {
    const friend = new Friend('Марина Петрова', '1985-10-20');
    expect(friend.getBirthDate()).toBe('1985-10-20');
});

test('Класс Friend должен возвращать корректный возраст', () => {
    mockDate(2026, 5, 15);
    
    const friend1 = new Friend('Иван Иванов', '1990-05-15');
    const friend2 = new Friend('Марина Петрова', '1985-02-20');
    const friend3 = new Friend('Альберт Блэк', '2000-01-25');
    
    expect(friend1.getAge()).toBe(36); // 2026 - 1990
    expect(friend2.getAge()).toBe(41); // 2026 - 1985
    expect(friend3.getAge()).toBe(26); // 2026 - 2000
});