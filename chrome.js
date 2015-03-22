chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("chrome.htm",
    {
      frame: "none",
      innerBounds: {
        width: 272,
        height: 155
      },
      resizable: false,
      alwaysOnTop: true
    }
  );
});


chrome.contextMenus.onClicked.addListener(function(info,tab) {
  var appWindow = chrome.app.window.getAll()[0];
  
  switch (info.menuItemId) {
    case "scale1":
      appWindow.resizeTo(272,155);
      appWindow.contentWindow.document.body.style.zoom = 1;
      break;
    case "scale15":
      appWindow.resizeTo(408,232.5);
      appWindow.contentWindow.document.body.style.zoom = 1.5;
      break;
    case "scale2":
      appWindow.resizeTo(544,310);
      appWindow.contentWindow.document.body.style.zoom = 2;
      break;
    case "alwaysOnTop":
      appWindow.setAlwaysOnTop(info.checked);
      break;
    case "sound":
      appWindow.contentWindow.createjs.Sound.setMute(!info.checked);
      break;
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({"title": "Scale x1", "type": "radio",
                              "id": "scale1"});
  chrome.contextMenus.create({"title": "Scale x1.5", "type": "radio",
                              "id": "scale15"});
  chrome.contextMenus.create({"title": "Scale x2", "type": "radio",
                              "id": "scale2"});

  chrome.contextMenus.create(
      {"title": "Always on top", "type": "checkbox", "id": "alwaysOnTop", "checked": true});
  chrome.contextMenus.create(
      {"title": "Sound", "type": "checkbox", "id": "sound", "checked": true});
});