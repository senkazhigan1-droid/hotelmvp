// src/utils/requestUtils.js
import { supabase } from '../lib/supabaseClient'

export const RequestStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const StatusColors = {
  [RequestStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [RequestStatus.PROCESSING]: 'bg-blue-100 text-blue-800',
  [RequestStatus.CONFIRMED]: 'bg-green-100 text-green-800',
  [RequestStatus.COMPLETED]: 'bg-gray-100 text-gray-800',
  [RequestStatus.CANCELLED]: 'bg-red-100 text-red-800',
}

export const StatusLabels = {
  [RequestStatus.PENDING]: 'Ожидает обработки',
  [RequestStatus.PROCESSING]: 'Обрабатывается',
  [RequestStatus.CONFIRMED]: 'Подтверждена',
  [RequestStatus.COMPLETED]: 'Выполнена',
  [RequestStatus.CANCELLED]: 'Отменена',
}

export const getAllRequests = async () => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Ошибка получения заявок:', error)
    return []
  }
}

export const addRequest = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .insert([{
        service: formData.service || '',
        date: formData.date || null,
        time: formData.time || null,
        guests: parseInt(formData.guests) || 1,
        comment: formData.comment || '',
        status: RequestStatus.PENDING,
        // name, phone, email — УДАЛЕНЫ
      }])
      .select()
    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Ошибка добавления заявки:', error)
    return null
  }
}

export const updateRequest = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Ошибка обновления заявки:', error)
    return null
  }
}

export const changeRequestStatus = async (id, status) => {
  return updateRequest(id, { status })
}

export const deleteRequest = async (id) => {
  try {
    const { error } = await supabase
      .from('requests')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  } catch (error) {
    console.error('Ошибка удаления заявки:', error)
    return false
  }
}

export const searchRequests = (requests, searchText) => {
  const lower = searchText.toLowerCase()
  return requests.filter(r =>
    r.service?.toLowerCase().includes(lower) ||
    r.comment?.toLowerCase().includes(lower)
  )
}

export const sortRequests = (requests, sortBy = 'created_at', order = 'desc') => {
  const sorted = [...requests]
  sorted.sort((a, b) => {
    let valA = a[sortBy]
    let valB = b[sortBy]
    if (sortBy === 'created_at' || sortBy === 'date') {
      valA = new Date(valA)
      valB = new Date(valB)
    }
    if (typeof valA === 'string') {
      valA = valA.toLowerCase()
      valB = valB.toLowerCase()
    }
    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })
  return sorted
}

export const getRequestsStats = (requests) => {
  const stats = {
    total: requests.length,
    pending: 0,
    processing: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  }
  requests.forEach(r => {
    if (stats[r.status] !== undefined) {
      stats[r.status]++
    }
  })
  return stats
}