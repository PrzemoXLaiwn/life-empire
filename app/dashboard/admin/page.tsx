'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Users, Ban, UserX, Edit3, Check, X, Crown, Star, AlertTriangle } from 'lucide-react'

interface UserData {
  id: string
  email: string
  role: string
  banned: boolean
  bannedAt: string | null
  bannedBy: string | null
  banReason: string | null
  createdAt: string
  character: {
    username: string
    level: number
    cash: number
    avatar: string
  } | null
}

export default function AdminPanel() {
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState<'ban' | 'unban' | 'changeRole' | 'kick' | null>(null)
  const [banReason, setBanReason] = useState('')
  const [newRole, setNewRole] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.status === 403) {
        setMessage({ type: 'error', text: 'Brak uprawnień do panelu admina!' })
        setTimeout(() => router.push('/dashboard'), 2000)
        return
      }

      if (!response.ok) throw new Error('Failed to fetch users')

      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      console.error('Error fetching users:', error)
      setMessage({ type: 'error', text: 'Błąd ładowania użytkowników' })
    } finally {
      setLoading(false)
    }
  }

  const openModal = (user: UserData, action: typeof modalAction) => {
    setSelectedUser(user)
    setModalAction(action)
    setShowModal(true)
    setBanReason('')
    setNewRole(user.role)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
    setModalAction(null)
    setBanReason('')
  }

  const performAction = async () => {
    if (!selectedUser || !modalAction || processing) return

    setProcessing(true)
    setMessage(null)

    try {
      const body: any = {
        action: modalAction,
        targetUserId: selectedUser.id
      }

      if (modalAction === 'ban') {
        body.reason = banReason || 'No reason provided'
      }

      if (modalAction === 'changeRole') {
        body.role = newRole
      }

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Action failed')
      }

      setMessage({ type: 'success', text: data.message })
      closeModal()
      await fetchUsers()
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setProcessing(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return '#d9534f'
      case 'MODERATOR': return '#f0ad4e'
      case 'VIP': return '#5bc0de'
      default: return '#888'
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN': return '👑'
      case 'MODERATOR': return '🛡️'
      case 'VIP': return '⭐'
      default: return '👤'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#d9534f] mx-auto mb-4 animate-pulse" />
          <p className="text-[#888]">Ładowanie panelu admina...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] border border-[#333] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12 text-[#d9534f]" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Panel Admina</h1>
              <p className="text-sm text-[#888]">Zarządzanie użytkownikami i systemem</p>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 border rounded-lg ${
            message.type === 'success'
              ? 'bg-[#5cb85c]/10 border-[#5cb85c]'
              : 'bg-[#d9534f]/10 border-[#d9534f]'
          }`}>
            <p className={`text-sm font-bold ${
              message.type === 'success' ? 'text-[#5cb85c]' : 'text-[#d9534f]'
            }`}>
              {message.text}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-[#5bc0de]" />
              <div>
                <p className="text-xs text-[#888]">Wszyscy użytkownicy</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-[#d9534f]" />
              <div>
                <p className="text-xs text-[#888]">Admini</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'ADMIN').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-[#5bc0de]" />
              <div>
                <p className="text-xs text-[#888]">VIP</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'VIP').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Ban className="w-8 h-8 text-[#d9534f]" />
              <div>
                <p className="text-xs text-[#888]">Zbanowani</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.banned).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f0f0f] border-b border-[#333]">
                <tr>
                  <th className="text-left p-4 text-xs font-bold text-[#888] uppercase">Użytkownik</th>
                  <th className="text-left p-4 text-xs font-bold text-[#888] uppercase">Email</th>
                  <th className="text-left p-4 text-xs font-bold text-[#888] uppercase">Rola</th>
                  <th className="text-left p-4 text-xs font-bold text-[#888] uppercase">Status</th>
                  <th className="text-left p-4 text-xs font-bold text-[#888] uppercase">Postać</th>
                  <th className="text-right p-4 text-xs font-bold text-[#888] uppercase">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#222] hover:bg-[#222] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getRoleBadge(user.role)}</span>
                        <span className="text-sm text-white font-bold">
                          {user.character?.username || 'No character'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-[#888]">{user.email}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-bold"
                        style={{
                          backgroundColor: `${getRoleColor(user.role)}20`,
                          color: getRoleColor(user.role)
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.banned ? (
                        <div className="flex items-center gap-2">
                          <Ban className="w-4 h-4 text-[#d9534f]" />
                          <span className="text-xs text-[#d9534f] font-bold">BANNED</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#5cb85c]" />
                          <span className="text-xs text-[#5cb85c] font-bold">ACTIVE</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {user.character ? (
                        <div className="text-xs text-[#888]">
                          <div>Lvl {user.character.level}</div>
                          <div>${user.character.cash.toLocaleString()}</div>
                        </div>
                      ) : (
                        <span className="text-xs text-[#666]">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {!user.banned ? (
                          <button
                            onClick={() => openModal(user, 'ban')}
                            className="p-2 bg-[#d9534f]/20 hover:bg-[#d9534f]/30 border border-[#d9534f] rounded transition-colors"
                            title="Ban użytkownika"
                          >
                            <Ban className="w-4 h-4 text-[#d9534f]" />
                          </button>
                        ) : (
                          <button
                            onClick={() => openModal(user, 'unban')}
                            className="p-2 bg-[#5cb85c]/20 hover:bg-[#5cb85c]/30 border border-[#5cb85c] rounded transition-colors"
                            title="Unban użytkownika"
                          >
                            <Check className="w-4 h-4 text-[#5cb85c]" />
                          </button>
                        )}
                        <button
                          onClick={() => openModal(user, 'kick')}
                          className="p-2 bg-[#f0ad4e]/20 hover:bg-[#f0ad4e]/30 border border-[#f0ad4e] rounded transition-colors"
                          title="Kick użytkownika"
                        >
                          <UserX className="w-4 h-4 text-[#f0ad4e]" />
                        </button>
                        <button
                          onClick={() => openModal(user, 'changeRole')}
                          className="p-2 bg-[#5bc0de]/20 hover:bg-[#5bc0de]/30 border border-[#5bc0de] rounded transition-colors"
                          title="Zmień rolę"
                        >
                          <Edit3 className="w-4 h-4 text-[#5bc0de]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                {modalAction === 'ban' && 'Zbanuj użytkownika'}
                {modalAction === 'unban' && 'Odbanuj użytkownika'}
                {modalAction === 'kick' && 'Wyrzuć użytkownika (Kick)'}
                {modalAction === 'changeRole' && 'Zmień rolę użytkownika'}
              </h3>

              <div className="mb-6">
                <p className="text-sm text-[#888] mb-2">Użytkownik:</p>
                <p className="text-white font-bold">
                  {selectedUser.character?.username || selectedUser.email}
                </p>
              </div>

              {modalAction === 'ban' && (
                <div className="mb-6">
                  <label className="block text-sm text-[#888] mb-2">Powód bana:</label>
                  <textarea
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded text-white text-sm"
                    rows={3}
                    placeholder="Podaj powód bana..."
                  />
                </div>
              )}

              {modalAction === 'changeRole' && (
                <div className="mb-6">
                  <label className="block text-sm text-[#888] mb-2">Nowa rola:</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded text-white text-sm"
                  >
                    <option value="USER">USER (Zwykły)</option>
                    <option value="VIP">VIP (Premium)</option>
                    <option value="MODERATOR">MODERATOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  disabled={processing}
                  className="flex-1 px-4 py-3 bg-[#333] hover:bg-[#444] text-white font-bold rounded transition-colors disabled:opacity-50"
                >
                  Anuluj
                </button>
                <button
                  onClick={performAction}
                  disabled={processing}
                  className={`flex-1 px-4 py-3 text-white font-bold rounded transition-colors disabled:opacity-50 ${
                    modalAction === 'ban'
                      ? 'bg-[#d9534f] hover:bg-[#c9302c]'
                      : modalAction === 'unban'
                      ? 'bg-[#5cb85c] hover:bg-[#4a9d4a]'
                      : 'bg-[#5bc0de] hover:bg-[#46b8da]'
                  }`}
                >
                  {processing ? 'Przetwarzanie...' : 'Potwierdź'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
