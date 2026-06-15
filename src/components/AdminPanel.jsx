// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import {
  getAllRequests,
  updateRequest,
  deleteRequest,
  getRequestsStats,
  RequestStatus,
  StatusColors,
  StatusLabels,
  formatDate,
  formatDateTime,
  exportRequestsToJSON,
  searchRequests,
  sortRequests,
} from '../utils/requestUtils';

const AdminPanel = ({ onClose }) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'stats'

  // Загрузка данных
  const loadData = () => {
    const allRequests = getAllRequests();
    setRequests(allRequests);
    setStats(getRequestsStats());
    applyFilters(allRequests, searchTerm, statusFilter, sortBy, sortOrder);
  };

  // Применение фильтров и сортировки
  const applyFilters = (data, search, status, sort, order) => {
    let filtered = [...data];
    
    // Поиск
    if (search) {
      filtered = searchRequests(search);
    }
    
    // Фильтр по статусу
    if (status !== 'all') {
      filtered = filtered.filter(req => req.status === status);
    }
    
    // Сортировка
    filtered = sortRequests(filtered, sort, order);
    
    setFilteredRequests(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters(requests, searchTerm, statusFilter, sortBy, sortOrder);
  }, [searchTerm, statusFilter, sortBy, sortOrder, requests]);

  // Обновление статуса заявки
  const handleStatusChange = (id, newStatus) => {
    updateRequest(id, { status: newStatus });
    loadData();
  };

  // Удаление заявки
  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      deleteRequest(id);
      loadData();
      if (selectedRequest?.id === id) {
        setIsModalOpen(false);
        setSelectedRequest(null);
      }
    }
  };

  // Открытие модального окна с деталями
  const openRequestDetails = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Экспорт данных
  const handleExport = () => {
    exportRequestsToJSON();
  };

  // Количество заявок по статусам
  const getStatusCount = (status) => {
    if (status === 'all') return requests.length;
    return requests.filter(req => req.status === status).length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Заголовок */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">👨‍💼 Админ-панель</h2>
              <p className="text-amber-100 text-sm mt-1">Управление заявками Mövenpick Hotel</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl leading-none"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Вкладки */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'requests'
                ? 'text-amber-600 border-b-2 border-amber-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📋 Заявки ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'stats'
                ? 'text-amber-600 border-b-2 border-amber-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 Статистика
          </button>
        </div>

        {/* Контент */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {activeTab === 'requests' ? (
            <>
              {/* Панель фильтров */}
              <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="🔍 Поиск по имени, телефону, услуге..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                >
                  <option value="all">Все статусы ({getStatusCount('all')})</option>
                  <option value={RequestStatus.PENDING}>⏳ Ожидает ({getStatusCount(RequestStatus.PENDING)})</option>
                  <option value={RequestStatus.PROCESSING}>🔄 Обрабатывается ({getStatusCount(RequestStatus.PROCESSING)})</option>
                  <option value={RequestStatus.CONFIRMED}>✅ Подтверждена ({getStatusCount(RequestStatus.CONFIRMED)})</option>
                  <option value={RequestStatus.COMPLETED}>✔️ Выполнена ({getStatusCount(RequestStatus.COMPLETED)})</option>
                  <option value={RequestStatus.CANCELLED}>❌ Отменена ({getStatusCount(RequestStatus.CANCELLED)})</option>
                </select>

                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  📥 Экспорт JSON
                </button>

                <button
                  onClick={loadData}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  🔄 Обновить
                </button>
              </div>

              {/* Таблица заявок */}
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  📭 Заявок не найдено
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Клиент</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Услуга</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Дата</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Статус</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Создано</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono text-gray-500">
                            {request.id?.slice(-8)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-800">{request.name}</div>
                            <div className="text-xs text-gray-400">{request.phone}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">
                            {request.service}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {formatDate(request.date)}
                            {request.time && <div className="text-xs text-gray-400">{request.time}</div>}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={request.status}
                              onChange={(e) => handleStatusChange(request.id, e.target.value)}
                              className={`px-2 py-1 text-xs rounded-full font-semibold cursor-pointer ${StatusColors[request.status]} border-0 focus:ring-2 focus:ring-amber-500`}
                            >
                              <option value={RequestStatus.PENDING}>⏳ Ожидает</option>
                              <option value={RequestStatus.PROCESSING}>🔄 Обрабатывается</option>
                              <option value={RequestStatus.CONFIRMED}>✅ Подтверждена</option>
                              <option value={RequestStatus.COMPLETED}>✔️ Выполнена</option>
                              <option value={RequestStatus.CANCELLED}>❌ Отменена</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {formatDateTime(request.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openRequestDetails(request)}
                                className="text-blue-500 hover:text-blue-700 text-sm"
                              >
                                👁️
                              </button>
                              <button
                                onClick={() => handleDelete(request.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            /* Статистика */
            stats && (
              <div className="space-y-6">
                {/* Общая статистика */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-gray-600">Всего заявок</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</div>
                    <div className="text-sm text-gray-600">Ожидают</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.confirmed || 0}</div>
                    <div className="text-sm text-gray-600">Подтверждено</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-600">{stats.completed || 0}</div>
                    <div className="text-sm text-gray-600">Выполнено</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.cancelled || 0}</div>
                    <div className="text-sm text-gray-600">Отменено</div>
                  </div>
                </div>

                {/* Статистика по услугам */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Популярность услуг</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.byService || {}).map(([service, count]) => (
                      <div key={service}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{service}</span>
                          <span className="text-gray-500">{count} заявок</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Статистика по месяцам */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Заявки по месяцам</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.byMonth || {}).map(([month, count]) => (
                      <div key={month}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{month}</span>
                          <span className="text-gray-500">{count} заявок</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Модальное окно с деталями заявки */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Детали заявки</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">ID заявки</p>
                  <p className="font-mono text-sm">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Статус</p>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => {
                      handleStatusChange(selectedRequest.id, e.target.value);
                      setSelectedRequest({ ...selectedRequest, status: e.target.value });
                    }}
                    className={`mt-1 px-2 py-1 text-sm rounded-full font-semibold cursor-pointer ${StatusColors[selectedRequest.status]} border-0`}
                  >
                    <option value={RequestStatus.PENDING}>⏳ Ожидает</option>
                    <option value={RequestStatus.PROCESSING}>🔄 Обрабатывается</option>
                    <option value={RequestStatus.CONFIRMED}>✅ Подтверждена</option>
                    <option value={RequestStatus.COMPLETED}>✔️ Выполнена</option>
                    <option value={RequestStatus.CANCELLED}>❌ Отменена</option>
                  </select>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Клиент</p>
                <p className="font-semibold">{selectedRequest.name}</p>
                <p className="text-gray-600">{selectedRequest.phone}</p>
                {selectedRequest.email && <p className="text-gray-600">{selectedRequest.email}</p>}
              </div>

              <div>
                <p className="text-gray-500 text-sm">Услуга</p>
                <p className="font-semibold">{selectedRequest.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Дата</p>
                  <p>{formatDate(selectedRequest.date)}</p>
                </div>
                {selectedRequest.time && (
                  <div>
                    <p className="text-gray-500 text-sm">Время</p>
                    <p>{selectedRequest.time}</p>
                  </div>
                )}
              </div>

              {selectedRequest.guests && (
                <div>
                  <p className="text-gray-500 text-sm">Количество гостей</p>
                  <p>{selectedRequest.guests} чел.</p>
                </div>
              )}

              {selectedRequest.comment && (
                <div>
                  <p className="text-gray-500 text-sm">Комментарий</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRequest.comment}</p>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => handleDelete(selectedRequest.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  🗑️ Удалить заявку
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;