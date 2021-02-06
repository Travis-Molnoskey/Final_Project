from flask import Flask,request, url_for, redirect, render_template, jsonify

import pandas as pd
import pickle as p
import numpy as np
import json

app = Flask(__name__)

@app.route('/api/', methods=['POST'])
def makecalc():
    data = request.get_json()
    prediction = np.array2string(model.predict(data))
    return jsonify(prediction)


if __name__ == '__main__':
    modelfile = 'model/finalized_model.pickle'
    model = p.load(open(modelfile, 'rb'))
    app.run(debug=True, host = '0.0.0.0')
