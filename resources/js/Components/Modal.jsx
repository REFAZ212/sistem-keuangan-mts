import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({
    isOpen,
    onClose,
    show,
    title,
    description,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    className = '',
}) {
    const visible = isOpen ?? show;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };

    return (
        <Transition appear show={visible} as={Fragment}>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                            onClick={closeOnOverlayClick ? onClose : undefined}
                            aria-hidden="true"
                        />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className={`inline-block align-bottom w-full ${sizes[size]} transform overflow-hidden rounded-2xl bg-white px-6 pt-6 pb-4 shadow-xl transition-all text-left sm:pb-6 ${className}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    {title && (
                                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                                    )}
                                    {description && (
                                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                                    )}
                                </div>
                                {showCloseButton && (
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>

                            <div className="mt-4">{children}</div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition>
    );
}

export function ModalFooter({ className = '', children }) {
    return (
        <div className={`flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
}
