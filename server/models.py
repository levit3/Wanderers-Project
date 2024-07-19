from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func
import re 
from flask import url_for

from config import db, bcrypt


# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    serialize_rules = ['-reviews.user', '-destinations.destination']
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    
    reviews = db.relationship('Review', back_populates='user')
    destinations = association_proxy('reviews', 'destination')
    
    @validates('username')
    def validate_username(self, key, username):
        user = User.query.filter_by(username=username).first()
        if user:
            raise ValueError('Username already exists')
        return username
    
   
    @hybrid_property
    def password(self):
        return self._password
    
    @password.setter
    def password(self, password):
        if (
            len(password) < 8 or
            not re.search(r"[A-Z]", password) or
            not re.search(r"[a-z]", password) or
            not re.search(r"[0-9]", password) or
            not re.search(r"[\W_]", password)
        ):
            raise ValueError(
                'Password MUST be at least 8 digits, iclude uppercase, lowercase, numbers & special characters.'
            )

        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))
    

    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError('Invalid email address')
        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            raise ValueError('Email already exists')
        return email
  
class Destination(db.Model, SerializerMixin):
	__tablename__ = 'destinations'
	
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String, nullable=False)
	location = db.Column(db.String, nullable=False)
	description = db.Column(db.String, nullable=False)
	image = db.Column(db.String, nullable=False)
	link = db.Column(db.String)
	
	reviews = db.relationship('Review', back_populates = 'destination')
 
	@validates('name')
	def validate_name(self, key, name):
		if len(name) < 5:
			raise ValueError('Name must be at least 5 characters long')
		return name
		
	@validates('location')
	def validate_location(self, key, location):
		if len(location) < 5:
			raise ValueError('Location must be at least 5 characters long')
		return location

		
	@validates('description')
	def validate_description(self, key, description):
		if len(description) < 10:
			raise ValueError('Description must be at least 10 characters long')
		return description

	def to_dict(self):
			return {
					'id': self.id,
					'name': self.name,
					'description': self.description,
					'location': self.location,
					'image_url': url_for('static', filename=self.image, _external=True), 
					'link': self.link,
					'reviews': [ {'id': review.id,
                  			'user_id': review.user_id,
                     		'destination_id': review.destination_id,
                       	'rating': review.rating,
                        'comment': review.comment,
                        'date': review.date,
                        'user': {
                          'id': review.user.id,
                          'username': review.user.username,
                          'email': review.user.email
                          }} for review in self.reviews]
			}
 
class Review(db.Model, SerializerMixin):
  __tablename__ = 'reviews'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'), nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  comment = db.Column(db.String, nullable=False)
  date = db.Column(db.Date, server_default=func.current_date())
  
  user = db.relationship('User', back_populates='reviews')
  destination = db.relationship('Destination', back_populates='reviews')
  
  serialize_rules = ['-user.reviews', '-destination.reviews']
  
  @validates('comment')
  def validate_comment(self, key, comment):
    if len(comment) < 5:
      raise ValueError('Comment must be at least 5 characters long')
    return comment
  
  @validates('rating')
  def validate_rating(self, key, rating):
    if not (5 >= int(rating) >= 0):
      raise ValueError('Rating must be between 1 and 5')
    return rating
  
  @validates('user_id')
  def validate_user_id(self, key, user_id):
    user = User.query.get(user_id)
    if not user:
      raise ValueError('User does not exist')
    return user_id
  
  @validates('destination_id')
  def validate_destination_id(self, key, destination_id):
    destination = Destination.query.get(destination_id)
    if not destination:
      raise ValueError('Destination does not exist')
    return destination_id
  



