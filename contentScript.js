// Replace text and retain links for cashtags and hashtags
const replaceTextInLinks = (post) => {
  try {
    // Replace cashtags: $DOG → $BIP
    const cashtagLinks = post.querySelectorAll('a[href*="cashtag"]');
    cashtagLinks.forEach(link => {
      if (link.textContent.includes('$DOG')) {
        // Update the text and link for cashtags
        link.textContent = link.textContent.replace('$DOG', '$BIP');
        link.href = link.href.replace('%24DOG', '%24BIP'); // Ensure the URL is updated
      }
    });

    // Replace hashtags: #DOG → #BIP and #DogGoToTheMoon → #BIPGoToTheMoon
    const hashtagLinks = post.querySelectorAll('a[href*="hashtag"]');
    hashtagLinks.forEach(link => {
      if (link.textContent.includes('#DOG')) {
        // Update the text and link for #DOG → #BIP
        link.textContent = link.textContent.replace('#DOG', '#BIP');
        link.href = link.href.replace('%23DOG', '%23BIP'); // Ensure the URL is updated
      }

      if (link.textContent.includes('#DogGoToTheMoon')) {
        // Update the text and link for #DogGoToTheMoon → #BIPGoToTheMoon
        link.textContent = link.textContent.replace('#DogGoToTheMoon', '#BIPGoToTheMoon');
        link.href = link.href.replace('%23DogGoToTheMoon', '%23BIPGoToTheMoon'); // Ensure the URL is updated
      }
    });
  } catch (error) {
    console.error("Error processing post links:", error);
  }
};

// Function to modify posts based on user selection (all posts or posts by @LeonidasNFT)
const modifyPosts = (filter) => {
  try {
    const posts = document.querySelectorAll('article div[lang]');

    posts.forEach(post => {
      // If 'leonidas' is selected, only change posts by @LeonidasNFT
      if (filter === 'leonidas') {
        const user = post.closest('article').querySelector('a[href*="LeonidasNFT"]');
        if (user) {
          replaceTextInLinks(post); // Only replace text in posts by @LeonidasNFT
        }
      } else {
        // Modify all posts
        replaceTextInLinks(post);
      }
    });
  } catch (error) {
    console.error("Error modifying posts:", error);
  }
};

// Get user setting and apply the modification based on that
chrome.storage.sync.get('postFilter', function(data) {
  try {
    const filter = data.postFilter || 'all'; // Default to 'all' if no setting is found
    modifyPosts(filter);
  } catch (error) {
    console.error("Error getting user settings:", error);
  }
});

// Observe for dynamically loaded posts
const observer = new MutationObserver(() => {
  try {
    chrome.storage.sync.get('postFilter', function(data) {
      const filter = data.postFilter || 'all';
      modifyPosts(filter);
    });
  } catch (error) {
    console.error("Error in MutationObserver:", error);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
