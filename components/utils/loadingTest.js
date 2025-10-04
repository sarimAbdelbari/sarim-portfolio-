// Utility for testing loading behavior with simulated slow connections
// This is for development testing only

export const simulateSlowConnection = (enabled = false) => {
  if (!enabled || typeof window === 'undefined') return;
  
  // Override Image constructor to simulate slow loading
  const originalImage = window.Image;
  
  window.Image = function() {
    const img = new originalImage();
    const originalSrc = Object.getOwnPropertyDescriptor(originalImage.prototype, 'src');
    
    Object.defineProperty(img, 'src', {
      set: function(value) {
        // Simulate slow loading for non-critical images
        const isCritical = [
          '/assets/images/GuibleHero.png',
          '/assets/images/MeChilling.jpg',
          '/assets/svg/reactjs-svgrepo-com.svg',
          '/assets/svg/nextjs-svgrepo-com.svg',
          '/assets/svg/nodejs-svgrepo-com.svg',
          '/assets/svg/typescript-official-svgrepo-com.svg',
          '/assets/svg/mouse-cursor-click-svgrepo-com.svg'
        ].includes(value);
        
        const delay = isCritical ? 100 : 2000; // Critical: 100ms, Others: 2s
        
        setTimeout(() => {
          originalSrc.set.call(this, value);
        }, delay);
      },
      get: function() {
        return originalSrc.get.call(this);
      }
    });
    
    return img;
  };

};

export const logLoadingStats = () => {
  if (typeof window === 'undefined') return;
  
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.initiatorType === 'img') {
        console.log(`📸 Image loaded: ${entry.name.split('/').pop()} (${Math.round(entry.duration)}ms)`);
      }
    });
  });
  
  observer.observe({ entryTypes: ['resource'] });
  
  console.log('📊 Image loading stats enabled');
};
