# import json
import requests

url = 'http://localhost:5000/results'

r = requests.post(url,json={'carat':1, 'cut':4, 'clarity':2, 'color':3})

print(r.json())
