// file: src/components/NotificationDropdown.jsx

import React from 'react';
import { Menu } from '@headlessui/react';
import { Icon } from '@iconify/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NotificationDropdown({ 
  notifId, 
  isRead, 
  onRead, 
  onUnread, 
  onDelete 
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
        {/* Tombol Dropdown */}
          <Menu.Button 
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none"
            onClick={(e) => e.stopPropagation()} 
          >
            <Icon icon="pepicons-pop:dots-x" className="w-5 h-5" />
          </Menu.Button>
        

        {/* Panel Dropdown */}
        <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-[#282828] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            
            {/* Tombol Mark as Unread/Read */}
            {!isRead ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah Link dipicu
                      onRead(notifId);
                    }}
                    className={classNames(
                      active ? 'bg-gray-700 text-white' : 'text-gray-300',
                      'flex items-center w-full px-4 py-2 text-sm'
                    )}
                  >
                    <Icon icon="ic:round-mark-email-read" className="mr-3 h-5 w-5" />
                    Mark as Read
                  </button>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnread(notifId);
                    }}
                    className={classNames(
                      active ? 'bg-gray-700 text-white' : 'text-gray-300',
                      'flex items-center w-full px-4 py-2 text-sm'
                    )}
                  >
                    <Icon icon="ic:round-mark-email-unread" className="mr-3 h-5 w-5" />
                    Mark as Unread
                  </button>
                )}
              </Menu.Item>
            )}

            {/* Garis pemisah */}
            <div className="my-1 border-t border-gray-600" />
            
            {/* Tombol Delete */}
            <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(notifId);
                    }}
                    className={classNames(
                      active ? 'bg-red-700 text-white' : 'text-red-400',
                      'flex items-center w-full px-4 py-2 text-sm'
                    )}
                  >
                    <Icon icon="ic:baseline-delete-forever" className="mr-3 h-5 w-5" />
                    Delete
                  </button>
                )}
            </Menu.Item>
          </div>
        </Menu.Items>
    </Menu>
  );
}