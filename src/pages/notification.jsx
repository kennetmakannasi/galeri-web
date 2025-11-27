// file: src/pages/NotificationPage.jsx

import React, { useEffect, useState, useCallback } from "react";
import { api, UseToken } from '../helpers/api'; 
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import NotificationDropdown from '../components/notificationDropdown'; 


const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
};


export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = UseToken();
            const res = await api.get('/api/notification', { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotifications(res.data.content || []);
        } catch (err) {
            console.error("Failed to load notifications:", err);
            setError("Failed to load notifications. Please try again."); 
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications])

    const getNotificationUrl = (notif) => {
        const notifiedType = notif.notified_type; 
        const notifiedId = notif.notified_object?.id; 

        if (notifiedType === 'App\\Models\\User') {
            return `/profile/${notifiedId}`;
        } 
        else if (notifiedType === 'App\\Models\\Post') {
            return `/post/${notifiedId}`;
        } else {
            return '/'; 
        }
    };


    const handleReadNotification = async (id) => {
        try {
            const token = UseToken();
            await api.post(`/api/notification/read/${id}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setNotifications(prev => prev.map(notif => 
                notif.id === id ? { ...notif, is_read: 1 } : notif
            ));
        } catch (err) {
            console.error("Failed to mark notification as read:", id, err);
        }
    };
    
    const handleUnreadNotification = async (id) => {
        try {
            const token = UseToken();
            await api.post(`/api/notification/unread/${id}`, null, { 
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setNotifications(prev => prev.map(notif => 
                notif.id === id ? { ...notif, is_read: 0 } : notif
            ));
        } catch (err) {
            console.error("Failed to mark notification as unread:", id, err);
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            const token = UseToken();
            await api.delete(`/api/notification/${id}`, { 
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        } catch (err) {
            console.error("Failed to delete notification:", id, err);
        }
    };

    const handleReadAll = async () => {
        try {
            const token = UseToken();
            await api.post('/api/notification/readAll', null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(prev => prev.map(notif => ({ ...notif, is_read: 1 })));
        } catch (err) {
            console.error("Failed to mark all notifications as read:", err);
        }
    };

    const unreadCount = notifications.filter(n => n.is_read === 0).length;


    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-3">All <span className="text-bright-yellow">Notif</span>ications ({unreadCount} Unread)</h1>

            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleReadAll} 
                    className="flex items-center text-sm text-bright-yellow hover:text-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={unreadCount === 0}
                >
                    <Icon icon="ic:round-mark-chat-read" className="mr-1 h-5 w-5" />
                    Mark All as Read
                </button>
            </div>

            {!loading && !error && notifications.length > 0 && (
                <div className="space-y-1">
                    {notifications.map((notif) => (
                        <div 
                            key={notif.id} 
                            className={`flex items-start p-4 rounded-lg transition-colors relative 
                                ${notif.is_read === 0 ? 'bg-gray-800 hover:bg-gray-700 border-l-4 border-blue-500' : 'bg-[#282828] hover:bg-gray-700 border-l-4 border-transparent'}`}
                        >
                            
                            <Link 
                                to={getNotificationUrl(notif)} 
                                onClick={() => handleReadNotification(notif.id)} 
                                className="flex items-start flex-grow pr-4" 
                            >
                                <div className="w-10 h-10 bg-blue-500 rounded-full mr-4 flex-shrink-0 flex items-center justify-center text-lg font-bold">A</div> 

                                <div className="flex-grow">
                                    <p className="text-base leading-snug">
                                        <span className="font-semibold text-blue-400">Someone</span> {notif.message}.
                                    </p>
                                    <p className={`text-xs mt-1 ${notif.is_read === 0 ? 'text-blue-300 font-medium' : 'text-gray-400'}`}>
                                        {timeAgo(notif.created_at)}
                                    </p>
                                </div>

                                {notif.is_read === 0 && (
                                    <div className="w-2 h-2 bg-red-500 rounded-full ml-3 flex-shrink-0 mt-2"></div>
                                )}
                            </Link>

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
                    ))}
                </div>
            )}
            
        </div>
    );
}