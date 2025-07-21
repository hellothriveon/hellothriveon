import React, { useState, useEffect } from 'react';

export const ProgressBar = () => {
  const [signupCount, setSignupCount] = useState(0);
  const targetCount = 5000;
  const currentProgress = 2847; // This would come from your database in real implementation

  useEffect(() => {
    // Animate the progress bar on mount
    const timer = setTimeout(() => {
      setSignupCount(currentProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const progressPercentage = Math.min((signupCount / targetCount) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-foreground">
          <span className="text-primary font-bold">{signupCount.toLocaleString()}</span> of {targetCount.toLocaleString()} founding members
        </p>
        <p className="text-sm text-muted-foreground">
          {(targetCount - signupCount).toLocaleString()} spots remaining
        </p>
      </div>
      
      <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
        <div 
          className="progress-bar h-full rounded-full transition-all duration-2000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        <span>0</span>
        <span>{progressPercentage.toFixed(1)}% complete</span>
        <span>{targetCount.toLocaleString()}</span>
      </div>
    </div>
  );
};