import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle as p

app = Flask(__name__)
modelfile = '4c_rf.pickle'
model = p.load(open(modelfile, 'rb'))


# render default webpage
@app.route('/')
def home():
    return render_template('FourCPriceEstimate.html')

@app.route('/predict', methods=['POST'])
def predict():
    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)
    output = round(prediction[0],2)

    return render_template('FourCPriceEstimate.html', prediction_text = output)

@app.route('/results', methods=['POST'])
def results():
    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])
    
    output = prediction[0]

    return jsonify(output)


if __name__ == '__main__':
    app.run(debug=True)