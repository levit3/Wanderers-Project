#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Destination, Review



# Views go here!

@app.route('/')
def index():
    return '<h1>Wanderers</h1>'

class Users(Resource):
    
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        data = request.get_json()
        user = User(username=data['username'], email=data['email'], password=data['password'])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 201)
    
    def delete(self, id):
        user = User.query.filter_by(id= id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'error': 'User not found'}, 404)
        
    def patch(id):
        user = User.query.filter_by(id= id).first()
        if user:
            for attr in request.json:
                setattr(user, attr, request.json[attr])
            db.session.add(user)
            db.session.commit()
        else:
            return make_response({'error': 'User not found'}, 404)


if __name__ == '__main__':
    app.run(port=5555, debug=True)

