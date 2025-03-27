import { ServiceFilterOptions } from '@/Support/Interfaces/Others';

const generateUseGetAllQueryKey = (baseKey: string, filters?: ServiceFilterOptions) => {
    return [baseKey, 'all', filters];
};

const generateUseGetQueryKey = (baseKey: string, id: number) => {
    return [baseKey, 'detail', id];
};

export { generateUseGetAllQueryKey, generateUseGetQueryKey };
