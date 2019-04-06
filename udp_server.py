import socket
import requests
import sys


SERVER_HOST = ''
SERVER_PORT = 80

INGRES_ENDPOINT = '/ingress'




# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Bind the socket to the port
server_address = ('0.0.0.0', 3333)

print('starting up on {} port {}'.format(server_address, port))


sock.bind(server_address)



def send_to_server(data):

    url = 'https://{}:{}{}'.format(SERVER_HOST, SERVER_PORT, INGRES_ENDPOINT)
    r = requests.post(url)

    if r.status_code != 200:
        print("ERR! Unsuccessful request: {}\n Data: {}", url, data)


while True:

    print('\nWaiting to receive message')

    data, address = sock.recvfrom(4096)

    print('Received {} bytes from {}'.format(len(data), address))
    print(data)

    if data:
        send_to_server(data)







