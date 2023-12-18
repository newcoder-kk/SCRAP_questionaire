from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/predict_ocean', methods=['POST'])
def predict_ocean():
    try:
        # Get the input data from the request
        data = request.get_json()

        # Assuming the input data is a dictionary with keys 'openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'
        openness = data['openness']
        conscientiousness = data['conscientiousness']
        extraversion = data['extraversion']
        agreeableness = data['agreeableness']
        neuroticism = data['neuroticism']
	
        # Call the Python script with subprocess
        #Sample below
	      #command = ["python", "ocean_model_script.py", str(openness), str(conscientiousness), str(extraversion), str(agreeableness), str(neuroticism)]
        #result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
		
        if result.returncode == 0:
            # Successful execution, return the output
            return jsonify({'prediction_result': result.stdout.strip()})
        else:
            # Error occurred during execution
            return jsonify({'error': result.stderr.strip()}), 500

    except Exception as e:
        # Handle exceptions appropriately
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app on localhost:5000
    app.run(debug=True)
