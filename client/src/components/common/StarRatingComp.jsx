import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Star } from 'lucide-react';

const StarRatingComp = () => {

    const [rating, setRating] = useState(0);
    return (
            [1, 2, 3, 4, 5].map((star) => (
            <Button className={`rounded-lg transition-colors ${star <= rating ? 'text-yellow-400 hover:bg-black' : 'text-black hover:bg-primary hover:text-primary-foreground'}`}
                variant='outline'
                size='icon'
                onClick={()=>setRating(star)}
            ><Star   className={`w-6 h-6 ${star <= rating ? "fill-yellow-400" : ""}`}/></Button>))
    )
}

export default StarRatingComp