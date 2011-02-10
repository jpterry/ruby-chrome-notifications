require 'web_socket'
require 'thread'


server = WebSocketServer.new(
  :accepted_domains => ['*'],
  :port => '9000')
puts("Server is running at port %d" % server.port)
connections = []
history = [nil] * 20

server.run() do |ws|
  begin
    
    puts("Connection accepted")
    puts history.inspect
    ws.handshake()
    que = Queue.new()
    connections.push(que)
    
    for message in history
      next if !message
      ws.send(message)
      puts("Sent: #{message}")
    end
    
    thread = Thread.new() do
      while true
        message = que.pop()
        ws.send(message)
        puts("Sent: #{message}")
      end
    end
    
    while data = ws.receive()
      puts("Received: #{data}")
      for conn in connections
        conn.push(data)
      end
      history.push(data)
      history.shift()
    end
    
  ensure
    connections.delete(que)
    thread.terminate() if thread
    puts("Connection closed")
  end
end
