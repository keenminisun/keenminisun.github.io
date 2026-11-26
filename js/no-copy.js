(function () {
  function isInCodeBlock(node) {
    while (node && node !== document.body) {
      if (node.nodeType === 1) {
        const tag = node.tagName;
        if (tag === 'PRE' || tag === 'CODE') return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function selectionIsCodeOnly() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const range = sel.getRangeAt(0);
    return isInCodeBlock(range.commonAncestorContainer);
  }

  document.addEventListener('copy', function (e) {
    if (selectionIsCodeOnly()) return;
    e.preventDefault();
  });

  document.addEventListener('cut', function (e) {
    if (selectionIsCodeOnly()) return;
    e.preventDefault();
  });

  document.addEventListener('contextmenu', function (e) {
    if (isInCodeBlock(e.target)) return;
    e.preventDefault();
  });
})();
