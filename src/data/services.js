export const services = [
  {
    id: 1,
    title: "Шоколадный час 🍫",
    description: "Ежедневное бесплатное шоколадное фондю с 15:00 до 16:00",
    price: "Бесплатно",
    category: "special",
    isPopular: true,
    image: "https://cdn.pixabay.com/photo/2018/02/22/06/44/chocolate-3171824_640.jpg"
  },
  {
    id: 2,
    title: "Премиум СПА 💆",
    description: "Расслабляющие процедуры с массажем и обертываниями",
    price: "от 5 000 ₽",
    category: "spa",
    isPopular: true,
    image: "https://cdn.pixabay.com/photo/2016/11/14/21/03/massage-1824566_640.jpg"
  },
  {
    id: 3,
    title: "Ресторан Mövenpick 🍽️",
    description: "Изысканная швейцарская кухня от шеф-повара",
    price: "от 2 500 ₽",
    category: "restaurant",
    isPopular: true,
    image: "https://cdn.pixabay.com/photo/2016/11/18/22/21/restaurant-1837150_640.jpg"
  },
  {
    id: 4,
    title: "Люкс номер 🛏️",
    description: "Просторный номер с панорамным видом на горы",
    price: "от 15 000 ₽/ночь",
    category: "room",
    isPopular: true,
    image: "https://cdn.pixabay.com/photo/2016/06/29/15/45/bedroom-1487188_640.jpg"
  },
  {
    id: 5,
    title: "Трансфер из аэропорта 🚗",
    description: "Встреча с табличкой, комфортабельный автомобиль",
    price: "3 000 ₽",
    category: "transport",
    isPopular: false,
    image: "https://cdn.pixabay.com/photo/2018/04/25/07/46/mercedes-benz-3349644_640.jpg"
  },
  {
    id: 6,
    title: "Фитнес центр 💪",
    description: "Современные тренажеры и йога",
    price: "Бесплатно для гостей",
    category: "sport",
    isPopular: false,
    image: "https://cdn.pixabay.com/photo/2016/11/08/07/09/gym-1807533_640.jpg"
  },
  {
    id: 7,
    title: "Конференц-зал 📊",
    description: "Проведение бизнес-мероприятий до 100 человек",
    price: "от 20 000 ₽",
    category: "business",
    isPopular: false,
    image: "https://cdn.pixabay.com/photo/2015/01/08/18/25/entrepreneur-593358_640.jpg"
  },
  {
    id: 8,
    title: "Бассейн 🏊",
    description: "Крытый подогреваемый бассейн и джакузи",
    price: "Бесплатно",
    category: "sport",
    isPopular: false,
    image: "https://cdn.pixabay.com/photo/2015/05/15/14/29/pool-768619_640.jpg"
  }
];

export const getPopularServices = () => services.filter(s => s.isPopular);