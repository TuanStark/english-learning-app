import { useState, useEffect } from 'react';
import { grammarApi, type Grammar } from '@/lib/api';

export function useGrammar() {
  const [grammarLessons, setGrammarLessons] = useState<Grammar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all grammar lessons
  const loadGrammarLessons = async (params?: {
    difficultyLevel?: string;
    includeInactive?: boolean;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await grammarApi.getAll(params);
      console.log('response', response);
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setGrammarLessons(response.data.data);
      } else {
        console.warn('Unexpected grammar response structure:', response);
        setGrammarLessons([]);
      }
    } catch (err) {
      console.error('Error loading grammar lessons:', err);
      setError('Failed to load grammar lessons');
      setGrammarLessons([]);
    } finally {
      setLoading(false);
    }
  };

  // Search grammar lessons
  const searchGrammar = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await grammarApi.search(query);
      
      if (response.data && Array.isArray(response.data)) {
        setGrammarLessons(response.data);
      } else {
        console.warn('Unexpected grammar search response structure:', response);
        setGrammarLessons([]);
      }
    } catch (err) {
      console.error('Error searching grammar lessons:', err);
      setError('Failed to search grammar lessons');
      setGrammarLessons([]);
    } finally {
      setLoading(false);
    }
  };

  // Get grammar lesson by ID
  const getGrammarById = async (id: number): Promise<Grammar | null> => {
    try {
      const response = await grammarApi.getById(id);
      return response.data || null;
    } catch (err) {
      console.error('Error loading grammar lesson by ID:', err);
      setError('Failed to load grammar lesson');
      return null;
    }
  };

  // Filter grammar lessons by difficulty level
  const filterByDifficulty = (difficulty: string) => {
    return grammarLessons.filter(lesson => lesson.difficultyLevel === difficulty);
  };

  // Get unique difficulty levels
  const getDifficultyLevels = () => {
    const levels = new Set(grammarLessons.map(lesson => lesson.difficultyLevel));
    return Array.from(levels);
  };

  // Get grammar lessons by difficulty count
  const getGrammarByDifficultyCount = () => {
    const counts = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    grammarLessons.forEach(lesson => {
      if (lesson.difficultyLevel in counts) {
        counts[lesson.difficultyLevel as keyof typeof counts]++;
      }
    });

    return counts;
  };

  // Get total grammar lessons count
  const getTotalGrammarCount = () => {
    return grammarLessons.length;
  };

  // Get active grammar lessons only
  const getActiveGrammarLessons = () => {
    return grammarLessons.filter(lesson => lesson.isActive);
  };

  // Sort grammar lessons by order index
  const getSortedGrammarLessons = () => {
    return [...grammarLessons].sort((a, b) => a.orderIndex - b.orderIndex);
  };

  // Get grammar lessons for a specific level
  const getGrammarForLevel = (level: string) => {
    return grammarLessons.filter(lesson => lesson.difficultyLevel === level);
  };

  useEffect(() => {
    loadGrammarLessons();
  }, []);

  return {
    // State
    grammarLessons,
    loading,
    error,
    
    // Actions
    loadGrammarLessons,
    searchGrammar,
    getGrammarById,
    
    // Utilities
    filterByDifficulty,
    getDifficultyLevels,
    getGrammarByDifficultyCount,
    getTotalGrammarCount,
    getActiveGrammarLessons,
    getSortedGrammarLessons,
    getGrammarForLevel,
    
    // Refresh functions
    refresh: () => {
      loadGrammarLessons();
    },
  };
}
