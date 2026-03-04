const readline = require('readline');
const BirthdayReminder = require('./BirthdayReminder');
const Friend = require('./Friend');

class BirthdayApp {
    constructor() {
        this.reminder = new BirthdayReminder();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.notificationInterval = null;
        this.isRunning = true;
    }

    clearScreen() {
        console.clear();
    }

    showMenu() {
        console.log('\n' + '-'.repeat(50));
        console.log('ПРОГРАММА НАПОМИНАНИЯ О ДНЯХ РОЖДЕНИЯ');
        console.log('-'.repeat(50));
        console.log('1. Добавить друга');
        console.log('2. Показать всех друзей');
        console.log('3. Удалить друга');
        console.log('4. Именинники сегодня');
        console.log('5. Именинники на неделе');
        console.log('6. Найти друга по имени');
        console.log('7. Запустить автоматические уведомления');
        console.log('8. Остановить уведомления');
        console.log('9. Выход');
        console.log('-'.repeat(50));
    }

    start() {
        this.clearScreen();
        this.promptMenu();
    }

    promptMenu() {
        if (!this.isRunning) return;
        
        this.showMenu();
        this.rl.question('Выберите пункт меню (1-9): ', (answer) => {
            this.handleMenuChoice(answer);
        });
    }

    handleMenuChoice(choice) {
        switch (choice) {
            case '1':
                this.addFriend();
                break;
            case '2':
                this.showAllFriends();
                break;
            case '3':
                this.removeFriend();
                break;
            case '4':
                this.showTodaysBirthdays();
                break;
            case '5':
                this.showUpcomingBirthdays();
                break;
            case '6':
                this.findFriendByName();
                break;
            case '7':
                this.startNotifications();
                break;
            case '8':
                this.stopNotifications();
                break;
            case '9':
                this.exit();
                break;
            default:
                console.log('Неверный выбор. Пожалуйста, выберите 1-9.');
                setTimeout(() => this.promptMenu(), 1500);
        }
    }

    addFriend() {
        console.log('\n--- Добавление нового друга ---');
        
        this.rl.question('Введите имя друга: ', (name) => {
            if (!name.trim()) {
                console.log('Имя не может быть пустым!');
                setTimeout(() => this.promptMenu(), 1500);
                return;
            }

            this.rl.question('Введите дату рождения (ГГГГ-ММ-ДД, например: 1990-05-15): ', (birthDate) => {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(birthDate)) {
                    console.log('Неверный формат даты! Используйте ГГГГ-ММ-ДД');
                    setTimeout(() => this.promptMenu(), 1500);
                    return;
                }

                try {
                    const friend = new Friend(name.trim(), birthDate);
                    this.reminder.addFriend(friend);
                    console.log(`Друг "${name}" успешно добавлен!`);
                } catch (error) {
                    console.log(`Ошибка: ${error.message}`);
                }
                
                setTimeout(() => this.promptMenu(), 1500);
            });
        });
    }

    showAllFriends() {
        console.log('\n--- Список всех друзей ---');
        const friends = this.reminder.getAllFriends();
        
        if (friends.length === 0) {
            console.log('Список друзей пуст');
        } else {
            friends.forEach((friend, index) => {
                console.log(`${index + 1}. ${friend.getName()} - ${friend.getBirthDate()}`);
            });
        }
        
        setTimeout(() => this.promptMenu(), 2000);
    }

    removeFriend() {
        console.log('\n--- Удаление друга ---');
        const friends = this.reminder.getAllFriends();
        
        if (friends.length === 0) {
            console.log('Список друзей пуст');
            setTimeout(() => this.promptMenu(), 1500);
            return;
        }

        friends.forEach((friend, index) => {
            console.log(`${index + 1}. ${friend.getName()} - ${friend.getBirthDate()}`);
        });

        this.rl.question('Введите номер друга для удаления (или 0 для отмены): ', (number) => {
            const index = parseInt(number) - 1;
            
            if (number === '0') {
                console.log('Удаление отменено');
                setTimeout(() => this.promptMenu(), 1000);
                return;
            }

            if (isNaN(index) || index < 0 || index >= friends.length) {
                console.log('Неверный номер!');
                setTimeout(() => this.promptMenu(), 1500);
                return;
            }

            const removedFriend = friends[index];
            this.reminder.removeFriend(removedFriend);
            console.log(`Друг "${removedFriend.getName()}" удален`);
            
            setTimeout(() => this.promptMenu(), 1500);
        });
    }

    showTodaysBirthdays() {
        console.log('\n--- Именинники сегодня ---');
        const todayBirthdays = this.reminder.getTodaysBirthdays();
        
        if (todayBirthdays.length === 0) {
            console.log('Сегодня нет именинников');
        } else {
            console.log('Сегодня день рождения празднуют:');
            todayBirthdays.forEach(friend => {
                console.log(`   ${friend.getName()} - ${friend.getBirthDate()} (исполняется ${friend.getAge()} лет)`);
            });
        }
        
        setTimeout(() => this.promptMenu(), 2000);
    }

    showUpcomingBirthdays() {
        console.log('\n--- Именинники на ближайшие 7 дней ---');
        const upcomingBirthdays = this.reminder.getUpcomingBirthdays(7);
        
        if (upcomingBirthdays.length === 0) {
            console.log('На ближайшей неделе именинников нет');
        } else {
            console.log('В ближайшие 7 дней день рождения празднуют:');
            
            const today = new Date();
            const sortedBirthdays = upcomingBirthdays.sort((a, b) => {
                const [monthA, dayA] = a.getBirthDate().split('-').slice(1).map(Number);
                const [monthB, dayB] = b.getBirthDate().split('-').slice(1).map(Number);
                
                const dateA = new Date(today.getFullYear(), monthA - 1, dayA);
                const dateB = new Date(today.getFullYear(), monthB - 1, dayB);
                
                if (dateA < today) dateA.setFullYear(dateA.getFullYear() + 1);
                if (dateB < today) dateB.setFullYear(dateB.getFullYear() + 1);
                
                return dateA - dateB;
            });
            
            sortedBirthdays.forEach(friend => {
                const [year, month, day] = friend.getBirthDate().split('-').map(Number);
                const birthDate = new Date(today.getFullYear(), month - 1, day);
                if (birthDate < today) birthDate.setFullYear(birthDate.getFullYear() + 1);
                
                console.log(`   ${friend.getName()} - ${friend.getBirthDate()}`);
            });
        }
        
        setTimeout(() => this.promptMenu(), 2000);
    }

    findFriendByName() {
        console.log('\n--- Поиск друга по имени ---');
        
        this.rl.question('Введите имя для поиска: ', (searchName) => {
            if (!searchName.trim()) {
                console.log('Имя не может быть пустым!');
                setTimeout(() => this.promptMenu(), 1500);
                return;
            }

            this.rl.question('Искать точное совпадение? (д/н): ', (exactMatch) => {
                const exact = exactMatch.toLowerCase() === 'д' || exactMatch.toLowerCase() === 'да';
                const foundFriends = this.reminder.findFriendsByName(searchName.trim(), exact);
                
                if (foundFriends.length === 0) {
                    console.log(`Друзья с именем "${searchName}" не найдены`);
                } else {
                    console.log(`\nНайдено ${foundFriends.length} друг(а):`);
                    foundFriends.forEach((friend, index) => {
                        console.log(`${index + 1}. ${friend.getName()} - ${friend.getBirthDate()}`);
                    });
                }
                
                setTimeout(() => this.promptMenu(), 2000);
            });
        });
    }

    startNotifications() {
        if (this.notificationInterval) {
            console.log('Уведомления уже запущены (проверка каждые 24 часа)');
            setTimeout(() => this.promptMenu(), 1500);
            return;
        }

        console.log('Автоматические уведомления запущены');
        console.log('Проверка именинников будет выполняться каждые 24 часа');

        this.checkAndNotify();
        
        this.notificationInterval = setInterval(() => {
            this.checkAndNotify();
        }, 24 * 60 * 60 * 1000);
        
        setTimeout(() => this.promptMenu(), 2000);
    }

    checkAndNotify() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = now.toLocaleDateString('ru-RU');
        
        const notified = this.reminder.checkAndNotifyBirthdays();
        
        if (notified.length <= 0) {
            console.log(`[${dateStr} ${timeStr}] Сегодня именинников нет`);
        }
    }

    stopNotifications() {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
            this.notificationInterval = null;
            console.log('Автоматические уведомления остановлены');
        } else {
            console.log('Уведомления не были запущены');
        }
        
        setTimeout(() => this.promptMenu(), 1500);
    }

    exit() {
        console.log('\nДо свидания!');
        
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
        }
        
        this.isRunning = false;
        this.rl.close();
        process.exit(0);
    }
}

const app = new BirthdayApp();
app.start();