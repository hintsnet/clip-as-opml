javascript: (function() {
  var inbox = '#';

  function escape_chars(i) {
    var o = i.replace(/&/g, '&amp;amp;').replace(/</g, '&amp;lt;').replace(/>/g, '&amp;gt;').replace(/"/g, '&quot;').replace(/(\n)/g, '&#10;');
    return (o);
  }

  var docTitle = escape_chars(document.title);
  var docUrl = escape_chars(location.href) + ' ';
  var docSelection = escape_chars(window.getSelection().toString());
  var docSelectionSplitIdx = docSelection.search(/([?!。？！…]|&#10;)/);
  var docSelectionHeader = docSelection.substring(0, docSelectionSplitIdx);
  var isWorkFlowy = location.href.indexOf('workflowy.com/');
  var isDynalist = location.href.indexOf('dynalist.io/');
  var isChrome = !!window.chrome;

  if (isWorkFlowy !== -1) {
    var docTitle = '参见另一条目 &quot;' +
      docTitle.replace(/ - WorkFlowy$/, '') +
      '&quot;';
  }

  if (isDynalist !== -1) {
    var docTitle = '参见另一条目 &quot;' +
      docTitle.replace(/ - Dynalist$/, '') +
      '&quot;';
  }

  var clip =
    '<?xml version="1.0"?>' +
    '<opml version="2.0">' +
    '  <body>' + 
    '    <outline text="' + docTitle + '" _note="' + docSelection + '&#10;[参考链接](' + docUrl + ' )" />' +
    '  </body>' +
    '</opml>';

  if (isChrome && clip.length > 2000) {
    window.open('' + inbox + '/?q=' + encodeURIComponent(clip) + '');
  } else {
    prompt('  请复制下列文字 \(Ctrl-C 或 Cmd-C\) \n\n  并打开 Workflowy / Dynalist 页签粘贴为新的笔记条目\n', clip);
  }
})()
