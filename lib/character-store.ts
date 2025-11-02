'use client';

/**
 * Character Store (Zustand)
 *
 * Global state management for the current character
 * Uses our new server actions for data fetching
 */

import { create } from 'zustand';
import { getCurrentCharacter } from '@/actions/character';
import type { CharacterWithRelations } from '@/types';

interface CharacterState {
  character: CharacterWithRelations | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCharacter: () => Promise<void>;
  updateCharacter: (updates: Partial<CharacterWithRelations>) => void;
  refreshCharacter: () => Promise<void>;
  clearCharacter: () => void;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  character: null,
  isLoading: false,
  error: null,

  fetchCharacter: async () => {
    try {
      set({ isLoading: true, error: null });

      const result = await getCurrentCharacter();

      if (result.success && result.data) {
        set({ character: result.data, isLoading: false, error: null });
      } else {
        set({
          character: null,
          isLoading: false,
          error: result.error || 'Failed to fetch character',
        });
      }
    } catch (error) {
      console.error('Failed to fetch character:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch character',
      });
    }
  },

  updateCharacter: (updates) => {
    set((state) => ({
      character: state.character ? { ...state.character, ...updates } : null,
    }));
  },

  refreshCharacter: async () => {
    await get().fetchCharacter();
  },

  clearCharacter: () => {
    set({ character: null, isLoading: false, error: null });
  },
}));
