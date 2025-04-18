
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}

const StarRating = ({ rating, onRatingChange, size = 24 }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            "cursor-pointer transition-colors",
            star <= rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "fill-none text-gray-300"
          )}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
