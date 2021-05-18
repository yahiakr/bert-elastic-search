from flask import Flask, jsonify, request
from EmbeddingGenerator import EmbeddingGenerator
import json

app = Flask(__name__)

#Init the model
with open('./config.json') as f:
  config = json.load(f)

predictor = EmbeddingGenerator(config)


@app.route("/embedding", methods=['POST'])
def predict():
    posted_data = request.get_json()
    context = posted_data['context']
    result = predictor.predict(context)

    return jsonify({
        "vector" : result,
    })

@app.route("/")
def home():
    return "<h1>Running Flask from Docker!</h1>"
  
if __name__ == '__main__':
    app.run(host='0.0.0.0')