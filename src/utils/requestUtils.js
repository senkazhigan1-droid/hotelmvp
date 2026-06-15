// src/utils/requestUtils.js

// Ключ для хранения в localStorage
const STORAGE_KEY = 'hotel_requests';

// Типы статусов заявок
export const RequestStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Цвета статусов для UI
export const StatusColors = {
  [RequestStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [RequestStatus.PROCESSING]: 'bg-blue-100 text-blue-800',
  [RequestStatus.CONFIRMED]: 'bg-green-100 text-green-800',
  [RequestStatus.COMPLETED]: 'bg-gray-100 text-gray-800',
  [RequestStatus.CANCELLED]: 'bg-red-100 text-red-800',
};

// Русские названия статусов
export const StatusLabels = {
  [RequestStatus.PENDING]: 'Ожидает обработки',
  [RequestStatus.PROCESSING]: 'Обрабатывается',
  [RequestStatus.CONFIRMED]: 'Подтверждена',
  [RequestStatus.COMPLETED]: 'Выполнена',
  [RequestStatus.CANCELLED]: 'Отменена',
};

/**
 * Получение всех заявок из localStorage
 */
export const getAllRequests = () => {
  try {
    const requests = localStorage.getItem(STORAGE_KEY);
    return requests ? JSON.parse(requests) : [];
  } catch (error) {
    console.error('Ошибка при получении заявок:', error);
    return [];
  }
};

/**
 * Сохранение заявок в localStorage
 */
export const saveRequests = (requests) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении заявок:', error);
    return false;
  }
};

/**
 * Добавление новой заявки
 */
export const addRequest = (requestData) => {
  const requests = getAllRequests();
  
  const newRequest = {
    id: generateId(),
    ...requestData,
    status: RequestStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  requests.unshift(newRequest); // Добавляем в начало массива
  saveRequests(requests);
  
  return newRequest;
};

/**
 * Обновление существующей заявки
 */
export const updateRequest = (id, updateData) => {
  const requests = getAllRequests();
  const index = requests.findIndex(req => req.id === id);
  
  if (index === -1) return null;
  
  requests[index] = {
    ...requests[index],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  saveRequests(requests);
  return requests[index];
};

/**
 * Удаление заявки
 */
export const deleteRequest = (id) => {
  const requests = getAllRequests();
  const filteredRequests = requests.filter(req => req.id !== id);
  saveRequests(filteredRequests);
  return true;
};

/**
 * Получение заявки по ID
 */
export const getRequestById = (id) => {
  const requests = getAllRequests();
  return requests.find(req => req.id === id) || null;
};

/**
 * Получение заявок по статусу
 */
export const getRequestsByStatus = (status) => {
  const requests = getAllRequests();
  return requests.filter(req => req.status === status);
};

/**
 * Получение заявок по услуге
 */
export const getRequestsByService = (service) => {
  const requests = getAllRequests();
  return requests.filter(req => req.service === service);
};

/**
 * Получение заявок за период
 */
export const getRequestsByDateRange = (startDate, endDate) => {
  const requests = getAllRequests();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return requests.filter(req => {
    const requestDate = new Date(req.date);
    return requestDate >= start && requestDate <= end;
  });
};

/**
 * Изменение статуса заявки
 */
export const changeRequestStatus = (id, newStatus) => {
  return updateRequest(id, { status: newStatus });
};

/**
 * Генерация уникального ID
 */
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

/**
 * Валидация данных заявки перед отправкой
 */
export const validateRequestData = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа';
  }
  
  if (!data.phone || data.phone.trim().length < 10) {
    errors.phone = 'Введите корректный номер телефона';
  }
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Введите корректный email';
  }
  
  if (!data.service) {
    errors.service = 'Выберите услугу';
  }
  
  if (!data.date) {
    errors.date = 'Выберите дату';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = 'Дата не может быть в прошлом';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Форматирование даты для отображения
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Форматирование времени для отображения
 */
export const formatTime = (timeString) => {
  if (!timeString) return '—';
  return timeString;
};

/**
 * Форматирование даты и времени создания заявки
 */
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Получение статистики по заявкам
 */
export const getRequestsStats = () => {
  const requests = getAllRequests();
  
  const stats = {
    total: requests.length,
    pending: 0,
    processing: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    byService: {},
    byMonth: {},
  };
  
  requests.forEach(request => {
    // Статистика по статусам
    stats[request.status]++;
    
    // Статистика по услугам
    if (stats.byService[request.service]) {
      stats.byService[request.service]++;
    } else {
      stats.byService[request.service] = 1;
    }
    
    // Статистика по месяцам
    const month = new Date(request.createdAt).toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
    if (stats.byMonth[month]) {
      stats.byMonth[month]++;
    } else {
      stats.byMonth[month] = 1;
    }
  });
  
  return stats;
};

/**
 * Очистка всех заявок (для тестирования)
 */
export const clearAllRequests = () => {
  localStorage.removeItem(STORAGE_KEY);
  return true;
};

/**
 * Экспорт заявок в JSON
 */
export const exportRequestsToJSON = () => {
  const requests = getAllRequests();
  const dataStr = JSON.stringify(requests, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `hotel_requests_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

/**
 * Импорт заявок из JSON
 */
export const importRequestsFromJSON = (jsonString) => {
  try {
    const requests = JSON.parse(jsonString);
    if (Array.isArray(requests)) {
      saveRequests(requests);
      return { success: true, count: requests.length };
    }
    return { success: false, error: 'Неверный формат данных' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Поиск заявок по тексту
 */
export const searchRequests = (searchText) => {
  const requests = getAllRequests();
  const searchLower = searchText.toLowerCase();
  
  return requests.filter(request => {
    return (
      request.name?.toLowerCase().includes(searchLower) ||
      request.phone?.includes(searchText) ||
      (request.email && request.email.toLowerCase().includes(searchLower)) ||
      request.service?.toLowerCase().includes(searchLower) ||
      (request.comment && request.comment.toLowerCase().includes(searchLower))
    );
  });
};

/**
 * Сортировка заявок
 */
export const sortRequests = (requests, sortBy = 'createdAt', sortOrder = 'desc') => {
  const sorted = [...requests];
  
  sorted.sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    if (sortBy === 'date' || sortBy === 'createdAt') {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }
    
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};

export default {
  getAllRequests,
  addRequest,
  updateRequest,
  deleteRequest,
  getRequestById,
  getRequestsByStatus,
  getRequestsByService,
  getRequestsByDateRange,
  changeRequestStatus,
  validateRequestData,
  formatDate,
  formatTime,
  formatDateTime,
  getRequestsStats,
  clearAllRequests,
  exportRequestsToJSON,
  importRequestsFromJSON,
  searchRequests,
  sortRequests,
  RequestStatus,
  StatusColors,
  StatusLabels,
};