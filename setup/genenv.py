import json

data = None

try:
    with open('./android/app/google-services.json') as f:
        data = json.load(f)
except:
    print("Place 'google-servicess.json' in ./android/app/<here>")
    pass

# end the program if data is empty
if data is None:
    exit()

project_id = data["project_info"]["project_id"]
firebase_url = data["project_info"]["firebase_url"]
storage_bucket = data["project_info"]["storage_bucket"]
project_number = data["project_info"]["project_number"]

f= open(".env","w+")

f.write("REACT_APP_API_KEY = '<your web API Key here>'\n")
f.write("REACT_APP_AUTH_DOMAIN = '" + project_id + ".firebaseapp.com'\n")
f.write("REACT_APP_DATABASE_URL = '" + firebase_url + "'\n")
f.write("REACT_APP_PROJECT_ID = '" + project_id + "'\n")
f.write("REACT_APP_STORAGE_BUCKET = '" + storage_bucket + "'\n")
f.write("REACT_APP_MESSAGING_SENDER_ID = '" + project_number + "'\n")

print('Generation complete, now get the Web API key from firebase and place the api key in the .env file')
