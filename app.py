import urllib

from flask import Flask
from flask import request
from flask_pymongo import PyMongo
from FilesHandler import FilesHandler as Fh

pwd = urllib.parse.quote('MeetTeam@18')
database = 'beta'
connection_string = 'mongodb+srv://MeetGDemo:' + pwd + '@meetgdemo-kjmtn.mongodb.net/' + database

app = Flask(__name__)
app.config['MONGO_DBNAME'] = database
app.config['MONGO_URI'] = connection_string

mongo = PyMongo(app)


@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'No files been uploaded'
    file = request.files['file']
    current_file = Fh(file)
    if current_file.check_file_extension_is_valid(['jpeg', 'png', 'jpg']):
        filename = current_file.new_name
        mongo.save_file(filename, file)
        return filename
    else:
        return 'File extension should be .jpg or .png or .jpeg current type is ' + str(
            current_file.mime_type)


@app.route('/images/<filename>', methods=['GET'])
def get_image(filename):
    return mongo.send_file(filename)


if __name__ == '__main__':
    app.run()
