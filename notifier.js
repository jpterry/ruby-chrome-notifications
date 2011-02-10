$(document).ready(function(){
	function debug(str){ $("#debug").append("<p>"+str+"</p>"); };
	ws = new WebSocket("ws://localhost:9000");
	ws.onmessage = function(evt)
	{        	
		if (window.webkitNotifications.checkPermission() == 0) {
		    notification_test = window.webkitNotifications.createNotification("echo","ECHO",evt.data)
		    notification_test.ondisplay = function() { console.log('yo'); };
		    notification_test.onclose = function() { console.log('closed'); };
		    notification_test.show();
		}
	
	};
	ws.onclose = function() { debug("socket closed"); };
	ws.onopen = function() {
		debug("connected...");
		ws.send("hello server");
	};
	
	$("#send_notification").click(function(){
		var notification_text = $("#notification_field").val();
		ws.send(notification_text);
	});

	


	// check for notifications support
	// you can omit the 'window' keyword
	if (window.webkitNotifications) {
	  console.log("Notifications are supported!");
	}
	else {
	  console.log("Notifications are not supported for this Browser/OS version yet.");
	}

	document.querySelector('#show_button').addEventListener('click', function() {
	  if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
	    // function defined in step 2
	    createNotificationInstance({ notificationType: 'html' });
	  } else {
	    window.webkitNotifications.requestPermission();
	  }
	}, false);


	document.querySelector('#show_button').addEventListener('click', function() {
	  if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
	    // function defined in step 2
	  } else {
	    window.webkitNotifications.requestPermission();
	  }
	}, false);


});

function createNotificationInstance(options) {
  if (options.notificationType == 'simple') {
    return window.webkitNotifications.createNotification(
        'icon.png', 'Notification Title', 'Notification content...');
  } else if (options.notificationType == 'html') {
    return window.webkitNotifications.createHTMLNotification('http://someurl.com');
  }
}