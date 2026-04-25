import { useState, useEffect, useCallback } from 'react';
import type { Ggurim } from '../types';

const STORAGE_KEY = 'kkurim-ggurim-list';

function generateId(): string {
  return `ggurim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function loadFromStorage(): Ggurim[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.error('Failed to load from localStorage');
    return [];
  }
}

function saveToStorage(ggurimList: Ggurim[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ggurimList));
  } catch {
    console.error('Failed to save to localStorage');
  }
}

export function useGgurimStore() {
  const [ggurimList, setGgurimList] = useState<Ggurim[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 초기 로드
  useEffect(() => {
    const loaded = loadFromStorage();
    setGgurimList(loaded);
    setIsLoaded(true);
  }, []);

  // 전체 목록 조회
  const getAll = useCallback(() => {
    return ggurimList;
  }, [ggurimList]);

  // 단일 조회
  const getById = useCallback((id: string): Ggurim | undefined => {
    return ggurimList.find(g => g.id === id);
  }, [ggurimList]);

  // 생성
  const create = useCallback((
    data: Omit<Ggurim, 'id' | 'createdAt' | 'updatedAt'>
  ): Ggurim => {
    const now = new Date().toISOString();
    const newGgurim: Ggurim = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    setGgurimList(prev => {
      const updated = [...prev, newGgurim];
      saveToStorage(updated);
      return updated;
    });

    return newGgurim;
  }, []);

  // 수정
  const update = useCallback((
    id: string,
    data: Partial<Omit<Ggurim, 'id' | 'createdAt' | 'updatedAt'>>
  ): Ggurim | undefined => {
    let updatedGgurim: Ggurim | undefined;

    setGgurimList(prev => {
      const index = prev.findIndex(g => g.id === id);
      if (index === -1) return prev;

      updatedGgurim = {
        ...prev[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const updated = [...prev];
      updated[index] = updatedGgurim;
      saveToStorage(updated);
      return updated;
    });

    return updatedGgurim;
  }, []);

  // 삭제
  const remove = useCallback((id: string): boolean => {
    let deleted = false;

    setGgurimList(prev => {
      const filtered = prev.filter(g => g.id !== id);
      if (filtered.length !== prev.length) {
        deleted = true;
        saveToStorage(filtered);
      }
      return filtered;
    });

    return deleted;
  }, []);

  return {
    ggurimList,
    isLoaded,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}
