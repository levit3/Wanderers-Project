#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, send_from_directory, session
from flask_restful import Resource
import os


# Local imports
from server.config import app, db, api
# Add your model imports
from server.models import db, User, Destination, Review

def get_next_filename(ext):
    existing_files = [f for f in os.listdir(app.config['UPLOAD_FOLDER'])]
    count = 0
    for filename in existing_files:
        count+=1
    next_number = count
    new_filename = f"Untitled design ({next_number}).{ext}"
    return new_filename

def allowed_file(filename):
   if '.' not in filename:
       return False
   ext = os.path.splitext(filename)[1].lower()
   return ext in app.config['ALLOWED_EXTENSIONS']

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
        if 'file' not in request.files:
            return make_response({'error': 'No image file provided'}, 400)
        elif allowed_file(request.files['file'].filename):
            return make_response({'error': 'Invalid image file'}, 400)
        
        file = request.files['file']
        ext = os.path.splitext(file.filename)[1].lower()
        new_filename = get_next_filename(ext)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
        file.save(file_path)
        
        try:
            destination = Destination(name=request.form.get('name'), location=request.form.get('location'), description=request.form.get('description'), image=file_path, link=request.form.get('link'))
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
@app.route('/api/static/uploads/<filename>')
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
            user = User(username=data['username'].title(), email=data['email'], password=data['password'])
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
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
    
    
api.add_resource(Users, '/api/users')
api.add_resource(Destinations, '/api/destinations')
api.add_resource(Reviews, '/api/reviews')
api.add_resource(UserByID, '/api/users/<int:id>')
api.add_resource(DestinationByID, '/api/destinations/<int:id>')
api.add_resource(ReviewByID, '/api/reviews/<int:id>')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(CheckSession, '/api/check-session')
api.add_resource(Register, '/api/register')
    

if __name__ == '__main__':
    app.run(port=5555, debug=True)