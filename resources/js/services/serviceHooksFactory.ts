// Generated by Laravel Forgemate Initializer
import { generateUseGetAllQueryKey, generateUseGetQueryKey } from '@/helpers';
import {
    PaginateResponse,
    ServiceHooks,
    UseCreateOptions,
    UseDeleteOptions,
    UseGetAllOptions,
    UseGetOptions,
    UseUpdateOptions,
} from '@/support/interfaces/others';
import { Resource } from '@/support/interfaces/resources';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ExtendedResource<T> = T & Record<string, any>;

export function serviceHooksFactory<T extends Resource>({ baseKey, baseRoute }: ServiceHooks) {
    if (!baseKey) baseKey = baseRoute;

    return {
        getAll: async ({ filters, axiosRequestConfig }: UseGetAllOptions<T> = {}) => {
            const url = route(`${baseRoute}.index`);
            const response = await window.axios.get(url, {
                params: filters,
                ...axiosRequestConfig,
            });
            return response.data;
        },

        useGetAll: ({ filters, axiosRequestConfig, useQueryOptions }: UseGetAllOptions<T> = {}) => {
            const url = route(`${baseRoute}.index`);

            return useQuery<PaginateResponse<T>>({
                queryKey: generateUseGetAllQueryKey(baseKey, filters),
                queryFn: async () => {
                    const response = await window.axios.get(url, {
                        params: filters,
                        ...axiosRequestConfig,
                    });
                    return response.data;
                },
                placeholderData: keepPreviousData,
                ...useQueryOptions,
            });
        },

        useGet: ({ id, axiosRequestConfig, useQueryOptions }: UseGetOptions<T>) => {
            const url = route(`${baseRoute}.show`, id);

            return useQuery({
                queryKey: generateUseGetQueryKey(baseKey, id),
                queryFn: async () => {
                    const response = await window.axios.get(url, axiosRequestConfig);
                    return response.data;
                },
                enabled: !!id,
                ...useQueryOptions,
            });
        },

        useCreate: ({ axiosRequestConfig, useMutationOptions }: UseCreateOptions<T> = {}) => {
            const queryClient = useQueryClient();

            return useMutation<Partial<T>, Error, { data: Partial<ExtendedResource<T>> }>({
                mutationFn: async ({ data }: { data: Partial<ExtendedResource<T>> }) => {
                    const url = route(`${baseRoute}.store`);
                    const response = await window.axios.post(url, data, axiosRequestConfig);
                    return response.data;
                },
                onSuccess: async (...args) => {
                    await queryClient.invalidateQueries({ queryKey: [baseKey], exact: false });

                    if (useMutationOptions?.onSuccess) {
                        await useMutationOptions.onSuccess(...args);
                    }
                },
                ...useMutationOptions,
            });
        },

        useUpdate: ({ axiosRequestConfig, useMutationOptions }: UseUpdateOptions<T> = {}) => {
            const queryClient = useQueryClient();

            return useMutation<Partial<T>, Error, { id: number; data: Partial<ExtendedResource<T>> }>({
                mutationFn: async ({ id, data }: { id: number; data: Partial<ExtendedResource<T>> }) => {
                    const url = route(`${baseRoute}.update`, id);
                    const response = await window.axios.post(url, data, {
                        params: { _method: 'PUT' },
                        ...axiosRequestConfig,
                    });
                    return response.data;
                },
                onSuccess: async (...args) => {
                    await queryClient.invalidateQueries({ queryKey: [baseKey], exact: false });

                    if (useMutationOptions?.onSuccess) {
                        await useMutationOptions.onSuccess(...args);
                    }
                },
                ...useMutationOptions,
            });
        },

        useDelete: ({ axiosRequestConfig, useMutationOptions }: UseDeleteOptions<T> = {}) => {
            const queryClient = useQueryClient();

            return useMutation<Partial<T>, Error, { id: number }>({
                mutationFn: async ({ id }: { id: number }) => {
                    const url = route(`${baseRoute}.destroy`, id);
                    const response = await window.axios.post(url, { _method: 'DELETE' }, axiosRequestConfig);
                    return response.data;
                },
                onSuccess: async (...args) => {
                    await queryClient.invalidateQueries({ queryKey: [baseKey], exact: false });

                    if (useMutationOptions?.onSuccess) {
                        await useMutationOptions.onSuccess(...args);
                    }
                },
                ...useMutationOptions,
            });
        },
    };
}
