// src/data/services.js

// Путь к папке images в корне проекта
const imagesPath = '/images/';

export const services = [
  {
    id: 1,
    title: "Шоколадный час",
    description: "Ежедневное бесплатное шоколадное фондю с 15:00 до 16:00",
    price: "Бесплатно",
    category: "special",
    isPopular: true,
    image: `${imagesPath}chocolate.jpg`,
    duration: "1 час",
    includes: ["Фондю", "Трюфели", "Горячий шоколад"]
  },
  {
    id: 2,
    title: "Премиум СПА",
    description: "Расслабляющие процедуры с массажем и обертываниями",
    price: "от 480 CHF",
    category: "spa",
    isPopular: true,
    image: `${imagesPath}spa.jpg`,
    duration: "1.5 часа",
    includes: ["Массаж", "Обертывание", "Сауна"]
  },
  {
    id: 3,
    title: "Ресторан Mövenpick",
    description: "Изысканная швейцарская кухня от шеф-повара",
    price: "от 240 CHF",
    category: "restaurant",
    isPopular: true,
    image: `${imagesPath}restaurant.jpg`,
    duration: "2 часа",
    includes: ["Ужин", "Вино", "Десерт"]
  },
  {
    id: 4,
    title: "Люкс номер",
    description: "Просторный номер с панорамным видом на горы",
    price: "от 1'400 CHF/ночь",
    category: "room",
    isPopular: true,
    image: `${imagesPath}room.jpg`,
    duration: "1 день",
    includes: ["Завтрак", "Шоколад", "Халат"]
  },
  {
    id: 5,
    title: "Трансфер из аэропорта",
    description: "Встреча с табличкой, комфортабельный автомобиль",
    price: "290 CHF",
    category: "transport",
    isPopular: false,
    image: `${imagesPath}transfer.jpg`,
    duration: "40 мин",
    includes: ["Встреча", "Вода", "Wi-Fi"]
  },
  {
    id: 6,
    title: "Фитнес центр",
    description: "Современные тренажеры и йога",
    price: "Бесплатно для гостей",
    category: "sport",
    isPopular: false,
    image: `${imagesPath}fitness.jpg`,
    duration: "1 час",
    includes: ["Тренажеры", "Йога", "Душ"]
  },
  {
    id: 7,
    title: "Конференц-зал",
    description: "Проведение бизнес-мероприятий до 100 человек",
    price: "от 1'900 CHF",
    category: "business",
    isPopular: false,
    image: `${imagesPath}conference.jpg`,
    duration: "4 часа",
    includes: ["Проектор", "Микрофон", "Кофе-брейк"]
  },
  {
    id: 8,
    title: "Бассейн",
    description: "Крытый подогреваемый бассейн и джакузи",
    price: "Бесплатно",
    category: "sport",
    isPopular: false,
    image: `${imagesPath}pool.jpg`,
    duration: "Не ограничено",
    includes: ["Бассейн", "Джакузи", "Шезлонги"]
  }
];

export const getPopularServices = () => services.filter(s => s.isPopular);