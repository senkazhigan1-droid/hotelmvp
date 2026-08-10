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

  useEffect(() => {
    loadRequests()
  }, [])

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

  const handleSearch = (text) => {
    setSearchText(text)
    if (text.trim()) {
      const results = searchRequests(requests, text)
      setRequests(results)
    } else {
      loadRequests()
    }
  }

  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortBy(field)
    setSortOrder(newOrder)
    const sorted = sortRequests(requests, field, newOrder)
    setRequests(sorted)
  }

  const handleStatusChange = async (id, status) => {
    try {
      await changeRequestStatus(id, status)
      await loadRequests()
    } catch (error) {
      console.error('Ошибка изменения статуса:', error)
      alert('Не удалось изменить статус')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Удалить заявку?')) {
      try {
        await deleteRequest(id)
        await loadRequests()
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Не удалось удалить заявку')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка заявок...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-serif">Админ-панель</h1>
            <p className="text-gray-500">Управление заявками Mövenpick Hotel</p>
          </div>
          <button 
            onClick={loadRequests}
            className="btn-primary"
          >
            Обновить
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-gold">{stats.total || 0}</p>
            <p className="text-gray-500 text-sm">Всего</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</p>
            <p className="text-gray-500 text-sm">Ожидают</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-blue-600">{stats.processing || 0}</p>
            <p className="text-gray-500 text-sm">В работе</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-green-600">{stats.confirmed || 0}</p>
            <p className="text-gray-500 text-sm">Подтверждены</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-2xl font-bold text-gray-600">{stats.completed || 0}</p>
            <p className="text-gray-500 text-sm">Выполнены</p>
          </div>
        </div>

        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Поиск по имени, телефону, услуге..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="input-field flex-1"
            />
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="input-field md:w-48"
            >
              <option value="created_at">По дате</option>
              <option value="name">По имени</option>
              <option value="service">По услуге</option>
              <option value="status">По статусу</option>
            </select>
            <button 
              onClick={() => handleSort(sortBy)} 
              className="px-4 py-2 bg-cream rounded-soft hover:bg-gold-50 transition-colors text-gray-700 border border-gold-100"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        <div className="card overflow-hidden">
          {requests.length === 0 ? (
            <div className="p-12 text-center text-gray-500">Заявок пока нет</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream border-b border-gold-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Имя</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Телефон</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Услуга</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Дата</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Статус</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b border-gold-50 hover:bg-cream transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-gray-500">{String(req.id).slice(0, 8)}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{req.name}</td>
                      <td className="px-4 py-3 text-gray-600">{req.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{req.service}</td>
                      <td className="px-4 py-3 text-gray-600">{req.date}</td>
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