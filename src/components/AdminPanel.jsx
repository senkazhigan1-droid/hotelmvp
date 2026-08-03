// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react'
import { 
  getAllRequests, 
  changeRequestStatus, 
  deleteRequest,
  RequestStatus,
  StatusColors,
  StatusLabels,
  searchRequests,
  sortRequests,
  getRequestsStats
} from '../utils/requestUtils'

export default function AdminPanel() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [stats, setStats] = useState({})

  // Загрузка данных при монтировании
  useEffect(() => {
    loadRequests()
  }, [])

  // ✅ АСИНХРОННАЯ ЗАГРУЗКА ЗАЯВОК ИЗ SUPABASE
  const loadRequests = async () => {
    setLoading(true)
    try {
      const data = await getAllRequests()
      setRequests(data)
      setStats(getRequestsStats(data))
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ ПОИСК СРЕДИ ЗАГРУЖЕННЫХ ЗАЯВОК
  const handleSearch = (text) => {
    setSearchText(text)
    if (text.trim()) {
      const results = searchRequests(requests, text)
      setRequests(results)
    } else {
      loadRequests()
    }
  }

  // ✅ СОРТИРОВКА
  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortBy(field)
    setSortOrder(newOrder)
    const sorted = sortRequests(requests, field, newOrder)
    setRequests(sorted)
  }

  // ✅ ИЗМЕНЕНИЕ СТАТУСА В SUPABASE
  const handleStatusChange = async (id, status) => {
    try {
      await changeRequestStatus(id, status)
      await loadRequests() // Перезагружаем список
    } catch (error) {
      console.error('Ошибка изменения статуса:', error)
      alert('Не удалось изменить статус')
    }
  }

  // ✅ УДАЛЕНИЕ ЗАЯВКИ ИЗ SUPABASE
  const handleDelete = async (id) => {
    if (window.confirm('Удалить заявку?')) {
      try {
        await deleteRequest(id)
        await loadRequests() // Перезагружаем список
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Не удалось удалить заявку')
      }
    }
  }

  // Индикатор загрузки
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100/80 to-orange-50/90 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-700">Загрузка заявок...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100/80 to-orange-50/90 py-8">
      <div className="container mx-auto px-4">
        {/* Шапка */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-800 font-serif">Админ-панель</h1>
            <p className="text-amber-600/70">Управление заявками Mövenpick Hotel</p>
          </div>
          <button 
            onClick={loadRequests}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
          >
            🔄 Обновить
          </button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-amber-200/30 text-center">
            <p className="text-2xl font-bold text-amber-800">{stats.total || 0}</p>
            <p className="text-amber-600/70 text-sm">Всего</p>
          </div>
          <div className="bg-yellow-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-yellow-200/30 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</p>
            <p className="text-yellow-600/70 text-sm">Ожидают</p>
          </div>
          <div className="bg-blue-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-200/30 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.processing || 0}</p>
            <p className="text-blue-600/70 text-sm">В работе</p>
          </div>
          <div className="bg-green-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-green-200/30 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.confirmed || 0}</p>
            <p className="text-green-600/70 text-sm">Подтверждены</p>
          </div>
          <div className="bg-gray-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200/30 text-center">
            <p className="text-2xl font-bold text-gray-600">{stats.completed || 0}</p>
            <p className="text-gray-600/70 text-sm">Выполнены</p>
          </div>
        </div>

        {/* Поиск и сортировка */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-amber-200/30">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Поиск по имени, телефону, услуге..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-amber-200/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm text-amber-800 placeholder-amber-400/50"
            />
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-amber-200/50 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/50 backdrop-blur-sm text-amber-800"
            >
              <option value="created_at">По дате</option>
              <option value="name">По имени</option>
              <option value="service">По услуге</option>
              <option value="status">По статусу</option>
            </select>
            <button 
              onClick={() => handleSort(sortBy)} 
              className="px-4 py-2 bg-amber-100/50 backdrop-blur-sm rounded-xl hover:bg-amber-200/50 transition-colors text-amber-700 border border-amber-200/30"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        {/* Таблица заявок */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-amber-200/30">
          {requests.length === 0 ? (
            <div className="p-12 text-center text-amber-600/70">
              Заявок пока нет
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-amber-50/80 backdrop-blur-sm border-b border-amber-200/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Имя</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Телефон</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Услуга</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Дата</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Статус</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b border-amber-100/50 hover:bg-amber-50/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-amber-600/70">
                        {String(req.id).slice(0, 8)}
                      </td>
                      <td className="px-4 py-3 font-medium text-amber-800">{req.name}</td>
                      <td className="px-4 py-3 text-amber-600/70">{req.phone}</td>
                      <td className="px-4 py-3 text-amber-600/70">{req.service}</td>
                      <td className="px-4 py-3 text-amber-600/70">{req.date}</td>
                      <td className="px-4 py-3">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${StatusColors[req.status]}`}
                        >
                          {Object.entries(RequestStatus).map(([key, value]) => (
                            <option key={value} value={value}>
                              {StatusLabels[value]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => handleDelete(req.id)} 
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react'
import { 
  getAllRequests, 
  changeRequestStatus, 
  deleteRequest,
  RequestStatus,
  StatusColors,
  StatusLabels,
  searchRequests,
  sortRequests,
  getRequestsStats
} from '../utils/requestUtils'

export default function AdminPanel() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [stats, setStats] = useState({})

  // Загрузка данных при монтировании
  useEffect(() => {
    loadRequests()
  }, [])

  // ✅ АСИНХРОННАЯ ЗАГРУЗКА ЗАЯВОК ИЗ SUPABASE
  const loadRequests = async () => {
    setLoading(true)
    try {
      const data = await getAllRequests()
      setRequests(data)
      setStats(getRequestsStats(data))
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ ПОИСК СРЕДИ ЗАГРУЖЕННЫХ ЗАЯВОК
  const handleSearch = (text) => {
    setSearchText(text)
    if (text.trim()) {
      const results = searchRequests(requests, text)
      setRequests(results)
    } else {
      loadRequests()
    }
  }

  // ✅ СОРТИРОВКА
  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortBy(field)
    setSortOrder(newOrder)
    const sorted = sortRequests(requests, field, newOrder)
    setRequests(sorted)
  }

  // ✅ ИЗМЕНЕНИЕ СТАТУСА В SUPABASE
  const handleStatusChange = async (id, status) => {
    try {
      await changeRequestStatus(id, status)
      await loadRequests() // Перезагружаем список
    } catch (error) {
      console.error('Ошибка изменения статуса:', error)
      alert('Не удалось изменить статус')
    }
  }

  // ✅ УДАЛЕНИЕ ЗАЯВКИ ИЗ SUPABASE
  const handleDelete = async (id) => {
    if (window.confirm('Удалить заявку?')) {
      try {
        await deleteRequest(id)
        await loadRequests() // Перезагружаем список
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Не удалось удалить заявку')
      }
    }
  }

  // Индикатор загрузки
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100/80 to-orange-50/90 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-700">Загрузка заявок...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100/80 to-orange-50/90 py-8">
      <div className="container mx-auto px-4">
        {/* Шапка */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-800 font-serif">Админ-панель</h1>
            <p className="text-amber-600/70">Управление заявками Mövenpick Hotel</p>
          </div>
          <button 
            onClick={loadRequests}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
          >
            🔄 Обновить
          </button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-amber-200/30 text-center">
            <p className="text-2xl font-bold text-amber-800">{stats.total || 0}</p>
            <p className="text-amber-600/70 text-sm">Всего</p>
          </div>
          <div className="bg-yellow-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-yellow-200/30 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</p>
            <p className="text-yellow-600/70 text-sm">Ожидают</p>
          </div>
          <div className="bg-blue-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-200/30 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.processing || 0}</p>
            <p className="text-blue-600/70 text-sm">В работе</p>
          </div>
          <div className="bg-green-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-green-200/30 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.confirmed || 0}</p>
            <p className="text-green-600/70 text-sm">Подтверждены</p>
          </div>
          <div className="bg-gray-50/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200/30 text-center">
            <p className="text-2xl font-bold text-gray-600">{stats.completed || 0}</p>
            <p className="text-gray-600/70 text-sm">Выполнены</p>
          </div>
        </div>

        {/* Поиск и сортировка */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-amber-200/30">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Поиск по имени, телефону, услуге..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-amber-200/50 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/50 backdrop-blur-sm text-amber-800 placeholder-amber-400/50"
            />
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-amber-200/50 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white/50 backdrop-blur-sm text-amber-800"
            >
              <option value="created_at">По дате</option>
              <option value="name">По имени</option>
              <option value="service">По услуге</option>
              <option value="status">По статусу</option>
            </select>
            <button 
              onClick={() => handleSort(sortBy)} 
              className="px-4 py-2 bg-amber-100/50 backdrop-blur-sm rounded-xl hover:bg-amber-200/50 transition-colors text-amber-700 border border-amber-200/30"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        {/* Таблица заявок */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-amber-200/30">
          {requests.length === 0 ? (
            <div className="p-12 text-center text-amber-600/70">
              Заявок пока нет
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-amber-50/80 backdrop-blur-sm border-b border-amber-200/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Имя</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Телефон</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Услуга</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Дата</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Статус</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-amber-700">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b border-amber-100/50 hover:bg-amber-50/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-amber-600/70">
                        {String(req.id).slice(0, 8)}
                      </td>
                      <td className="px-4 py-3 font-medium text-amber-800">{req.name}</td>
                      <td className="px-4 py-3 text-amber-600/70">{req.phone}</td>
                      <td className="px-4 py-3 text-amber-600/70">{req.service}</td>
                      <td className="px-4 py-3 text-amber-600/70">{req.date}</td>
                      <td className="px-4 py-3">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${StatusColors[req.status]}`}
                        >
                          {Object.entries(RequestStatus).map(([key, value]) => (
                            <option key={value} value={value}>
                              {StatusLabels[value]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => handleDelete(req.id)} 
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}