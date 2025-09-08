import { useState, useEffect } from 'react';
import { blogApi, type BlogPost, type BlogCategory } from '@/lib/api';

export function useBlog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load blog categories
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getCategories();
      
      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.warn('Unexpected categories response structure:', response);
        setCategories([]);
      }
    } catch (err) {
      console.error('Error loading blog categories:', err);
      setError('Failed to load blog categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Load all blog posts
  const loadBlogPosts = async (params?: {
    categoryId?: number;
    authorId?: number;
    status?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getAll(params);
      
      if (response.data && Array.isArray(response.data)) {
        setBlogPosts(response.data);
      } else {
        console.warn('Unexpected blog posts response structure:', response);
        setBlogPosts([]);
      }
    } catch (err) {
      console.error('Error loading blog posts:', err);
      setError('Failed to load blog posts');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load published blog posts only
  const loadPublishedPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getPublished();
      
      if (response.data && Array.isArray(response.data)) {
        setBlogPosts(response.data);
      } else {
        console.warn('Unexpected published posts response structure:', response);
        setBlogPosts([]);
      }
    } catch (err) {
      console.error('Error loading published blog posts:', err);
      setError('Failed to load published blog posts');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Search blog posts
  const searchBlogPosts = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.search(query);
      
      if (response.data && Array.isArray(response.data)) {
        setBlogPosts(response.data);
      } else {
        console.warn('Unexpected blog search response structure:', response);
        setBlogPosts([]);
      }
    } catch (err) {
      console.error('Error searching blog posts:', err);
      setError('Failed to search blog posts');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Get blog post by ID
  const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
    try {
      const response = await blogApi.getById(id);
      return response.data || null;
    } catch (err) {
      console.error('Error loading blog post by ID:', err);
      setError('Failed to load blog post');
      return null;
    }
  };

  // Get blog post by slug
  const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const response = await blogApi.getBySlug(slug);
      return response.data || null;
    } catch (err) {
      console.error('Error loading blog post by slug:', err);
      setError('Failed to load blog post');
      return null;
    }
  };

  // Filter blog posts by category
  const filterByCategory = (categoryId: number) => {
    return blogPosts.filter(post => post.categoryId === categoryId);
  };

  // Filter blog posts by author
  const filterByAuthor = (authorId: number) => {
    return blogPosts.filter(post => post.authorId === authorId);
  };

  // Filter blog posts by status
  const filterByStatus = (status: string) => {
    return blogPosts.filter(post => post.status === status);
  };

  // Get featured blog posts
  const getFeaturedPosts = () => {
    return blogPosts.filter(post => post.featuredImage).slice(0, 3);
  };

  // Get recent blog posts
  const getRecentPosts = (limit: number = 5) => {
    return blogPosts
      .filter(post => post.status === 'Published')
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
      .slice(0, limit);
  };

  // Get blog posts by category name
  const getPostsByCategoryName = (categoryName: string) => {
    const category = categories.find(cat => cat.categoryName === categoryName);
    if (category) {
      return blogPosts.filter(post => post.categoryId === category.id);
    }
    return [];
  };

  // Get active categories only
  const getActiveCategories = () => {
    return categories.filter(category => category.isActive);
  };

  // Get total blog posts count
  const getTotalBlogPostsCount = () => {
    return blogPosts.length;
  };

  // Get published blog posts count
  const getPublishedPostsCount = () => {
    return blogPosts.filter(post => post.status === 'Published').length;
  };

  // Get blog posts count by category
  const getPostsCountByCategory = (categoryId: number) => {
    return blogPosts.filter(post => post.categoryId === categoryId).length;
  };

  // Get popular blog posts (by view count)
  const getPopularPosts = (limit: number = 5) => {
    return blogPosts
      .filter(post => post.status === 'Published')
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, limit);
  };

  // Get blog posts by tag
  const getPostsByTag = (tag: string) => {
    return blogPosts.filter(post => 
      post.tags?.some(postTag => 
        postTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  };

  useEffect(() => {
    loadCategories();
    loadPublishedPosts();
  }, []);

  return {
    // State
    blogPosts,
    categories,
    loading,
    error,
    
    // Actions
    loadCategories,
    loadBlogPosts,
    loadPublishedPosts,
    searchBlogPosts,
    getBlogPostById,
    getBlogPostBySlug,
    
    // Utilities
    filterByCategory,
    filterByAuthor,
    filterByStatus,
    getFeaturedPosts,
    getRecentPosts,
    getPostsByCategoryName,
    getActiveCategories,
    getTotalBlogPostsCount,
    getPublishedPostsCount,
    getPostsCountByCategory,
    getPopularPosts,
    getPostsByTag,
    
    // Refresh functions
    refresh: () => {
      loadCategories();
      loadPublishedPosts();
    },
  };
}
