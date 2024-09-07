import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabaseClient';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useBenchmarkScenarios = () => useQuery({
    queryKey: ['benchmark_scenarios'],
    queryFn: () => fromSupabase(supabase.from('benchmark_scenarios').select('*, reviewers(*)')),
});

export const useBenchmarkScenario = (id) => useQuery({
    queryKey: ['benchmark_scenarios', id],
    queryFn: () => fromSupabase(supabase.from('benchmark_scenarios').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddBenchmarkScenario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newScenario) => {
            console.log("Adding new scenario:", newScenario);
            const { id, ...scenarioWithoutId } = newScenario; // Remove id from the input
            const { data, error } = await supabase.from('benchmark_scenarios').insert([{
                ...scenarioWithoutId,
                timeout: scenarioWithoutId.timeout || 300 // Default to 5 minutes if not provided
            }]).select().single();
            
            if (error) {
                console.error("Error adding scenario:", error);
                let errorMessage = "Failed to create scenario. ";
                if (error.code === '23505') {
                    errorMessage += "A scenario with this name already exists. Please choose a unique name.";
                } else if (error.code === '23502') {
                    errorMessage += "Required fields are missing. Please fill in all required fields.";
                } else if (error.code === '42P01') {
                    errorMessage += "There's an issue with the database table. Please contact support.";
                } else {
                    errorMessage += `Unexpected error: ${error.message}. Please try again or contact support if the issue persists.`;
                }
                throw new Error(errorMessage);
            }
            
            if (!data) {
                console.error("No data returned after adding scenario");
                throw new Error("No data returned after adding scenario. Please try again or contact support if the issue persists.");
            }
            
            console.log("Successfully added scenario:", data);
            return { data, error: null };
        },
        onSuccess: () => {
            queryClient.invalidateQueries('benchmark_scenarios');
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        },
    });
};

export const useUpdateBenchmarkScenario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('benchmark_scenarios').update({
            ...updateData,
            timeout: updateData.timeout || 300 // Default to 5 minutes if not provided
        }).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('benchmark_scenarios');
        },
    });
};

export const useDeleteBenchmarkScenario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('benchmark_scenarios').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('benchmark_scenarios');
        },
    });
};