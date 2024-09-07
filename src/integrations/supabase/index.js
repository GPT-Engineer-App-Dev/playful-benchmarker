import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// User Secrets
export const useUserSecrets = () => useQuery({
    queryKey: ['user_secrets'],
    queryFn: () => fromSupabase(supabase.from('user_secrets').select('*')),
});

export const useAddUserSecret = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSecret) => fromSupabase(supabase.from('user_secrets').insert([newSecret])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_secrets');
        },
    });
};

export const useUpdateUserSecret = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('user_secrets').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_secrets');
        },
    });
};

export const useDeleteUserSecret = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user_secrets').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_secrets');
        },
    });
};

// Reviewers
export const useReviewers = () => useQuery({
    queryKey: ['reviewers'],
    queryFn: () => fromSupabase(supabase.from('reviewers').select('*')),
});

export const useReviewer = (id) => useQuery({
    queryKey: ['reviewers', id],
    queryFn: () => fromSupabase(supabase.from('reviewers').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddReviewer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newReviewer) => fromSupabase(supabase.from('reviewers').insert([newReviewer])),
        onSuccess: () => {
            queryClient.invalidateQueries('reviewers');
        },
    });
};

export const useUpdateReviewer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('reviewers').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('reviewers');
        },
    });
};

export const useDeleteReviewer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('reviewers').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('reviewers');
        },
    });
};

// Review Dimensions
export const useReviewDimensions = () => useQuery({
    queryKey: ['review_dimensions'],
    queryFn: () => fromSupabase(supabase.from('review_dimensions').select('*')),
});

export const useReviewDimension = (id) => useQuery({
    queryKey: ['review_dimensions', id],
    queryFn: () => fromSupabase(supabase.from('review_dimensions').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddReviewDimension = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDimension) => fromSupabase(supabase.from('review_dimensions').insert([newDimension])),
        onSuccess: () => {
            queryClient.invalidateQueries('review_dimensions');
        },
    });
};

export const useUpdateReviewDimension = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('review_dimensions').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('review_dimensions');
        },
    });
};

export const useDeleteReviewDimension = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('review_dimensions').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('review_dimensions');
        },
    });
};

// Results
export const useResults = () => useQuery({
    queryKey: ['results'],
    queryFn: () => fromSupabase(supabase.from('results').select('*')),
});

export const useResult = (id) => useQuery({
    queryKey: ['results', id],
    queryFn: () => fromSupabase(supabase.from('results').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddResult = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newResult) => fromSupabase(supabase.from('results').insert([newResult])),
        onSuccess: () => {
            queryClient.invalidateQueries('results');
        },
    });
};

export const useUpdateResult = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('results').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('results');
        },
    });
};

export const useDeleteResult = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('results').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('results');
        },
    });
};

// Runs
export const useRuns = () => useQuery({
    queryKey: ['runs'],
    queryFn: () => fromSupabase(supabase.from('runs').select('*').order('created_at', { ascending: false }).limit(10)),
});

export const useRun = (id) => useQuery({
    queryKey: ['runs', id],
    queryFn: () => fromSupabase(supabase.from('runs').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddRun = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newRun) => fromSupabase(supabase.from('runs').insert([{
            ...newRun,
            state: newRun.state || 'running'
        }])),
        onSuccess: () => {
            queryClient.invalidateQueries('runs');
        },
    });
};

export const useUpdateRun = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('runs').update({
            ...updateData,
            state: updateData.state || 'running'
        }).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('runs');
        },
    });
};

export const useDeleteRun = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('runs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('runs');
        },
    });
};

// Re-export benchmark scenario functions
export * from './benchmarkScenarios';