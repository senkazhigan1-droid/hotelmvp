import { supabase } from '../lib/supabaseClient'

export const RequestStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const StatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
}

export const StatusLabels = {
  pending: 'Ожидает обработки',
  processing: 'Обрабатывается',
  confirmed: 'Подтверждена',
  completed: 'Выполнена',
  cancelled: 'Отменена',
}

export const getAllRequests = async () => {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data || []
}

export const addRequest = async (formData) => {
  const { data, error } = await supabase
    .from('requests')
    .insert([{
      name: formData.name,
      phone: formData.phone,
      email: formData.email || '',
      service: formData.service || '',
      date: formData.date || null,
      time: formData.time || null,
      guests: parseInt(formData.guests) || 1,
      comment: formData.comment || '',
      status: RequestStatus.PENDING,
    }])
    .select()
  if (error) return null
  return data?.[0] || null
}

export const updateRequest = async (id, updates) => {
  const { data, error } = await supabase
    .from('requests')
    .update(updates)
    .eq('id', id)
    .select()
  if (error) return null
  return data?.[0] || null
}

export const changeRequestStatus = async (id, status) => {
  return updateRequest(id, { status })
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

export const deleteRequest = async (id) => {
  const { error } = await supabase
    .from('requests')
    .delete()
    .eq('id', id)
  return !error
}