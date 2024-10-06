document.getElementById('settingsForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const postFilter = document.querySelector('input[name="postFilter"]:checked').value;

  // Save user selection in chrome storage
  chrome.storage.sync.set({ postFilter }, function() {
    alert('$BIP bop saved!');
  });
});

// Load current settings
chrome.storage.sync.get('postFilter', function(data) {
  if (data.postFilter) {
    document.querySelector(`input[value="${data.postFilter}"]`).checked = true;
  }
});
