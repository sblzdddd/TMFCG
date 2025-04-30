export function waitForAllImagesToLoad(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    // Get all images in the element
    const images = Array.from(element.querySelectorAll('img'));
    
    // If no images or all images are already loaded, resolve immediately
    if (images.every(img => img.complete)) {
      setTimeout(resolve, 50); // Small delay to ensure CSS rendering is complete
      return;
    }
    
    // Count of loaded images
    let loadedCount = 0;
    
    // Function to check if all images are loaded
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        setTimeout(resolve, 50); // Small delay after all images are loaded
      }
    };
    
    // Add load and error listeners to each image
    images.forEach(img => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded); // Count errors as loaded to avoid hanging
      }
    });
  });
}