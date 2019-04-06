import socket
import requests
import struct
import sys


SERVER_HOST = ''
SERVER_PORT = 80

INGRES_ENDPOINT = '/ingress'
KEYS = ['AcX', 'AcY', 'AcZ', 'GyX', 'GyY', 'GyZ', 'time']


# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Bind the socket to the port
server_address = ('0.0.0.0', 3333)

print('starting up on {} port {}'.format(server_address, port))


sock.bind(server_address)

def main():

    readings = struct.Struct("<hhhhhhhI")

    while True:

        print('\nWaiting to receive message')

        data, address = sock.recvfrom(17 * 128)

        #print('Received {} bytes from {}'.format(len(data), address))
        #print(data)

        if data:
            values = readings.unpack(data)
            json = dict(zip(KEYS, values))
            send_to_server(json)




def send_to_server(data):

    url = 'https://{}:{}{}'.format(SERVER_HOST, SERVER_PORT, INGRES_ENDPOINT)
    r = requests.post(url, json=data)

    if r.status_code != 200:
        print("ERR! Unsuccessful request: {}\n Data: {}", url, data)










