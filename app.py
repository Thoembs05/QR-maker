from flask import Flask, render_template, request, send_file, jsonify
import qrcode
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_qr():
    data = request.json.get('text', '')
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    img = qrcode.make(data)
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
