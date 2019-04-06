import socket
import requests
import struct
import sys
import csv 

SERVER_HOST = '192.168.5.134'
SERVER_PORT = 3000
SEND_SERVER = False

INGRES_ENDPOINT = '/api/ingest/'
KEYS = ['AcX', 'AcY', 'AcZ', 'GyX', 'GyY', 'GyZ', 'time']


# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Bind the socket to the port
server_address = ('0.0.0.0', 3333)

print('starting up on {}'.format(server_address))


sock.bind(server_address)

def main():

    readings = struct.Struct("<hhhhhhI")

    with open('data.csv', mode='w') as data_file:
        writer = csv.writer(data_file) 
        writer.writerow(KEYS)

        while True:

            print('\nWaiting to receive message')

            data, address = sock.recvfrom(17 * 128)
            json_readings = []

            #print('Received {} bytes from {}'.format(len(data), address))
            #print(data)

            if data:
                values = [i for i in readings.iter_unpack(data)]
                print(values)

                for v in values:
                    
                    json = dict(zip(KEYS, v))
                    writer.writerow(v)

                    json_readings.append(json)

                if SEND_SERVER:
                    send_to_server({'readings': json_readings})




def send_to_server(data, retrys=5):
    print(data)
    if retrys == 0:
        sys.exit()
    try:
        
        url = 'http://{}:{}{}'.format(SERVER_HOST, SERVER_PORT, INGRES_ENDPOINT)
        r = requests.post(url, json=data)

        if r.status_code != 200:
            print("ERR! Unsuccessful request: {}\n Data: {}", url, data)
    except Exception as e:
        print(e)
        send_to_server(data, retrys - 1)

main()







