const Friend = require('../Friend');

test('Friend класс должен быть создан', () => {
    const friend = new Friend('Иван Иванов', '1990-05-15');
    expect(friend).toBeDefined();
});