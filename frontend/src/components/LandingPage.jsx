import React from 'react';

/**
 * Landing page component for unauthenticated users
 * Introduces the AI-generated interactive story application
 */
export function LandingPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 sm:space-y-8 mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
          Plot <span className="text-primary">Thirst</span>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          AI-Powered Interactive Storytelling
        </p>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Immerse yourself in personalized, interactive narratives where every choice shapes your story.
          Experience adult fiction like never before with AI that adapts to your preferences and decisions.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-16">
        {/* Feature 1 - Interactive Choices */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎭</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Interactive Choices</h3>
          <p className="text-muted-foreground">
            Shape your story with meaningful decisions. Every choice leads to unique paths and outcomes,
            creating a truly personalized narrative experience.
          </p>
        </div>

        {/* Feature 2 - AI-Generated Content */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">AI-Generated Stories</h3>
          <p className="text-muted-foreground">
            Advanced AI creates dynamic, engaging content that responds to your preferences.
            No two stories are exactly alike, ensuring fresh experiences every time.
          </p>
        </div>

        {/* Feature 3 - Adult Content */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Mature Themes</h3>
          <p className="text-muted-foreground">
            Explore sophisticated adult narratives with depth, emotion, and passion.
            Content designed for mature audiences seeking engaging, intimate storytelling.
          </p>
        </div>

        {/* Feature 4 - Personalization */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚙️</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Personalized Experience</h3>
          <p className="text-muted-foreground">
            The AI learns your preferences and adapts stories accordingly.
            Your reading history helps create increasingly tailored content.
          </p>
        </div>

        {/* Feature 5 - Multiple Genres */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Diverse Genres</h3>
          <p className="text-muted-foreground">
            From romance to fantasy, thriller to sci-fi. Explore various genres and themes
            that match your mood and interests.
          </p>
        </div>

        {/* Feature 6 - Real-time Generation */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Real-time Creation</h3>
          <p className="text-muted-foreground">
            Stories unfold in real-time based on your choices. Watch as the AI crafts
            compelling narratives that respond instantly to your decisions.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="text-center space-y-8 mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-accent">1</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Choose Your Path</h3>
            <p className="text-sm text-muted-foreground">
              Select your preferences, genres, and story parameters to get started.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-accent">2</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Make Decisions</h3>
            <p className="text-sm text-muted-foreground">
              Navigate through story branches by making choices that shape the narrative.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-accent">3</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Experience Your Story</h3>
            <p className="text-sm text-muted-foreground">
              Enjoy your personalized narrative as it unfolds based on your unique choices.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6 bg-card border border-border rounded-lg p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Ready to Begin Your Adventure?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join Plot Thirst today and discover a new world of interactive storytelling.
          Create your account to start experiencing personalized AI-generated narratives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-destructive">18+ Only:</span> This application contains mature content intended for adults.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Click "Get Started" in the navigation above to create your account and begin your journey.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Plot Thirst - Where AI meets interactive adult fiction
        </p>
      </div>
    </div>
  );
}