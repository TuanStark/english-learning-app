import { useState, useEffect } from 'react';
import { vocabularyApi, type Vocabulary, type VocabularyTopic, type VocabularyTopicsResponse } from '@/lib/api';

export function useVocabulary() {
  const [topics, setTopics] = useState<VocabularyTopic[]>([]);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load vocabulary topics
  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vocabularyApi.getTopics();
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setTopics(response.data.data);
        // Extract vocabularies from topics
        const allVocabularies: Vocabulary[] = [];
        response.data.data.forEach(topic => {
          if (topic.vocabularies && Array.isArray(topic.vocabularies)) {
            allVocabularies.push(...topic.vocabularies);
          }
        });
        setVocabularies(allVocabularies);
      } else {
        console.warn('Unexpected topics response structure:', response);
        setTopics([]);
        setVocabularies([]);
      }
    } catch (err) {
      console.error('Error loading vocabulary topics:', err);
      setError('Failed to load vocabulary topics');
      setTopics([]);
      setVocabularies([]);
    } finally {
      setLoading(false);
    }
  };

  // Load vocabularies with optional filters
  const loadVocabularies = async (params?: {
    topicId?: number;
    difficultyLevel?: string;
    includeInactive?: boolean;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await vocabularyApi.getAll(params);
      
      if (response.data && Array.isArray(response.data)) {
        setVocabularies(response.data);
      } else {
        console.warn('Unexpected vocabularies response structure:', response);
        setVocabularies([]);
      }
    } catch (err) {
      console.error('Error loading vocabularies:', err);
      setError('Failed to load vocabularies');
      setVocabularies([]);
    } finally {
      setLoading(false);
    }
  };

  // Load vocabularies by topic
  const loadVocabulariesByTopic = async (topicId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await vocabularyApi.getByTopic(topicId);
      
      if (response.data && Array.isArray(response.data)) {
        setVocabularies(response.data);
      } else {
        console.warn('Unexpected vocabularies by topic response structure:', response);
        setVocabularies([]);
      }
    } catch (err) {
      console.error('Error loading vocabularies by topic:', err);
      setError('Failed to load vocabularies by topic');
      setVocabularies([]);
    } finally {
      setLoading(false);
    }
  };

  // Get vocabulary by ID
  const getVocabularyById = async (id: number): Promise<Vocabulary | null> => {
    try {
      const response = await vocabularyApi.getById(id);
      return response.data || null;
    } catch (err) {
      console.error('Error loading vocabulary by ID:', err);
      setError('Failed to load vocabulary');
      return null;
    }
  };

  // Filter vocabularies by search term
  const filterVocabularies = (searchTerm: string, topicId?: number) => {
    let filtered = vocabularies;

    if (searchTerm) {
      filtered = filtered.filter(vocab => 
        vocab.englishWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.vietnameseMeaning.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (topicId) {
      filtered = filtered.filter(vocab => vocab.topicId === topicId);
    }

    return filtered;
  };

  // Get vocabularies by difficulty level
  const getVocabulariesByDifficulty = (difficulty: string) => {
    return vocabularies.filter(vocab => vocab.difficultyLevel === difficulty);
  };

  // Get active topics only
  const getActiveTopics = () => {
    return topics.filter(topic => topic.isActive);
  };

  // Get vocabularies count by topic
  const getVocabulariesCountByTopic = (topicId: number) => {
    return vocabularies.filter(vocab => vocab.topicId === topicId).length;
  };

  // Get total vocabularies count
  const getTotalVocabulariesCount = () => {
    return vocabularies.length;
  };

  // Get vocabularies by difficulty count
  const getVocabulariesByDifficultyCount = () => {
    const counts = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    vocabularies.forEach(vocab => {
      if (vocab.difficultyLevel in counts) {
        counts[vocab.difficultyLevel as keyof typeof counts]++;
      }
    });

    return counts;
  };

  useEffect(() => {
    loadTopics();
    loadVocabularies();
  }, []);

  return {
    // State
    topics,
    vocabularies,
    loading,
    error,
    
    // Actions
    loadTopics,
    loadVocabularies,
    loadVocabulariesByTopic,
    getVocabularyById,
    
    // Utilities
    filterVocabularies,
    getVocabulariesByDifficulty,
    getActiveTopics,
    getVocabulariesCountByTopic,
    getTotalVocabulariesCount,
    getVocabulariesByDifficultyCount,
    
    // Refresh functions
    refresh: () => {
      loadTopics();
      loadVocabularies();
    },
  };
}
