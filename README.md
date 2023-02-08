# Личен Блог

Проекта е разработен за курс по фронт енд в факултета по математика и информатика СУ "Св. Климент Охридски".

# 1. Функционалности
1. Потребител може да се регистрира и да се валидира като всяко от полетата за въвеждане на данни се верифицират с regex шаблон. Данните за регистрираните потребители се пази в firebase база от данни. Причината за използвнето и е това ,че има вградена функционалност която лесно може да се имплементира към проекта.
2. Добавяне на нов блог. Тази опция е валидна само за регистриран потребител. При създаването потребителя въвежда име(тема), текста и url към снимка която иска да се показва в случай ,че няма добавена снимка има такава по подразбиране. Ограничение на име(тема) е 60 символа, на текста е 1000 символа.
3. Писане на коментари в блог. Тази функционалност също е само за регистрирани потребители. Ограничение на коментара е 200 символа. Докато се пише съобщението потребитля може да следи за броя въведени символи.
Блоговете и коментарите се пазят в local storage, тоест в паметта на самият браузър на потребителя. Блоговете създадени от него няма да бъдат видими за другите потребители. За подобряване на това блоговете трябва да се записват в база от данни например firebase. Тогава трябва да се помисли за подобряването на пазането на коментари тъй като в момента се пази html код в local storage. Може да се пази като масив от обекти със съдържанието на кометар.
Блоговете са подредени по дата на тяхното създаване. 

# Бъдещи възможни подобрения
1. Да се добави оценка на коментарите.
2. Протребителя създал блога да може да го променя.
3. Потребителя да може да филтрира блоговете по тагове или дата.
4. Да се изпраща имейл за потвърждение на потребителя при регистрация.
5. Потребителя да може да сортира блоговете по време на създаване или име (азбучен ред). 
6. Да се добави админ панел ,който да може да премахва или променя блогове и коментари към тях.
