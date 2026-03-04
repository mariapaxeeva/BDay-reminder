const Friend = require('../Friend');

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