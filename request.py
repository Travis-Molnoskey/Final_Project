import requests
import json

url = 'http://0.0.0.0:5000/api/'

data = [[.23, 5, 6, 2, 61.5, 55, 326, 3.95, 3.98, 2.43]]

j_data = json.dumps(data)
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}

r = requests.post(url, data= j_data, headers=headers)

print(r,r.text)