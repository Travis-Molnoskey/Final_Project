from flask import Flask,request, url_for, redirect, render_template, jsonify

import pandas as pd
import pickle
import numpy as np
Import json

app = Flask(__name__)

@app.route('/api/', methods=['POST'])
def makecalc():
    data = request.get_json()
    prediction = np.array2string(model.predict(data))
    return jsonify(prediction)


if __name__ == '__main__':
    modelfile = 'models/final_prediction.pickle'
    model = p.load(open(modelfile, 'rb'))
    app.run(debug=True, host = '0.0.0.0')