from flask import Flask,request, url_for, redirect, render_template, jsonify
# from pycaret.regression import *
import pandas as pd
import pickle
import numpy as np

app = Flask(__name__)

# model = load_model('deployment_28042020')
cols = ['Carat Weight', 'Cut', 'Color', 'Clarity']

@app.route('/')
def home():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)