---
title: P2P Web Hosting
date: 25/04/2025
---

# basic local example

### Client A
#### Host a http web server via unix sockets.
> server.py
```python
import http.server
import json
import os
import socket
import sys
import traceback

def process_cmd(cmd, *args):
    print(f"In process_cmd({cmd}, {args})...")

class HTTPHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        size = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(size)
        args = json.loads(body) if body else []
        try:
            result = process_cmd(self.path[1:], *args)
            self.send(200, result or 'Success')
        except Exception:
            self.send(500, str(traceback.format_exc()))

    def do_GET(self):
        self.do_POST()

    def send(self, code, reply):
        # avoid exception in server.py address_string()
        self.client_address = ('',)
        self.send_response(code)
        self.end_headers()
        self.wfile.write(reply.encode('utf-8'))

sock_file = sys.argv[1]
try:
    os.remove(sock_file)
except OSError:
    pass
sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
sock.bind(sock_file)
sock.listen(0)

server = http.server.HTTPServer(sock_file, HTTPHandler,
                                False)
server.socket = sock
server.serve_forever()

sock.shutdown(socket.SHUT_RDWR)
sock.close()
os.remove(sock_file)
```
and run this with:

`python3 server.py /tmp/http.socket`

## Client B
### Turn the web socket path into a tcp connection that the browser can understand
```bash
socat TCP-LISTEN:80,forever,reuseaddr,fork UNIX-CONNECT:/tmp/http.socket
```

### Use browser to see web page:
> `http://localhost`


# same example using P2P

### Client A
```bash
python3 server.py /tmp/http.socket
# From another terminal, pipe the server socket into dumbpipe
socat UNIX-CONNECT:/tmp/http.socket,keepalive,ignoreeof EXEC:"dumbpipe listen",reuseaddr
# Note down nodeId from the console.
```

### Client B
```bash
export nodeId=">>The id from client A Console.<<"
# Connect to dumbpipe and expose the socket via tcp.
export CMD="dumbpipe connect $nodeId"
socat EXEC:"$CMD" TCP-LISTEN:80,forever,reuseaddr,fork
# Test from another terminal
curl http://localhost
```

> *So far this only accepts 1 http e2e and you have to kill `socat` on client B for `curl` to respond. This is due to unix-listen just stuck with the first request and it won't fork additional requests.*

