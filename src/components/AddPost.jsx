import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";

export default function UploadModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol buka modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Upload File
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-[#1e1e1e] p-6 rounded-2xl w-[700px] flex gap-6 text-white">
                
                {/* Upload Box */}
                <div className="bg-[#2c2c2c] rounded-2xl p-6 flex flex-col items-center justify-center w-1/2 border border-gray-700">
                  <Icon icon="mdi:upload" className="text-4xl mb-3" />
                  <p className="text-center text-lg mb-2">
                    Select a file or drag <br /> and drop it here
                  </p>
                  <p className="text-xs text-gray-400 text-center">
                    It is recommended to use high-quality .jpg files less than 20 MB
                    in size or .mp4 files less than 200 MB in size.
                  </p>
                  <div className="border-b border-gray-600 my-4 w-full"></div>
                  <button className="bg-gray-600 w-full py-2 rounded-md hover:bg-gray-500 transition">
                    Post
                  </button>
                </div>

                {/* Input Title & Caption */}
                <div className="bg-[#2c2c2c] rounded-2xl p-6 flex flex-col gap-4 w-1/2">
                  <div>
                    <label className="block text-sm text-gray-400">Title</label>
                    <input
                      type="text"
                      placeholder="Add Title"
                      className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Caption</label>
                    <textarea
                      placeholder="Add caption"
                      className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none"
                    ></textarea>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
