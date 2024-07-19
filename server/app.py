#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, send_from_directory, session
from flask_restful import Resource
import re


# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Destination, Review



@app.route('/')
def index():
    return '<h1>Wanderers</h1>'
class Users(Resource):
    
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)

class UserByID(Resource):   
    
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        
        if user:
            return make_response(user.to_dict(), 200)
        
        return make_response({'error': 'User not found'}, 404)
    
    def delete(self, id):
        user = User.query.filter_by(id= id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({'error': 'User not found'}, 404)
        
    def patch(self, id):
        user = User.query.filter_by(id= id).first()
        if user:
            try:
                for attr in request.json:
                    setattr(user, attr, request.json[attr])
                db.session.add(user)
                db.session.commit()
                return make_response(user.to_dict(), 200)
            except ValueError as e:
                return make_response({'error': str(e)}, 400)
        else:
            return make_response({'error': 'User not found'}, 404)
    
class Destinations(Resource):
    
    def get(self):
        destinations = [destination.to_dict() for destination in Destination.query.all()]
        return make_response(destinations, 200)
    
    def post(self):
        data = request.json
        try:
            destination = Destination(name=data['name'], location=data['location'], description=data['description'], image=data['image'])
            db.session.add(destination)
            db.session.commit()
            return make_response(destination.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': str(e)}, 400)
    
class DestinationByID(Resource):
    
    def get(self,id):
        destination = Destination.query.filter_by(id=id).first()
        
        if destination:
            return make_response(destination.to_dict(), 200)
        
        return make_response({'error': 'Destination not found'}, 404)
    
    def delete(self, id):
        destination = Destination.query.filter_by(id= id).first()
        if destination:
            db.session.delete(destination)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({'error': 'Destination not found'}, 404)
        
    def patch(self, id):
        destination = Destination.query.filter_by(id=id).first()
        if destination:
            try:
                for attr in request.json:
                    setattr(destination, attr, request.json[attr])
            
                db.session.add(destination)
                db.session.commit()
                return make_response(destination.to_dict(), 200)
            except ValueError as e:
                return make_response({'error': str(e)}, 400)
        else:
            return make_response({'error': 'Destination not found'}, 404)
      
### Route for images ###
@app.route('/static/uploads/<filename>')
def uploads(filename):
    return send_from_directory('uploads', filename)
    
class Reviews(Resource):
    
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)
    
    def post(self):
            data = request.json
            if session['user_id']:
                try:
                    review = Review(user_id=session['user_id'], destination_id=data['destination_id'], rating=data['rating'], comment=data['comment'])
                    db.session.add(review)
                    db.session.commit()
                    return make_response(review.to_dict(), 201)
                except ValueError as e:
                    print(e)
                    return make_response({'error': str(e)}, 400)

            else:
                return make_response({'error': 'You need to be logged in to post a review'}, 401)

class ReviewByID(Resource):
    
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        
        if review:
            return make_response(review.to_dict(), 200)
        
        return make_response({'error': 'Review not found'}, 404)
    
    def delete(self, id):
        review = Review.query.filter_by(id= id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({'error': 'Review not found'}, 404)
        
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            try:
                for attr in request.json:
                    setattr(review, attr, request.json[attr])
                db.session.add(review)
                db.session.commit()
                return make_response(review.to_dict(), 200)
            except ValueError as e:
                return make_response({'error': str(e)}, 400)
      
class Login(Resource):
    
    def post(self):
        username = request.json.get('username')
        user = User.query.filter_by(username=username).first()
        password = request.json.get('password')
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                print(session['user_id'])
                return user.to_dict(), 200
            else:
                return make_response({'error': 'Incorrect password'}, 401)
        else:
            return {'error': 'User not found'}, 404
        
class Logout(Resource):
    
    def delete(self):
        session['user_id'] = None
        return {'message': 'Logged out successfully'}, 204
    
    
class Register(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User(username=data['username'], email=data['email'], password=data['password'])
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': str(e)}, 400)
        
class CheckSession(Resource):
    
    def get(self):
        user_id = session.get('user_id')
        print(user_id)
        user = User.query.filter_by(id=user_id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return {'error': 'Session expired'}, 401
    
    
api.add_resource(Users, '/users')
api.add_resource(Destinations, '/destinations')
api.add_resource(Reviews, '/reviews')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(DestinationByID, '/destinations/<int:id>')
api.add_resource(ReviewByID, '/reviews/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check-session')
api.add_resource(Register, '/register')
    

if __name__ == '__main__':
    app.run(port=5555, debug=True)

