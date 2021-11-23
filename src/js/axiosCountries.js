const fetchUsers = async () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const userIds = [1, 2, 3];

  // 1. Создаём массив промисов
  const arrayOfPromises = userIds.map(async userId => {
    const response = await fetch(`${baseUrl}/users/${userId}`);
    return response.json();
  });

  // 2. Запускаем все промисы параллельно и ждем их завершения
  const users = await Promise.all(arrayOfPromises);
  console.log(users);
};

fetchUsers();
