import React, { useState, useEffect } from 'react';

/**
 * Age verification popup component
 * Shows on first visit and remembers verification in localStorage
 */
export function AgeVerification({ onVerified }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      setIsVerified(true);
      onVerified(true);
    } else {
      setIsVisible(true);
    }
  }, [onVerified]);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVerified(true);
    setIsVisible(false);
    onVerified(true);
  };

  const handleDeny = () => {
    // Redirect to a safe site or show warning
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible || isVerified) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full mx-4">
        {/* Popup Card */}
        <div className="bg-card border border-border rounded-lg shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Warning Icon */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Age Verification Required</h2>
          </div>

          {/* Content */}
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              This website contains mature content intended for adults only.
            </p>
            <p className="text-foreground font-semibold">
              Are you 18 years of age or older?
            </p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm text-destructive font-medium">
                By clicking "Yes, I am 18+", you confirm that you are at least 18 years old and agree to view adult content.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDeny}
              className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium"
            >
              No, I am under 18
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Yes, I am 18+
            </button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              This verification will be remembered for future visits.
            </p>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-sm -z-10"></div>
      </div>
    </div>
  );
}

/**
 * Hook to manage age verification state
 */
export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check verification status on mount
    const ageVerified = localStorage.getItem('ageVerified');
    setIsVerified(ageVerified === 'true');
    setIsLoading(false);
  }, []);

  const handleVerified = (verified) => {
    setIsVerified(verified);
  };

  return {
    isVerified,
    isLoading,
    handleVerified,
  };
}