import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../helpers/api";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";
import NotificationDropdown from "../components/notificationDropdown";
import toast from "react-hot-toast";

const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return past.toLocaleDateString();
};

const getNotificationIcon = (type) => {
    switch(type) {
        case 'follow': return 'mdi:account-plus';
        case 'like': return 'mdi:heart';
        case 'comment': return 'mdi:comment';
        default: return 'mdi:bell';
    }
};

const getNotificationColor = (type) => {
    switch(type) {
        case 'follow': return 'from-blue-500 to-blue-600';
        case 'like': return 'from-red-500 to-pink-600';
        case 'comment': return 'from-purple-500 to-purple-600';
        default: return 'from-gray-500 to-gray-600';
    }
};

export default function NotificationPage() {
    const token = Cookies.get("token");
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/notification', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(res.data.content || []);
            setError(null);
        } catch (err) {
            setError(err.message);
            toast.error("Gagal fetch notifikasi");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const getNotificationUrl = (notif) => {
    const postId =
        notif.notified_object?.post_id ??    // ← comment punya ini
        notif.notifiedObject?.post_id ??     // cadangan
        notif.post_id ??                     // kalau API kirim langsung
        notif.notified_object?.id ??         // like fallback
        notif.notifiedObject?.id ??
        null;

    if (!postId) return "/";

    return `/post/${postId}`;
};


    const handleReadNotification = async (id) => {
        try {
            await api.post(`/api/notification/read/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
        } catch (err) {
            toast.error("Gagal membaca notifikasi");
        }
    };

    const handleUnreadNotification = async (id) => {
        try {
            await api.patch(`/api/notification/${id}/unread`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
        } catch (err) {
            toast.error("Gagal mengubah status notifikasi");
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            await api.delete(`/api/notification/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(prev => prev.filter(n => n.id !== id));
            toast.success("Notifikasi dihapus");
        } catch (err) {
            toast.error("Gagal menghapus notifikasi");
        }
    };

    const handleReadAll = async () => {
        try {
            await api.post('/api/notification/readAll', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotifications();
            toast.success("Semua notifikasi ditandai dibaca");
        } catch (err) {
            toast.error("Gagal menandai semua notifikasi");
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'all') return true;
        if (filter === 'unread') return n.is_read === 0;
        return n.type === filter;
    });

    const unreadCount = notifications.filter(n => n.is_read === 0).length;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] text-white p-4 md:p-8">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-bright-yellow"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0D0D0D] text-white p-4 md:p-8">
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-bright-yellow">Notifikasi</span>
                    </h1>
                    <p className="text-gray-400">Kamu memiliki {unreadCount} notifikasi baru</p>
                </div>
                <button
                    onClick={fetchNotifications}
                    className="p-2 hover:bg-[#262626] rounded-full transition-colors"
                    title="Refresh"
                >
                    <Icon icon="mdi:refresh" className="w-6 h-6" />
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['all', 'unread', 'follow', 'like', 'comment'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                            filter === f
                                ? 'bg-bright-yellow text-black'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {f === 'all' ? 'Semua' : f === 'unread' ? 'Belum Dibaca' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Mark All as Read */}
            {unreadCount > 0 && (
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={handleReadAll} 
                        className="flex items-center text-sm text-bright-yellow hover:text-bright-yellow transition-colors"
                    >
                        <Icon icon="ic:round-mark-chat-read" className="mr-2 h-5 w-5" />
                        Tandai Semua Sudah Dibaca
                    </button>
                </div>
            )}

            {/* Notifications List */}
            {filteredNotifications.length > 0 ? (
                <div className="space-y-3">
                    {filteredNotifications.map((notif) => (
                        <Link
                            key={notif.id}
                            to={getNotificationUrl(notif)}
                            onClick={() => handleReadNotification(notif.id)}
                        >
                            <div 
                                className={`flex items-start p-4 rounded-lg transition-colors
                                    ${notif.is_read === 0 
                                        ? 'bg-[#1a1a1a] border-l-4 border-bright-yellow hover:bg-[#262626]' 
                                        : 'bg-[#121212] border-l-4 border-transparent hover:bg-[#262626]'}`}
                            >
                                {/* Avatar dengan Icon */}
                                <div className={`relative w-14 h-14 rounded-full mr-4 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${getNotificationColor(notif.type)}`}>
                                    {notif.actor?.avatar ? (
                                        <img src={notif.actor.avatar} alt={notif.actor.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        notif.actor?.name?.charAt(0).toUpperCase() || 'A'
                                    )}
                                    {/* Icon badge */}
                                    <div className="absolute -bottom-1 -right-1 bg-[#0D0D0D] rounded-full p-1 border-2 border-[#0D0D0D]">
                                        <Icon icon={getNotificationIcon(notif.type)} className="w-4 h-4 text-bright-yellow" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <p className="text-base leading-snug">
                                        <span className="font-bold text-bright-yellow">
                                            {notif.actor?.name || 'Someone'}
                                        </span>
                                        <span className="text-gray-300"> {notif.message}</span>
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className={`text-xs ${notif.is_read === 0 ? 'text-bright-yellow font-semibold' : 'text-gray-500'}`}>
                                            {timeAgo(notif.created_at)}
                                        </p>
                                        {notif.is_read === 0 && (
                                            <div className="w-2 h-2 bg-bright-yellow rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="relative z-20 flex-shrink-0 ml-4">
                                    <NotificationDropdown 
                                        notifId={notif.id}
                                        isRead={notif.is_read === 1}
                                        onRead={handleReadNotification}
                                        onUnread={handleUnreadNotification}
                                        onDelete={handleDeleteNotification}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="mb-4 text-6xl">📭</div>
                    <p className="text-gray-400 text-lg">Tidak ada notifikasi</p>
                    <p className="text-gray-500 text-sm mt-2">Kamu akan menerima notifikasi saat ada aktivitas baru</p>
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}