from flask import Flask, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/test', methods=['POST'])
def handle_data():
    data = request.get_json()['data']
    print(data)
    # handle your data here
    return {'response': 'Data received'}

if __name__ == '__main__':
    app.run(debug=True)