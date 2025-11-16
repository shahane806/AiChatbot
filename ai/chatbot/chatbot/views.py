from django.http import JsonResponse, HttpResponse
import joblib
import pathlib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.pipeline import Pipeline
from PIL import Image, ImageOps
import requests
import numpy as np
from urllib.parse import unquote
import io
import manage

# Define the pipeline structure
Pipe = Pipeline([
    ('bow', CountVectorizer(analyzer=manage.cleaner)),
    ('tfidf', TfidfTransformer()),
    ('classifier', DecisionTreeClassifier())
])

# Set the file path
filepath = pathlib.Path(__file__).resolve().parent

# Load the chatbot model
try:
    Pipe = joblib.load(filepath / 'chatbot')
except FileNotFoundError:
    Pipe = None  # Model is not loaded

def sendResponse(request):
    try:
        # Fetch 'name' parameter from the request
        name = request.GET.get('name')
        if not name:
            return JsonResponse({'error': "Parameter 'name' is required."}, status=400)

        if name == "TSI":
            # Handle Technical Support Issues
            issue_list = [
                "I have an issue", "Software Issues", "Hardware Issues", "Network and Connectivity",
                "Account and Access", "Data and Storage", "Security and Privacy",
                "Website and Web Application Issues", "System and Operating System Issues",
                "Email and Communication Issues", "Development and Programming Issues",
                "Installation Problems", "Application Crashes", "Performance Issues",
                "Device Connectivity", "Power Issues", "Internet Connectivity", "VPN Issues",
                "Login Problems", "Two-Factor Authentication", "Data Loss", "Storage Space",
                "Malware and Viruses", "Firewall Issues", "Page Load Errors", "Browser Compatibility",
                "OS Updates", "Driver Issues", "email delivery", "other"
            ]

            # Convert issue list to lowercase for comparison
            issue_list_lower = {issue.lower() for issue in issue_list}
            query = request.GET.get("query", "").lower()
            
            # Check if model is loaded
            if not Pipe:
                return JsonResponse({'error': "Chatbot model not loaded. Please contact the administrator."}, status=500)

            # Predict category using the chatbot model
            if query not in issue_list_lower:
                prediction = (
                    "Please select a category: 1. Software Issues, 2. Hardware Issues, "
                    "3. Network and Connectivity, 4. Account and Access, 5. Data and Storage, "
                    "6. Security and Privacy, 7. Website and Web Application Issues, "
                    "8. System and Operating System Issues, 9. Email and Communication Issues, "
                    "10. Development and Programming Issues, 11. Other."
                )
            elif query == 'other':
                # Prompt user to elaborate the issue if category is 'other'
                return HttpResponse("""
                    <textarea id='elaborateInputFromDjango'  type='text' placeholder='Please elaborate your issue in detail'></textarea>
                                    <button id='OtherReasonReport'>submit</button>
                """)
            else:
                # Predict the category
                prediction = Pipe.predict([query])[0]

            return JsonResponse({'prediction': prediction})

        elif name == "DigitRecog":
            # Handle Digit Recognition
            image_url = request.GET.get("query", "")
            if not image_url:
                 image_url = request.GET.get("query", "")

            # Decode the URL and process the image
            image_url = unquote(image_url)
            if not image_url.startswith("http://") and not image_url.startswith("https://"):
                image_url = "http:" + image_url

            try:
                response = requests.get(image_url, stream=True)
                if response.status_code != 200:
                    response = requests.get(image_url, stream=True)

                # Load and preprocess the image
                img = Image.open(io.BytesIO(response.content)).convert('L')  # Convert to grayscale
                img = img.resize((28, 28))  # Resize to 28x28
                img = ImageOps.invert(img)  # Invert colors
                img_array = np.array(img) / 255.0  # Normalize pixel values
            except Exception as img_error:
                response = requests.get(image_url, stream=True)
                if response.status_code != 200:
                    response = requests.get(image_url, stream=True)

                # Load and preprocess the image
                img = Image.open(io.BytesIO(response.content)).convert('L')  # Convert to grayscale
                img = img.resize((28, 28))  # Resize to 28x28
                img = ImageOps.invert(img)  # Invert colors
                img_array = np.array(img) / 255.0  # Normalize pixel values

            # Load the digit recognition model
            try:
                model = joblib.load(filepath / 'digit-recognization')
            except FileNotFoundError:
               model = joblib.load(filepath / 'digit-recognization')

            # Predict the digit
            try:
                prediction = model.predict(img_array.reshape(1, -1))
                label = np.argmax(prediction[0])  # Predicted digit
                return JsonResponse({'prediction': f"The predicted digit is: {label}"})
            except Exception as pred_error:
                prediction = model.predict(img_array.reshape(1, -1))
                label = np.argmax(prediction[0])  # Predicted digit
                return JsonResponse({'prediction': f"The predicted digit is: {label}"})

        else:
            # Invalid 'name' parameter
            return JsonResponse({'error': "Invalid 'name' parameter. Use 'TSI' or 'DigitRecog'."}, status=400)

    except Exception as e:
        # Catch any unexpected errors
        return JsonResponse({'error': f"An unexpected error occurred: {e}"}, status=500)
