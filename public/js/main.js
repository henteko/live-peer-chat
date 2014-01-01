$(function() {
  var PEERJS_ID = 'your peer.js api key';
  var myId = Math.ceil( Math.random()*1000 + 100 );
  var peer = new Peer(myId, {key: PEERJS_ID});
  $('#myId').text(myId);

  var localvideo = document.getElementById('localVideo');
  var remoteVideo = document.getElementById('remoteVideo');
  var localStream;
  function success(stream) {
    localStream = stream;
    localVideo.src = window.webkitURL.createObjectURL(localStream);
    $('#connectButton').click(function() {
      var connectId = $('#connect').val();
      var call = peer.call(connectId, localStream);
      connect(call);
    });
  }
  function error(err) {
    console.log(err);
  }
  navigator.webkitGetUserMedia({audio:true, video:true}, success, error);

  var connect = function(call) {
    call.on('stream', function(remoteStream) {
      remoteVideo.src = window.webkitURL.createObjectURL(remoteStream);
    });

    $('.connects').hide();
    $('.connected').html('<h2><small>Connected to the ID:</small> ' + call.peer + '</h2>');
  };

  peer.on('call', function(call) {
    call.answer(localStream);
    connect(call);
  });
});
