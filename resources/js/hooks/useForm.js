import { useState, useCallback } from 'react';
import { useForm as useInertiaForm } from '@inertiajs/react';

export default function useForm(initialData = {}) {
    const form = useInertiaForm(initialData);

    const setData = useCallback((key, value) => {
        form.setData(key, value);
    }, [form]);

    const setMultiple = useCallback((data) => {
        Object.entries(data).forEach(([key, value]) => {
            form.setData(key, value);
        });
    }, [form]);

    const reset = useCallback((...keys) => {
        if (keys.length === 0) {
            form.reset();
        } else {
            keys.forEach((key) => form.reset(key));
        }
    }, [form]);

    const handleChange = useCallback(
        (key) => (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            form.setData(key, value);
        },
        [form],
    );

    const handleSubmit = useCallback(
        (url, options = {}) => (e) => {
            e.preventDefault();
            form.post(url, options);
        },
        [form],
    );

    const handlePut = useCallback(
        (url, options = {}) => (e) => {
            e.preventDefault();
            form.put(url, options);
        },
        [form],
    );

    const handleDelete = useCallback(
        (url, options = {}) => (e) => {
            e.preventDefault();
            form.delete(url, options);
        },
        [form],
    );

    return {
        ...form,
        data: form.data,
        errors: form.errors,
        processing: form.processing,
        recentlySuccessful: form.recentlySuccessful,
        setData,
        setMultiple,
        reset,
        handleChange,
        handleSubmit,
        handlePut,
        handleDelete,
    };
}