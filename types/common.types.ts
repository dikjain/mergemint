/**
 * Common Types
 *
 * This file contains shared utility types and common data structures
 * used across multiple parts of the application.
 */

// ===========================
// Utility Types
// ===========================

/**
 * Generic size dimensions
 * Used for measuring component dimensions
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Generic position coordinates
 * Used for tracking element positions
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Combined position and size
 * Represents a positioned and sized element
 */
export interface BoundingBox extends Position, Size {}
